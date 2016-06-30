import React from 'react';
import SignatureItem from './SignatureItem';
import Footer from './Footer';
require('jquery');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  componentDidMount() {
    $.get('https://localhost:3000/api/videos')
    .done((data) => {
      this.setState({
        videos: data
      });
    });
  }

  render() {
    var signatures = this.state.videos.map((video) => {
      return (
        <SignatureItem key={video.id} signature={video} />
      );
    });

    return (
      <div className='container'>
        <header>
          <h1>Dashboard</h1>
        </header>
        <h2>Past signatures</h2>
        <div className='signature-list'>
          {signatures}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;