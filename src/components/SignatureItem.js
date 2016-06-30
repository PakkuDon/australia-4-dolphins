import React from 'react';
import url from 'url';
import moment from 'moment';

class SignatureItem extends React.Component {
  render() {
    var signature = this.props.signature;
    var videoID = url.parse(signature.url, true).query.v;

    return (
      <div key={signature.id} className='signature-item'>
        <div className='thumbnail'>
          <img src={`http://img.youtube.com/vi/${videoID}/default.jpg`} alt='thumbnail' />
        </div>
        <div className='details'>
          <dl className='dl-horizontal'>
            <dt>Name</dt>
            <dd>{signature.first_name + ' ' + signature.last_name}</dd>
            <dt>Email</dt>
            <dd>{signature.email}</dd>
            <dt>Phone</dt>
            <dd>{signature.phone}</dd>
            <dt>Post code</dt>
            <dd>{signature.post_code}, {signature.country}</dd>
            <dt>Date posted</dt>
            <dd>{moment(signature.created).format('MMM Do YYYY, h:mm A')}</dd>
          </dl>
        </div>
      </div>
    );
  }
}

export default SignatureItem;