import React from 'react';
import './DirectMessage.css';
import auth from '../../Services/authService';
import axios from 'axios'
const BASE_URL = "http://localhost:5000/api"

export default class NameTagComponant extends React.Component {
    handleClick = () => {
      if(this.props.isPrivate){
        this.props.setCurrentChannelName(this.props.obj.userName)
        this.userClicked(this.props.obj.id)
      }
      else{
        this.props.setCurrentChannelName(this.props.obj.name)
        this.props.setCurrentChatId(this.props.obj.id)
      }                 
    }  

    userClicked = (userId) => {
      axios(auth.includeAuth({
        method: 'get',
        url: `${BASE_URL}/users/getprivatechat/${userId}/${this.props.CurrentWorkspace.Id}`,
      }))
      .then(response => {
        console.log(response.data)
        const chatId = response.data.id;
        this.props.setCurrentChatId(chatId);
        
        if(response.status == 201){
          var loggedInUser = auth.getCurrentUserId();
          //join current user to chatId group userId
          //join clicked user to chatId group
          axios(auth.includeAuth({
            method: 'get',
            url: `${BASE_URL}/users/GetSocketConnectionId/${userId}`,
          }))
          .then(response => {
            var userConnectionId = response.data;
            this.props.hubConnection
            .invoke('joinChannelWitchConnectionId', chatId, userConnectionId)
            .catch(err => console.error(err));

            this.props.hubConnection
            .invoke('joinChannel', chatId)
            .catch(err => console.error(err));
          })
          .catch(error => {
            this.props.hubConnection
            .invoke('joinChannel', chatId)
            .catch(err => console.error(err));
          })
        }
      })
      .catch(error => {
        //handle whatever needed
        console.log(error)
      })
    }
    render() {
      return (
        <div key={this.props.i} className="NameTags"
             onClick={ this.handleClick }
              // onClick = {() =>this.props.setCurrentChatId(this.props.obj.id) }
                        >
          <label className="UserName">
            {this.props.isPrivate?
              this.props.obj.userName
              :
              this.props.obj.name
            }
          </label>
        </div>
      )
    }
  
  }