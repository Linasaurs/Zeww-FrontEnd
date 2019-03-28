import React, { Component } from "react";
//import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Axios from "axios";

class ViewChannelDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.viewChannelDetailsToggle
    };

    
  }


  fetchData() {
    // Axios.get(`https://localhost:44346/api/chats/GetChannelDetails/1`).then(
    //   res => {
    //     console.log(res.data);
    //     var channelDetailObject = new Object();
    //     channelDetailObject.name = res.data.chatDetails.name;
    //     channelDetailObject.url = res.data.url;
    //     channelDetailObject.purpose = res.data.chatDetails.purpose;
    //     channelDetailObject.creator = res.data.chatDetails.creatorID;
    //     channelDetailObject.numberOfMembers = res.data.numberOfUsers;
    //     console.log(channelDetailObject);
    //     this.props.setChannelDetails(channelDetailObject);
    //   }
    // );
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  componentDidUpdate()
  {
    console.log(this.props.toggle)
  }
  componentDidMount() {
    this.fetchData();
  }

  render() {
    const {
      name,
      url,
      purpose,
      creator,
      numberOfMembers
    } = this.props.channelDetails;
    return (
      <div> 
        <Modal
          isOpen={this.props.toggle}
          toggle={this.props.toggleViewChannelDetails}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggleViewChannelDetails}>Channel Name: {name}</ModalHeader>
          <ModalBody>
            <p>Workspace link: {url}</p>
            <p>Channel Purpose: {purpose}</p>
            <p>Channel Creator: {creator}</p>
            <p>Number of Members: {numberOfMembers}</p>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ViewChannelDetails;
