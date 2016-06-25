import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import RecordRTC from 'recordrtc';
import 'gumadapter';

import { captureUserMedia } from './AppUtils';
import Webcam from './Webcam.react';
var tokens = require('../../cfg/token');

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
      var ReactClass = this;
      var invocation = new XMLHttpRequest();
      invocation.onreadystatechange = () => {
        if (invocation.status == 401) {
          console.log('Fucked up');
          ReactClass.setState({ uploading: false, uploadSuccess: false, src: null });
        }
        else if (invocation.readyState == 4 && invocation.status == 200) {
          console.log('Awesome stuff');
          var id = JSON.parse(invocation.responseText)['id'];
          ReactClass.props.onEndRecording(id);
          ReactClass.setState({ uploading: false, uploadSuccess: true, src: null });
        }
      };
      console.log(process.env);
      var videoFile =  new File([this.state.recordVideo.blob], "video.mp4");
      var token = tokens.access_token;
      console.log(token);
      invocation.open('POST', "https://www.googleapis.com/upload/youtube/v3/videos?part=snippet", true);
      invocation.setRequestHeader('Authorization', 'Bearer ' + token);
      invocation.send(videoFile);
      /*
      var parameters = JSON.stringify({
        "snippet": { "title": "testing123"  },
        "status": { "privacyStatus": "public"  }
      });
      var jsonBlob = new Blob([ parameters ], { "type" : "application\/json" });
      var fd = new FormData();
      fd.append("snippet", jsonBlob, "file.json");
      fd.append("file", videoFile);
      invocation.send(fd);
      */
    });
  }

  render() {
    return(
      <div className="recordrtc-video">
        <Webcam src={this.state.src}/>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
        {this.state.uploadSuccess==true ?
          <div>Upload successful :=)</div> : null}
        {this.state.uploadSuccess==false ?
          <div>Upload failed :=(</div> : null}

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
