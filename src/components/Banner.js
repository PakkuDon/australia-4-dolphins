import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

class Banner extends React.Component {
  render() {
    return (
      <Jumbotron className='banner'>
            <h1 className='text-center'>Mike, do right by dolphins!</h1>
            <h2 className='text-center'><span className='count'>1,345</span></h2>
            <p className='text-center'>people want Mike to pass legislation to ban dolphin captivity</p>
            <button className='record-btn center-block' onClick={this.props.onAdd}>Add your video for Mike</button>
      </Jumbotron>
    );
  }
}

export default Banner;