import React from 'react';
require('odometer');
require('odometer/themes/odometer-theme-minimal.css');
var logo = require('../../images/AFD-logo-text-02.jpg');
var bannerImg = require('../../images/mike-baird-image.jpg');

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className='banner'>
          <img className='logo' src={logo} alt='Australia for Dolphins logo' />
          <img src={bannerImg} style={{ width: '100%', height: 'auto' }} alt='Petition banner' />
          <div className='header-content'>
            <div className='signature-count center-block'><span className='odometer'>{this.props.count}</span> videos sent to Mike Baird</div>
            <button className='record-btn center-block' onClick={this.props.onAdd}>Create your video now</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;