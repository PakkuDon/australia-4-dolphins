import React from 'react';
import { Row, Col } from 'react-bootstrap';
var aboutImg = require('../../images/mb20.jpg');

class About extends React.Component {
  render() {
    return (
      <div>
        <h2 className='text-center'>About Australia for Dolphins</h2>
        <div className='about'>
          <Row>
            <Col sm={6}>
              <p>
                Thanks so much for your interest in what AFD's doing to stop dolphin hunting in Japan.
              </p>
              <p>
                AFD aims to use creative, high-impact advocacy to tackle this problem on all available fronts - through political, economic and legal means. In all our initiatives, we believe in taking a peaceful and lawful approach. We also see enormous value in working together and joining forces with organisations in Japan and elsewhere doing wonderful work to protect dolphins.
              </p>
              <p>
                You can read about some of our specific campaigns by selecting one below. We have a real optimism that, through these initiatives and others, AFD can make a meaningful contribution to stopping cruelty to dolphins. We truly hope you'll join us.
              </p>
            </Col>
            <Col sm={6}>
              <img width='100%' src={aboutImg} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default About;