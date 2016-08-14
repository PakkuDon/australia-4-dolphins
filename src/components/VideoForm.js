import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import InstructionsPage from './VideoForm/InstructionsPage';
import UserForm from './VideoForm/UserForm';
import RTCVideo from './VideoForm/RTCVideo';
import ShareScreen from './VideoForm/ShareScreen';
import Wizard from './Wizard/Wizard';
import WizardPage from './Wizard/WizardPage';
import $ from 'jquery';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.reset = this.reset.bind(this);
    this.submitVideo = this.submitVideo.bind(this);
    this.next = this.next.bind(this);
    this.handleEndRecording = this.handleEndRecording.bind(this);
    
    this.state = {
      video_url: '',
      current: 0,
      formData: {}
    }
  }

  reset() {
    this.setState({
      current: 0,
      video_url: '',
      formData: {}
    });
  }

  getData(formValue) {
    this.setState({formData: formValue.value})
  }

  // Add signature to DB, reset form
  submitVideo() {
    // TODO: Validation
    var fd = this.state.formData;
    var post_data = {};
    post_data['url'] = this.state.video_url;
    post_data['created'] = new Date();
    post_data['first_name'] = fd['firstName'] || 'Some Name';
    post_data['last_name'] = fd['lastName'] || 'Some Last';
    post_data['email'] = fd['email'] || 'def@def.com';
    post_data['country'] = fd['country'] || 'AU';
    post_data['phone'] = fd['phone'];
    post_data['post_code'] = fd['postCode'] || '3000';

    // Geocode provided location data
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?version=3&address=${post_data.post_code},%20${post_data.country}`,
      method: 'GET'
    })
    .done((data) => {
      post_data.location = data.results[0].geometry.location;
      // POST to API
      $.post('https://localhost:3000/api/videos/', post_data)
      .done(() => {
        // TODO: Confirmation message
        this.next();
      })
      .fail((jqXHR) => {
        // TODO: Error message
      });
    });
  }
  
  next() {
    this.setState({
      current: this.state.current + 1
    });
  }
  
  handleEndRecording(id) {
    this.setState({
      video_url: 'https://www.youtube.com/watch?v=' + id
    });
    this.next();
  }

  render() {
    return (
      <Modal backdrop='static' 
        show={this.props.visible}
        onHide={this.props.onHide} 
        onExited={this.reset} 
        dialogClassName="my-modal">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Wizard current_index={this.state.current}>
            <WizardPage onConfirm={{ text: 'Next', handler: this.next }} 
              onCancel={{ text: 'Cancel', handler: this.props.onHide }}>
              <InstructionsPage />
            </WizardPage>
            <WizardPage onCancel={{ text: 'Cancel', handler: this.props.onHide }}>
              <RTCVideo captureDevice={this.props.formVisible} 
                onEndRecording={this.handleEndRecording}></RTCVideo>
            </WizardPage>
            <WizardPage onConfirm={{ text: 'Submit video', handler: this.submitVideo }} 
              onCancel={{ text: 'Cancel', handler: this.props.onHide }}>
              <UserForm dataCb={this.getData}></UserForm>
            </WizardPage>
            <WizardPage onConfirm={{ text: 'Close', handler: this.props.onHide }}>
              <ShareScreen url={this.state.video_url} />
            </WizardPage>
          </Wizard>
        </Modal.Body>
      </Modal>
    );
  }
}

export default VideoForm;



















