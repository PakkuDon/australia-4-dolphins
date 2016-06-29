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
      uploading: false,
      stream: null
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

  componentWillUnmount() {
    this.state.stream.stop();
  }

  componentWillReceiveProps(props) {
    console.log(props.captureDevice);
    if (!props.captureDevice){
      console.log('setting src to null');
      this.setState({src: null});
    }
  }

  requestUserMedia() {
    captureUserMedia((stream) => {
      this.setState({ 
        src: window.URL.createObjectURL(stream),
        stream: stream 
      });
    });
  }

  startRecord() {
    this.state.stream.stop();
    captureUserMedia((stream) => {
      this.setState({ 
        src: window.URL.createObjectURL(stream),
        stream: stream,
        isRecording: true
      });
      this.state.recordVideo = RecordRTC(stream, { type: 'video' });
      this.state.recordVideo.startRecording();
    });

    this.timeout = setTimeout(() => {
      this.stopRecord();
      this.timeout = null;
    }, 30000);
  }

  stopRecord() {
    this.state.stream.stop();
    this.state.recordVideo.stopRecording(() => {
      if (this.timeout){
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      let params = {
        type: 'video/webm',
        data: this.state.recordVideo.blob,
        id: Math.floor(Math.random()*90000) + 10000
      }

      this.setState({ 
        uploading: true, 
        isRecording: false, 
        src: URL.createObjectURL(this.state.recordVideo.blob) 
      });

      var invocation = new XMLHttpRequest();
      invocation.onreadystatechange = () => {
        if (invocation.status == 401) {
          console.log('Upload error');
          // TODO: Error handling
          // TODO: Remove arbitrary ID - used for testing purposes only
          this.setState({ uploading: false, uploadSuccess: false, src: null }, () => {
            var videoID = Math.random().toString(36).substring(2, 13);
            this.props.onEndRecording(videoID);
          });
        }
        else if (invocation.readyState == 4 && invocation.status == 200) {
          console.log('Awesome stuff');
          var id = JSON.parse(invocation.responseText)['id'];
          this.setState({ uploading: false, uploadSuccess: true, src: null }, () => {
            this.props.onEndRecording(id);
          });
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
    var controls;
    if (!this.state.isRecording) {
      controls = (
        <button onClick={this.startRecord}><img src='../../images/record-button.png' /></button>
      );
    }
    else {
      controls = (
        <button onClick={this.stopRecord}><img src='../../images/stop-button.png' /></button>
      );
    }

    return (
      <div className="recordrtc-video">
        <Webcam src={this.state.src}/>
        {this.state.uploading ?
          <div>Uploading...</div> : null}
        {this.state.uploadSuccess==true ?
          <div>Upload successful :=)</div> : null}
        {this.state.uploadSuccess==false ?
          <div>Upload failed :=(</div> : null}

        <div className="row controls">
          {controls}
        </div>
      </div>
    )
  }
}


export default RTCVideo
