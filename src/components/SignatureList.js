import React from 'react';
import url from 'url';
import { Row, Col } from 'react-bootstrap';
import SignatureThumbnail from './SignatureThumbnail';

class SignatureList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: this.props.videos[0]
    };
    
    this.selectVideo = this.selectVideo.bind(this);
  }
  
  selectVideo(video) {
    this.setState({
      current: video
    });
  }
  
  render() {
    this.state = {
      current: this.props.videos[0]
    };
    var thumbnails = this.props.videos.map((video) => {
      return (
        <SignatureThumbnail key={video.url} video={video} onVideoSelect={this.selectVideo} />
      );
    });
    var currentVideoID = url.parse(this.state.current.url, true).query.v;
    
    return (
      <div className='signatures'>
        <h2 className='text-center'>Recent Signatures</h2>
        <Row>
          <Col sm={7} className='video-player'>
            <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${currentVideoID}`} frameborder="0" allowfullscreen></iframe>
          </Col>
          <Col sm={5} className='grid'>
            {thumbnails}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignatureList;
