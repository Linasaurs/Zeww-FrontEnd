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
      console.log(this.state.currentUserID)
          //check after running 
    hubConnection
    .start()
    .then(() => {
      console.log(this.state.hubConnection)
      this.OnWorkspaceConnect()
      console.log('Connection started!');
    }).catch(err => console.log('Error while establishing connection :('));
    });



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
        directMessages: response.data.filter(chat => chat.isPrivate)})
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
    this.setState({
      currentChatId: id
    })
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
                                 channels={this.state.channels}
                                 hubConnection={this.state.hubConnection}
                                 workSpaceImg={this.state.workSpaceImg} />
                 {
                 (this.state.currentChatId) ?
              <ChatComponent 
                hubConnection={this.state.hubConnection} 
                userID ={this.state.currentUserID} 
                chatID={this.state.currentChatId}
              />
              :
              <WorkSpaceChat />
            }
            </div>
          </div>
        </Sidebar>

    )
  }

}

export default Workspace;