import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import axios from 'axios';
import config from '../../config'
import auth from '../../Services/authService'
const BASE_URL = `${config.BASE_URL}`

library.add(farThumbsUp);
library.add(faThumbsUp);
library.add(faTimes);
library.add(faPencilAlt);

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.userName,
      userID: auth.getCurrentUserId(),
      messageID: this.props.messageId,
      senderID: this.props.senderId,
      isLiked: false,
      isDeleted: false,
      isEditable: false,
      messageContent: this.props.messageText,
      likeCount: 0
    };
  }


  componentDidMount() {
    this.isLikedAPI();
    this.getLikeCount();
  }

  getLikeCount() {
    axios(auth.includeAuth({
      method: 'get',
      url: BASE_URL + `/messages/` + this.state.messageID,
    }))
    .then(response => {
      this.setState({ likeCount: response.data});
    });
  }

  isLikedAPI() {
    var headersAPI = {
      messageId: this.state.messageID,
      userId: this.state.userID
    };
    axios(auth.includeAuth({
      method: 'get',
      url: BASE_URL + `/messages/isliked`,
      headers: headersAPI
    }))
    .then(response => {
      if (this.state.isLiked == response.data) {
        return null;
      }
      this.setState({ isLiked: response.data });
    });
  }

  likeMessage() {
    var header = {
      messageId: this.state.messageID,
      userId: this.state.userID,
    };
    var newCount = this.state.likeCount;
    if (this.state.isLiked) {
      axios(auth.includeAuth({
        method: 'post',
        url: BASE_URL + `/messages/RemoveLike`,
        headers: header,
        data: {}
      }));
      newCount--;
    } else {
      axios(auth.includeAuth({
        method: 'post',
        url: BASE_URL + `/messages/AddLike`,
        headers: header,
        data: {}
      }));
      newCount++;
    }
    this.setState({likeCount: newCount})
    this.setState({ isLiked: !this.state.isLiked });
  }

  editMessage = e => {
    if (this.state.userID == this.state.senderID){
    if (e.key === "Enter") {
      var header = {
        id: this.state.messageID,
        Messagecontent: e.target.value,
      };
      axios(auth.includeAuth({
        method: 'put',
        url: BASE_URL + `/messages/EditMessage`,
        headers: header,
        data: {}
      }));
      this.setState({ isEditable: false });
      this.setState({ messageContent: e.target.value });
    }
  }
  };

  showTextArea() {
    this.setState({ isEditable: true });
  }

  deleteMessage() {
    var header = {
      id: this.state.messageID,
    };
    axios(auth.includeAuth({
      method: 'delete',
      url: BASE_URL + `/messages`,
      headers: header
    }));
    this.setState({ isDeleted: true });
  }

  render() {
    if (this.state.isLiked) {
      var likeIcon = faThumbsUp;
    } else {
      var likeIcon = farThumbsUp;
    }

    return (
      <div className={this.state.isDeleted ? "displayNone" : "mainContainer"}>
        <div className="SenderInfoContainer">
          <Image
            className="message-user-img"
            src="https://i2.wp.com/crimsonems.org/wp-content/uploads/2017/10/profile-placeholder.gif?fit=250%2C250&ssl=1"
            roundedCircle
          />
          <div className="UserNameAndTimeContainer">
            <span>
              <b>{this.props.username}</b>
            </span>
            <span>{this.props.currentTime} </span>
          </div>
        </div>
        <span className="message-buttons">
          <button
            className="btn btn-default"
            onClick={this.likeMessage.bind(this)}
          >          {this.state.likeCount}
            <FontAwesomeIcon icon={likeIcon} />
          </button>
          <button
            className="btn btn-default"
            onClick={this.showTextArea.bind(this)}
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            className="btn btn-default"
            onClick={this.deleteMessage.bind(this)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </span>
        <div className="messageContainer">
          {!this.state.isEditable ? (
            <span><p>{this.state.messageContent}</p></span>
          ) : (
            <input
              type="text"
              onKeyPress={e => this.editMessage(e)}
              defaultValue={this.state.messageContent}
              className="editableMessageText"
            />
          )}
        </div>
      </div>
    );
  }
}

export default Message;
