import React from 'react';
import { Row, Col, Button, Jumbotron } from 'react-bootstrap';

class Banner extends React.Component {
  render() {
    return (
      <Jumbotron>
        <Row className='show-grid'>
          <Col xs={2} xsOffset={10}>
            <Button bsStyle='primary' onClick={this.props.onAdd}>Add video</Button>
          </Col>
        </Row>
      </Jumbotron>
    );
  }
}

export default Banner;