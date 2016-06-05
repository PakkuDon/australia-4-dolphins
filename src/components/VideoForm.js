import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import InstructionsPage from './InstructionsPage';
import UserForm from './UserForm';
import RTCVideo from './RTCVideo';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
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
      formData: {},
    }
  }

  getData(formValue) {
    this.setState({formData: formValue.value})
  }

  
  // Add signature to DB, reset form
  submitVideo() {
    this.props.onHide();
    this.setState({
      video_url: '',
      current: 0
    });
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
    console.log(post_data);
    // POST to API
    $.post('https://0.0.0.0:3000/api/videos/', post_data)
      .done(function(){
        console.log('Sucess!');
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
  }

  render() {
    var nextBtn = this.state.current < this.state.panels.length - 1? 
      { handler: this.next, text: 'Next' } : 
      { handler: this.submitVideo, text: 'Submit video' };
    console.log(`current: ${this.state.current}, panel length: ${this.state.panels.length}`);
    
    return (
      <Modal backdrop='static' show={this.props.visible} onHide={this.props.onHide} dialogClassName="my-modal">
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          {this.state.panels[this.state.current]}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.submitVideo}>Cancel</Button>
          <Button bsStyle='primary' onClick={nextBtn.handler}>{nextBtn.text}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VideoForm;



















