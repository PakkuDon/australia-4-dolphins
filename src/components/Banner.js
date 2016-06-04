import React from 'react';
import { Row, Col, Button, Jumbotron } from 'react-bootstrap';

class Banner extends React.Component {
  render() {
    return (
      <Jumbotron className='banner'>
        <Row className='show-grid'>
          <Col xs={12}>
            <h2 className='text-center'>Mike, do right by dolphins!</h2>
          </Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row>
          <Col sm={6}>
            <div>
              <button className='record-btn' onClick={this.props.onAdd}>Record</button>
            </div>
            <p className='text-center'>
              Record your video for Mike Baird
            </p>
          </Col>
          <Col sm={6}>
            <div className='statistics'>
              <p>1,345 Video Petitions</p>
              <p>8,323 Total Hours of Video</p>
              <p>543 Petitions from NSW</p>
            </div>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default Banner;