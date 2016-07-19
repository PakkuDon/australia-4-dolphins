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
      ],
      markers: [
        [-37.8086538,144.9629293],
        [-27.28, 153.02],
        [-33.51, 151.12]
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
            <SignatureMap markers={this.state.markers} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default CountryStatistics;