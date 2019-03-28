import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import axios from 'axios';
import Message from "./MessageComponent"
import auth from '../../Services/authService'
import '../workspace/ChatComponent.css'

const signalR = require("@aspnet/signalr");

class ChatComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      chatID: '',
      userName: '',
      message: '',
      messages: [],
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
        this.setState({userName:res.data.name})
      });

      this.state.hubConnection.on('ReceiveMessage', (userID, receivedMessage, chatID) => {
        if(this.props.chatID != chatID)
        {
          // handle notifications
          return;
        }
        
        const text = `${receivedMessage}`;
        this.fetchUsername(userID).then(res => {
          var senderName = res.data.name
          const singleMessage = { text: `${receivedMessage}`, sender: senderName, currentTime: this.currentTime() }
          const messages = this.state.messages.concat([singleMessage]);
          this.setState({ messages });

        });
      });
    });
  };


  componentWillReceiveProps =() =>
  {
    const messages=[];
    this.setState({messages})
  }

  

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
    //const amPm = currentDate.get

    // const properHours = Number.MIN_VALUE(Number.MAX_VALUE(Math.abs(12-hours),12),hours)
    currentDate = (hours > 12 || hours == 0 ? Math.abs(hours - 12) : hours) + ':' + minutes + (hours < 12 ? ' am' : ' pm');
    return currentDate;
  }

  fetchUsername = (userID) => {
    // needs authentication
    return axios(auth.includeAuth({
      method: 'get',
      url: `http://localhost:5000/api/users/${userID}`,

    }))
  };

  render() {
    return (
      <div>
        <div className="scrollableContainer">
          {this.state.messages.map((message, index) => (
            <Message
                  key={index} 
                  userName={message.sender} 
                  messageText={message.text} 
                  currentTime={message.currentTime}
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
