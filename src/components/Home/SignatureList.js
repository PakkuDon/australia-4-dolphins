import React from 'react';
import url from 'url';
import { Row, Col } from 'react-bootstrap';
import SignatureThumbnail from './SignatureThumbnail';

class SignatureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null
    };
    
    this.selectVideo = this.selectVideo.bind(this);
  }
  
  selectVideo(video) {
    this.setState({
      current: video
    });
  }

  // Set current video after data loads
  componentWillUpdate(nextProps, nextState) {
    if (this.state.current === null && nextProps.videos.length > 0) {
      this.setState({
        current: nextProps.videos[0]
      });
    }
  }
  
  render() {
    var thumbnails = this.props.videos.map((video) => {
      return (
        <SignatureThumbnail key={video.url} video={video} onVideoSelect={this.selectVideo} />
      );
    });
    var content = '';
    if (this.state.current) {
      let currentVideoID = url.parse(this.state.current.url, true).query.v;
      content = (
        <Row>
          <Col sm={7} className='video-player'>
            <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${currentVideoID}`} frameborder="0" allowfullscreen></iframe>
          </Col>
          <Col sm={5} className='grid'>
            {thumbnails}
          </Col>
        </Row>
      );
    }
    else {
      content = (
        <Row>
          <Col sm={12}>
            Loading...
          </Col>
        </Row>
      );
    }
    
    return (
      <div className='signatures'>
        <h2 className='text-center'>Recent Signatures</h2>
        {content}
      </div>
    );
  }
}

export default SignatureList;
