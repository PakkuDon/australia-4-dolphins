import React from 'react';

class ShareScreen extends React.Component {
  render() {
    return (
      <div className='text-center'>
        <h2>Thank you!</h2>
        <p>Your video has been submitted</p>
        <a className='share-button share-facebook' 
          href={`http://www.facebook.com/sharer/sharer.php?u=${this.props.url}`} 
          target='_blank'>
          <i className='fa fa-facebook' aria-hidden='true'></i> Share on Facebook
        </a>
        <a className='share-button share-twitter' 
          href={`https://twitter.com/intent/tweet?url=${this.props.url}`} 
          target='_blank'>
          <i className='fa fa-twitter' aria-hidden='true'></i> Share on Twitter
        </a>
      </div>
    );
  }
}

export default ShareScreen;