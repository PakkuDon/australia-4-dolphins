import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserForm from './UserForm';

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
      <Modal show={this.props.visible} onHide={this.props.onHide}>
        <Modal.Header>
          <Modal.Title>Record video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video controls></video>
          <UserForm></UserForm>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='primary' onClick={this.submitVideo}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VideoForm;
