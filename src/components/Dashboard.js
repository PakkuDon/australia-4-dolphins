import React from 'react';
import SignatureItem from './Dashboard/SignatureItem';
import Footer from './Footer';
require('jquery');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };

    this.loadVideos = this.loadVideos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  loadVideos() {
    $.get('https://localhost:3000/api/videos')
    .done((data) => {
      this.setState({
        videos: data
      });
    });
  }

  componentDidMount() {
    this.loadVideos();
  }

  handleDelete(id) {
    // Delete selected video from database
    $.ajax({
      url: `https://localhost:3000/api/videos/${id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.loadVideos();
    });
  }

  render() {
    var signatures = this.state.videos.map((video) => {
      return (
        <SignatureItem key={video.id} signature={video}
          onDelete={this.handleDelete} />
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