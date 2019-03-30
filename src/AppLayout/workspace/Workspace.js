import React from 'react';
import axios from "axios";
import WorkSpaceLoadingScreen from "./WorkSpaceLoadingScreen"
import WorkSpaceHeader from "./WorkSpaceHeader"
import WorkSpaceChannels from "./WorkSpaceChannels"
import WorkSpaceChat from "./WorkSpaceChat"
import Sidebar from "react-sidebar";
import BurgerMenu from './burger_menu/components/burgermenu/BurgerMenu'
import FilesContainer from './burger_menu/components/files/FilesContainer'
import ViewChannelDetails from './burger_menu/components/channeldetails/ViewChannelDetails'
import '../workspace/ChannelView.css'
import auth from '../../Services/authService'
import ChatComponent from './ChatComponent'
const signalR = require("@aspnet/signalr");
const BASE_URL = "http://localhost:5000/api"

class Workspace extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      users: [],
      channels: [],
      directMessages: [],
      currentChatMessages: [],
      hubConnection : null,
      channelName:"",
      CurrentWorkspace:this.props.location.workspace,
      workSpaceImg: null,
      isLoading: true,
      sidebarOpen: false,
      files : 
      [
        {
          "name" : "Project Framework" , 
          "sender" : "Ziad Ali" , 
          "timestamp" : "Feb 22nd at 10:03 AM" , 
          "extension" : "src" , 
          "image" : "Orchestra" , 
          "downloadUrl" : "someurl"

        },
        {
            "name" : "Zeww UI" , 
            "sender" : "Maha Elleci" , 
            "timestamp" : "Feb 22nd at 10:03 AM" , 
            "extension" : "xd" , 
            "image" : "someurl" , 
            "downloadUrl" : "someotherurl"
        },
        {
            "name" : "Weird Files" , 
            "sender" : "Mohamed Wa'el" , 
            "timestamp" : "Feb 22nd at 10:03 AM" , 
            "extension" : "" , 
            "image" : "someurl" , 
            "downloadUrl" : "justaurl"
        }
      ],

      ChannelDetails: {
        name: "",
        url: "",
        purpose: "",
        creator: -1,
        numberOfMembers: 0
      },
      filesContainerOpen : false,
      viewChannelDetailsToggle : false,
      currentChatId: null,
      currentUserID: undefined

    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() 
  {
    let hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chat") //http://10.0.67.127:8080/chat
    .build();

    this.setState({
      currentUserID: auth.getCurrentUserId(),
      hubConnection
    },() => {
      console.log("Current User ID :",this.state.currentUserID)
          //check after running 
    hubConnection
    .start()
    .then(() => {
      this.OnWorkspaceConnect()
      console.log('Connection started!');
    }).catch(err => console.log('Error while establishing connection :('));
    });

    // async function connect(conn){
    //   hubConnection.start().catch( e => {
    //       sleep(5000);
    //       console.log("Reconnecting Socket");
    //       connect(hubConnection);  
    //   })
    // }
  
    // hubConnection.onclose(function (e) {
    //   connect(connection);
    // });

    var config = {
      headers: { 'Authorization': "bearer " + localStorage.getItem('token')
     }
    };
    var self = this
    axios.get(`${BASE_URL}/workspaces/getusersbyworkspaceid/${self.state.CurrentWorkspace.Id}`, config)
         .then(x => this.setState({ users: x.data.filter(item => item.id != this.state.currentUserID) }));

    axios(auth.includeAuth({
      method: 'get',
      url: `${BASE_URL}/chats/GetAllChannelsInsideWorkspace?workspaceId=${this.state.CurrentWorkspace.Id}`,

    }))
   .then(response => {
     //join user to groups available 
      this.setState({
        channels: response.data.filter(chat => !chat.isPrivate),
        directMessages: response.data.filter(chat => chat.isPrivate)}, () => {
          this.fetchNotifications()
            // this.setState({currentChatId: this.state.channels[0].id})
            this.setCurrentChatId(this.state.channels[0].id)
          } 
        )
    });

    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      1500
    );

    
  }

  

  // Associated Helper Functions
 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
  
 fetchNotifications= () =>{
  axios(auth.includeAuth({
    method: 'get',
    url: `${BASE_URL}/workspaces/GetUnseenMessagesCountPerChat/${this.state.CurrentWorkspace.Id}`,

  }))
  .then(response =>{
    const channels = this.state.channels
    channels.forEach(channel => {
      channel.notificationCount = response.data[channel.id]
    });

    const directMessages = this.state.directMessages
    directMessages.forEach(directMessage => {
      directMessage.notificationCount = response.data[directMessage.id]
    });

    const users = this.state.users
    users.forEach(user => {
      //user.notificationCount
      var userId = user.id
      directMessages.forEach(directMessage => {
        const user1Id = directMessage.name.substring(2).split(",")[0];
        const user2Id = directMessage.name.substring(2).split(",")[1];

        if(userId == user1Id || userId == user2Id){
          user.notificationCount = directMessage.notificationCount
        }
      })
    });
  })
  .catch(error =>{
    console.log("GetUnseenMessagesCountPerChat :",error)
  })
}

 setChannelDetails = Details => {
    this.setState({
      ChannelDetails: Details
    });
  };

  toggleFilesContainer = () =>
  {
    var flag = !this.state.filesContainerOpen;
    this.setState({filesContainerOpen : flag});
    console.log("Open Files Container")
  }

  toggleViewChannelDetails = () =>
  {
    var flag = !this.state.viewChannelDetailsToggle;
    this.setState({viewChannelDetailsToggle : flag});
    console.log(flag)
  }

  burgerMenuComponentSwitch()
  {
    if(this.state.filesContainerOpen)
    {
      return <FilesContainer files={this.state.files} getfiles={this.setFiles} toggleFilesContainer={this.toggleFilesContainer}/>
    }
    else
    {
      return <BurgerMenu toggleFilesContainer={this.toggleFilesContainer} toggleViewChannelDetails={this.toggleViewChannelDetails}/>
    }
  }

  setFiles = (returnedFiles)=>
  {
    this.setState({
      files : returnedFiles
    });
  }

  

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  OnWorkspaceConnect = () => {
    this.state.hubConnection
      .invoke('OnWorkspaceConnect', this.state.currentUserID,this.state.CurrentWorkspace.Id)
      .catch(err => console.error(err));
  };

  setCurrentChatId = (id) =>{

    var channels = this.state.channels
    var directMessages = this.state.directMessages
    var users = this.state.users

    const channel = this.state.channels.find(channel => channel.id == id);
    const directMessage = this.state.directMessages.find(directMessage => directMessage.id == id);

    if(channel != null){
      channel.notificationCount = 0;
      this.setState({channels})
    }
    else if(directMessage != null){
      const user1Id = directMessage.name.substring(2).split(",")[0];
      const user2Id = directMessage.name.substring(2).split(",")[1];

      const user = users.find(user => user.id == user1Id || user.id == user2Id)
      user.notificationCount = 0;
      this.setState({users})
    }

    axios(auth.includeAuth({
      method: 'get',
      url: `${BASE_URL}/messages/GetMessagesinChat/${id}`,
    })).then(response => {
      this.setState({
        currentChatId: id,
        currentChatMessages: response.data
      })
      console.log("this is the messages",response);
    })
  }
  
  setCurrentChannelName = (channelName) =>{
    this.setState({
      channelName: channelName
    })
  }

  concatMessage = (singleMessage)=>
  {
      const currentChatMessages = this.state.currentChatMessages.concat([singleMessage]);
      this.setState({ currentChatMessages });
  }
  
  updateNotifications = (chatId) =>{
    var channels = this.state.channels
    var directMessages = this.state.directMessages
    var users = this.state.users

    const channel = this.state.channels.find(channel => channel.id == chatId);
    const directMessage = this.state.directMessages.find(directMessage => directMessage.id == chatId);

    if(channel != null){
      channel.notificationCount = channel.notificationCount + 1;
      this.setState({channels})
    }

    else if(directMessage != null){
      const user1Id = directMessage.name.substring(2).split(",")[0];
      const user2Id = directMessage.name.substring(2).split(",")[1];

      const user = users.find(user => user.id == user1Id || user.id == user2Id)
      user.notificationCount = user.notificationCount + 1;
      this.setState({users})
    }

  }


 // Associated Helper Functions END
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 
   
  render() {
    return (
      this.state.isLoading ? <WorkSpaceLoadingScreen /> :

        <Sidebar
          sidebar={this.burgerMenuComponentSwitch()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
          styles={{ sidebar: { width: "30rem", height : "100%" } }}>
          <div>
          <ViewChannelDetails
            channelDetails={this.state.ChannelDetails}
            setChannelDetails={this.setChannelDetails}
            toggle={this.state.viewChannelDetailsToggle}
            toggleViewChannelDetails={this.toggleViewChannelDetails}/>

            <WorkSpaceHeader workspaceName={this.state.CurrentWorkspace.WorkspaceName} 
                             channelName={this.state.channelName} 
                             onSetSidebarOpen={this.onSetSidebarOpen} />

            <div id="workspace-body">
              <WorkSpaceChannels users={this.state.users}
                                 CurrentWorkspace={this.state.CurrentWorkspace} 
                                 setCurrentChatId = {this.setCurrentChatId}
                                 setCurrentChannelName = {this.setCurrentChannelName}
                                 channels={this.state.channels}
                                 hubConnection={this.state.hubConnection}
                                 workSpaceImg={this.state.workSpaceImg} />
                 {
                //  (this.state.currentChatId) ?
              <ChatComponent 
                hubConnection={this.state.hubConnection} 
                userID ={this.state.currentUserID} 
                chatID={this.state.currentChatId}
                messages={this.state.currentChatMessages}
                concatMessage = {this.concatMessage}
                updateNotifications = {this.updateNotifications}
              />
              // :
              // <WorkSpaceChat />
            }
            </div>
          </div>
        </Sidebar>

    )
  }

}

export default Workspace;