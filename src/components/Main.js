require('normalize.css/normalize.css');
require('styles/App.scss');
require('jquery');

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SignatureList from './SignatureList';
import VideoForm from './VideoForm';
import About from './About';

var testData = [
  {
    url: 'https://www.youtube.com/watch?v=M3hFN8UrBPw'
  },
  {
    url: 'https://www.youtube.com/watch?v=7kvmPh2nYBM'
  },
  {
    url: 'https://www.youtube.com/watch?v=hdG-e_Joc8Q'
  },
  {
    url: 'https://www.youtube.com/watch?v=-zA1jRmAYfU'
  },
  {
    url: 'https://www.youtube.com/watch?v=sI8NsYIyQ2A'
  },
  {
    url: 'https://www.youtube.com/watch?v=y2Ky3Wo37AY'
  },
  {
    url: 'https://www.youtube.com/watch?v=-2xuO8JBepM'
  },
];

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false,
      videos: [{url:''}]
    };

    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
    this.updateVideos = this.updateVideos.bind(this);
  }

  updateVideos() {
    var ReactClass = this;
    $.get('https://localhost:3000/api/videos')
      .done(function(data){
        console.log(data);
        ReactClass.setState({videos: data});
      });
  }

  componentDidMount() {
    var ReactClass = this;
    console.log('I mounted')
    this.updateVideos();
    setInterval(this.updateVideos, 3000);
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
      <div className="container index">
        <Header onAdd={this.showForm} count={this.state.videos.length} />
        <SignatureList videos={this.state.videos} />
        <About />
        <VideoForm visible={this.state.formVisible} onHide={this.hideForm} />
        <Footer />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
