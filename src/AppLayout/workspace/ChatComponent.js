import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import Message from "./MessageComponent"
import auth from '../../Services/authService'
import '../workspace/ChatComponent.css'
import config from '../../config'
const BASE_URL = "${config.BASE_URL}"

const signalR = require("@aspnet/signalr");

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      chatID: '',
      userName: '',
      message: '',
      hubConnection: null,
    };
  }

  componentDidMount = () => {
    const userID = this.props.userID
    const chatID = this.props.chatID
    const hubConnection = this.props.hubConnection

    this.setState({ hubConnection, userID, chatID }, () => {

      this.fetchUsername(userID).then(res => {
        console.log(res)
        this.setState({userName:res.data.userName})
      });

      this.state.hubConnection.on('ReceiveMessage', (userID, receivedMessage, chatID) => {
        if(this.props.chatID != chatID)
        {
          // handle notifications
          this.props.updateNotifications(chatID)
          return;
        }
        
        const text = `${receivedMessage}`;
        this.fetchUsername(userID).then(res => {
          var senderName = res.data.userName
          const singleMessage = { 
            message:{
              "senderID": userID,
              "chatId": chatID,
              "messageContent": receivedMessage,
              "timeStamp": this.currentTime()
            },
            "userName": senderName
          }
          this.props.concatMessage(singleMessage);
        });
      });
    });
  };




  // componentWillReceiveProps =() =>
  // {
   
  //   const messages=[];
  //   this.setState({messages})
  // }

  

  sendMessage = (e) => {
    if (e.type != 'click' && e.which != 13)
      return;
    if (this.state.message.trim().length == 0)
      return;
    this.state.hubConnection
      .invoke('sendToChatID', this.props.userID, this.props.chatID, this.state.message)
      .catch(err => console.error(err));

    this.setState({ message: '' });
  };



  currentTime = () => {
    var currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = ("0" + currentDate.getMinutes()).slice(-2); //transform to 2 digit number
    
    currentDate = (hours > 12 || hours == 0 ? Math.abs(hours - 12) : hours) + ':' + minutes + (hours < 12 ? ' am' : ' pm');
    return currentDate;
  }

  standardizeTimeStamp = (timeStamp) =>{
    //2019-03-30T12:54:01.867335
    if(!timeStamp.includes("T")) //Don't do anything if time comes from front end
      return(timeStamp)
    var time = timeStamp.split("T")[1];
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    
    var currentDate = (hours > 12 || hours == 0 ? Math.abs(hours - 12) : hours) + ':' + minutes + (hours < 12 ? ' am' : ' pm');
    return currentDate;
  }

  fetchUsername = (userID) => {
    // needs authentication
    return axios(auth.includeAuth({
      method: 'get',
      url: `${config.BASE_URL}/users/${userID}`,

    }))
  };

  render() {
    return (
      <div>
        <div className="scrollableContainer">
          {this.props.messages.map(({message,userName}, index) => (
            <Message
                  key={index}
                  senderId = {message.senderID}
                  messageId = {message.id}
                  userName={userName}
                  messageText={message.messageContent} 
                  likeCount= {message.likeCount}
                  currentTime={this.standardizeTimeStamp(message.timeStamp)}
            />
          ))}
        </div>

        <InputGroup className="stayAtBottomInput" size="lg">
          <FormControl
            onKeyPress={this.sendMessage}
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            placeholder="Send Your Message"
            aria-describedby="basic-addon2"
            aria-describedby="inputGroup-sizing-sm"
          />
        </InputGroup>
      </div>
    );
  }
}

export default ChatComponent;
