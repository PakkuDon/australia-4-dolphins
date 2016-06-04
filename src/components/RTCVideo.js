import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import RecordRTC from './RecordRTC';
import './gumadapter';

//import { captureUserMedia, S3Upload } from './AppUtils';
import { captureUserMedia} from './AppUtils';
import Webcam from './Webcam.react';
//import RecordRTC from 'recordrtc';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);

class RTCVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: false,
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false
    };

    this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
  }

  componentDidMount() {
    if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();
  }

  componentWillReceiveProps(props) {
    console.log(props.captureDevice);
    if (!props.captureDevice){
      console.log('setting src to null');
      this.setState({src: null});
    }
  }


  requestUserMedia() {
    console.log('requestUserMedia')
    captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }

  startRecord() {
    captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
      this.setState({ isRecording: true});
    });

    this.timeout = setTimeout(() => {
      this.stopRecord();
      this.timeout=null;
    }, 30000);
  }

  stopRecord() {
    this.state.recordVideo.stopRecording(() => {
      if (this.timeout){
        clearTimeout(this.timeout);
        this.timeout=null;
      }
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }

      this.setState({ uploading: true, isRecording: false, src: URL.createObjectURL(this.state.recordVideo.blob) });

      // Upload to Youtube TODO
      /*
      S3Upload(params)
      .then((success) => {
        console.log('enter then statement')
        if(success) {
          console.log(success)
          this.setState({ uploadSuccess: true, uploading: false });
        }
      }, (error) => {
        alert(error, 'error occurred. check your aws settings and try again.')
      })
      */
    });
  }

  render() {
    return(
      <div className="recordrtc-video">
        <Webcam src={this.state.src}/>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
        <div className="row">
          <Button bsStyle='primary' disabled={this.state.isRecording} onClick={this.startRecord}>Start Record</Button>
          <Button bsStyle='danger' disabled={!this.state.isRecording} onClick={this.stopRecord}>Stop Record</Button>
        </div>
        { /*<Modal show={this.state.uploadSuccess}><Modal.Body>Upload success!</Modal.Body></Modal> */ }
      </div>
    )
  }
}


export default RTCVideo
