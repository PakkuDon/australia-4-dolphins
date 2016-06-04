require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Header from './Header';
import Banner from './Banner';
import Footer from './Footer';
import VideoList from './VideoList';
import VideoForm from './VideoForm';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
    
    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  
  hideForm() {
    this.setState({
      formVisible: false
    });
  }
  
  showForm() {
    this.setState({
      formVisible: true
    });
  }
  
  render() {
    return (
      <div className="index">
        <Header />
        <Banner onAdd={this.showForm} />
        <VideoList />
        <VideoForm visible={this.state.formVisible} onHide={this.hideForm} />
        <Footer />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
