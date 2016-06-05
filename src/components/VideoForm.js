import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserForm from './UserForm';
import RTCVideo from './RTCVideo';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [
        <RTCVideo captureDevice={this.props.formVisible}></RTCVideo>,
        <UserForm />
      ],
      current: 0
    }
    this.submitVideo = this.submitVideo.bind(this);
    this.next = this.next.bind(this);
  }
  
  submitVideo() {
    this.props.onHide();
    this.setState({
      current: 0
    });
  }
  
  next() {
    this.setState({
      current: this.state.current + 1
    });
  }

  render() {
    var nextBtn = this.state.current < this.state.panels.length ? 
      { handler: this.next, text: 'Next' } : 
      { handler: this.submitVideo, text: 'Submit video' };
    
    
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



















