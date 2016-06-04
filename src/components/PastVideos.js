import React from 'react';
import url from 'url';

class PastVideos extends React.Component {
  render() {
    // TODO: Replace placeholder playlist
    return (
      <div>
        <h2 className='text-center'>Recent Signatures</h2>
        <div>
          <iframe width="560" height="315" className='center-block' 
            src="https://www.youtube.com/embed/videoseries?list=PLBDBA870DF26340C0" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    );
  }
}

export default PastVideos;