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
class Workspace extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      users: [],
      channels: [],
      workspaceName: "TGP 1.8",
      channelName: "Boss Channel",
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
      viewChannelDetailsToggle : false
      

    }

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
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

  componentDidMount() {
    var config = {
      headers: { 'Authorization': "bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjgiLCJuYmYiOjE1NTIzMTMyOTYsImV4cCI6MTU1MjkxODA5NiwiaWF0IjoxNTUyMzEzMjk2fQ.WvHOnsYCgtNFSEmoxzB_h0h09XRBkx0SGIZekKpGYoI" }
    };
    var users = axios.get("https://localhost:44346/api/workspaces/getusersbyworkspaceid/3", config).then(x => x.data);
    this.setState({ users: users })

    //Remove SetTimeOut Function and leave setstate for DEMO purposes for loading screen
    setTimeout(
      function () {
        this.setState({ isLoading: false })
      }
        .bind(this),
      1500
    );

  }
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

            <WorkSpaceHeader workspaceName={this.state.workspaceName} channelName={this.state.channelName} onSetSidebarOpen={this.onSetSidebarOpen} />

            <div id="workspace-body">
              <WorkSpaceChannels users={this.state.users} channels={this.state.channels} workSpaceImg={this.state.workSpaceImg} />
              <WorkSpaceChat />
            </div>
          </div>
        </Sidebar>

    )
  }

}

export default Workspace;