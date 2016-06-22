import React from 'react';
import { Jumbotron } from 'react-bootstrap';
require('odometer');
require('odometer/themes/odometer-theme-minimal.css');

class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Australia For Dolphins</h1>
        </header>
        <Jumbotron className='banner'>
          <h1 className='text-center'>Mike, do right by dolphins!</h1>
          <h2 className='text-center'><span className='count odometer'>{this.props.count}</span></h2>
          <p className='text-center'>people want Mike to pass legislation to ban dolphin captivity</p>
          <button className='record-btn center-block' onClick={this.props.onAdd}>Add your video for Mike</button>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;