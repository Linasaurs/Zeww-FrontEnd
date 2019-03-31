import React from 'react';
import './DirectMessage.css';
import auth from '../../Services/authService';
import axios from 'axios'
const BASE_URL = "http://10.0.67.127:8080/api"

export default class NameTagComponant extends React.Component {
    handleClick = () => {
      if(this.props.isPrivate){
        this.props.setCurrentChannelName(this.props.obj.userName)
        this.userClicked(this.props.obj.id)
      }
      else{
        this.props.setCurrentChannelName(this.props.obj.name)
        this.props.setCurrentChatId(this.props.obj.id)
        axios(auth.includeAuth({
          method: 'put',
          url: `${BASE_URL}/users/setTimeStampForChat/${this.props.obj.id}`,
        }))
        .then(response =>{
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        })
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
        
        axios(auth.includeAuth({
          method: 'put',
          url: `${BASE_URL}/users/setTimeStampForChat/${chatId}`,
        }))
        .then(response =>{
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        })

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
            <span>
              {this.props.obj.userName}
              {
                this.props.obj.notificationCount?
                <span className="notificationHolder">
                    {this.props.obj.notificationCount}
                </span>
                :null
              }
            </span>
              :
              <span>
                {this.props.obj.name}
                {this.props.obj.notificationCount?
                  <span className="notificationHolder">
                      {this.props.obj.notificationCount}
                  </span>:
                  null
                }
              </span>
            }
          </label>
        </div>
      )
    }
  
  }