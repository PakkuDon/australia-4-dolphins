import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import InstructionsPage from './VideoForm/InstructionsPage';
import UserForm from './VideoForm/UserForm';
import RTCVideo from './VideoForm/RTCVideo';
import ShareScreen from './VideoForm/ShareScreen';
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
      panels: [
        <InstructionsPage />,
        <RTCVideo captureDevice={this.props.formVisible} onEndRecording={this.handleEndRecording}></RTCVideo>,
        <UserForm dataCb={this.getData}> </UserForm>
      ],
      current: 0,
      formData: {}
    }

    this.state.panels.push(
      <ShareScreen url={this.state.video_url} />
    );
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
        this.props.onHide();
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
    var nextBtn = this.state.current < this.state.panels.length - 1 ?
      { handler: this.next, text: 'Next' } :
      { handler: this.submitVideo, text: 'Submit video' };
    
    return (
      <Modal backdrop='static' show={this.props.visible}
        onHide={this.props.onHide} onExited={this.reset} dialogClassName="my-modal">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {this.state.panels[this.state.current]}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.props.onHide}>Cancel</Button>
          <Button bsStyle='primary' onClick={nextBtn.handler}>{nextBtn.text}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VideoForm;



















