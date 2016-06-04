import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import RTCVideo from './RTCVideo';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitVideo = this.submitVideo.bind(this);
  }
  
  submitVideo() {
    this.props.onHide();
  }
  
  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onHide} dialogClassName="my-modal">
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <RTCVideo></RTCVideo>
          {/* <UserForm></UserForm> */}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={this.submitVideo}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VideoForm;



















