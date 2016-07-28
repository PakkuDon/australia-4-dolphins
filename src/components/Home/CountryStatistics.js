import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TopStatesList from './TopStatesList';
import SignatureMap from './SignatureMap';

class CountryStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top_states: [
        'Victoria', 'New South Wales', 'Queensland'
      ]
    };
  }

  render() {
    return (
      <div>
        <h2 className='text-center'>Who's signing</h2>
        <Row>
          <Col sm={4}>
            <TopStatesList states={this.state.top_states} />
          </Col>
          <Col sm={8}>
            <SignatureMap signatures={this.props.signatures} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CountryStatistics;