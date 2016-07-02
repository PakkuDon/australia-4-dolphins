import React from 'react';
import url from 'url';
import moment from 'moment';
import { Button, Row, Col } from 'react-bootstrap';

class SignatureItem extends React.Component {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e) {
    this.props.onSelect(this.props.signature.id, e.target.checked);
  }

  render() {
    var signature = this.props.signature;
    var videoID = url.parse(signature.url, true).query.v;

    return (
      <div className='signature-item'>
        <Row>
          <Col sm={1}>
            <input type='checkbox' ref='selected' onChange={this.onSelect} />
          </Col>
          <Col sm={2}>
            <img src={`http://img.youtube.com/vi/${videoID}/default.jpg`} alt='thumbnail' />
          </Col>
          <Col sm={9}>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default SignatureItem;