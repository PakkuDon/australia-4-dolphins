import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import RTCVideo from './RTCVideo';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: true
    }
    this.submitVideo = this.submitVideo.bind(this);
  }
  
  submitVideo() {
    this.setState({
      modalIsOpen: false
    });
    this.props.onHide();
  }

  render() {
    var MainClass = this;
    return (
      <Modal show={this.props.visible} onHide={this.props.onHide} dialogClassName="my-modal">
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <RTCVideo captureDevice={MainClass.state.modalIsOpen}></RTCVideo>
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



















