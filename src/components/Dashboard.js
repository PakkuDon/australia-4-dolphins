import async from 'async';
import React from 'react';
import { Button } from 'react-bootstrap';
import SignatureItem from './Dashboard/SignatureItem';
import DeleteConfirmationForm from './Dashboard/DeleteConfirmationForm';
import Footer from './Footer';
require('jquery');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      formVisible: false,
      selected: []
    };

    this.loadVideos = this.loadVideos.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  handleDelete() {
    // Delete selected videos from database
    var requests = [];
    this.state.selected.forEach((signature_id) => {
      requests.push((callback) => {
        $.ajax({
          url: `https://localhost:3000/api/videos/${signature_id}`,
          method: 'DELETE'
        })
        .done((data) => {
          callback(true);
        });
      }); 
    });
    
    // TODO: Error handling
    async.parallel(requests, (err, results) => {
      this.setState({
        selected: []
      });
      this.loadVideos();
      this.hideForm();
    })
  }

  handleSelect(id, isSelected) {
    var selectedItems = this.state.selected;
    if (isSelected) {
      selectedItems.push(id);
    }
    else {
      var index = selectedItems.indexOf(id);
      selectedItems.splice(index, 1);
    }

    this.setState({
      selected: selectedItems
    });
  }

  showForm() {
    this.setState({
      formVisible: true
    });
  }

  hideForm() {
    this.setState({
      formVisible: false
    });
  }

  render() {
    var signatures = this.state.videos.map((video) => {
      var isSelected = this.state[video.id];
      return (
        <SignatureItem key={video.id} signature={video}
          onSelect={this.handleSelect} selected={isSelected} />
      );
    });

    return (
      <div className='container'>
        <header>
          <h1>Dashboard</h1>
        </header>
        <h2>Past signatures</h2>
        <Button bsStyle='danger' disabled={this.state.selected.length == 0} 
          onClick={this.showForm}>Delete selected items</Button>
        <div className='signature-list'>
          {signatures}
        </div>
        <DeleteConfirmationForm visible={this.state.formVisible} 
          onHide={this.hideForm} onConfirm={this.handleDelete} />
        <Footer />
      </div>
    );
  }
}

export default Dashboard;