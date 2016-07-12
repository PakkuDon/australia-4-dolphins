require('normalize.css/normalize.css');
require('styles/App.scss');
import $ from 'jquery';

import React from 'react';
import Header from './Home/Header';
import SignatureList from './Home/SignatureList';
import About from './Home/About';
import Footer from './Footer';
import VideoForm from './VideoForm';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      videos: [],
      intervalID: null
    };

    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.updateVideos = this.updateVideos.bind(this);
  }

  updateVideos() {
    $.get('https://localhost:3000/api/videos')
      .done((data) => {
        this.setState({ videos: data });
      });
  }

  componentDidMount() {
    this.updateVideos();
    this.setState({
      intervalID: setInterval(this.updateVideos, 3000)
    });
  }

  componentWillUnmount() {
    // Stop requesting video data on current component
    clearInterval(this.state.intervalID);
    this.setState({
      intervalID: null
    });
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
      <div className="container">
        <Header onAdd={this.showForm} count={this.state.videos.length} />
        <SignatureList videos={this.state.videos} />
        <About />
        <VideoForm visible={this.state.formVisible} onHide={this.hideForm} />
        <Footer />
      </div>
    );
  }
}

Home.defaultProps = {
};

export default Home;
