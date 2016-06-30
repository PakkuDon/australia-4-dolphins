import React from 'react';
import url from 'url';

class SignatureThumbnail extends React.Component {
  constructor(props) {
    super(props);
    
    this.onClick = this.onClick.bind(this);
  }
  
  onClick() {
    this.props.onVideoSelect(this.props.video);
  }
  
  render() {
    var videoID = url.parse(this.props.video.url, true).query.v;
    return (
      <div className='thumbnail' onClick={this.onClick}>
        <img src={`http://img.youtube.com/vi/${videoID}/default.jpg`} alt='thumbnail' />
      </div>
    );
  }
}

export default SignatureThumbnail;