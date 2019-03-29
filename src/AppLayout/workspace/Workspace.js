import React from "react";
import axios from "axios";
import WorkSpaceLoadingScreen from "./WorkSpaceLoadingScreen";
import WorkSpaceHeader from "./WorkSpaceHeader";
import WorkSpaceChannels from "./WorkSpaceChannels";
import WorkSpaceChat from "./WorkSpaceChat";
import Sidebar from "react-sidebar";
import BurgerMenu from './burger_menu/components/burgermenu/BurgerMenu'
import FilesContainer from './burger_menu/components/files/FilesContainer'
import ViewChannelDetails from './burger_menu/components/channeldetails/ViewChannelDetails'
import AddUserToChannel from './burger_menu/components/adduserToChannel/AddUserToChannel'
import '../workspace/ChannelView.css'
import auth from '../../Services/authService';
import withAuthentication from "../../HOC/withAuthentication";

const USERS_BASE_URL = "http://10.0.67.127:8080/api/"
class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      channels: [],
      CurrentWorkspace:this.props.location.Currentworkspace,
      currentUser:{},
      channelName: "Boss Channel",
      isLoading: true,
      sidebarOpen: false,
      files: [
        {
          name: "Project Framework",
          sender: "Ziad Ali",
          timestamp: "Feb 22nd at 10:03 AM",
          extension: "src",
          image: "Orchestra",
          downloadUrl: "someurl"
        },
        {
          name: "Zeww UI",
          sender: "Maha Elleci",
          timestamp: "Feb 22nd at 10:03 AM",
          extension: "xd",
          image: "someurl",
          downloadUrl: "someotherurl"
        },
        {
          name: "Weird Files",
          sender: "Mohamed Wa'el",
          timestamp: "Feb 22nd at 10:03 AM",
          extension: "",
          image: "someurl",
          downloadUrl: "justaurl"
        }
      ],

      ChannelDetails: {
        name: "",
        url: "",
        purpose: "",
        creator: -1,
        numberOfMembers: 0
      },
      filesContainerOpen: false,

      viewChannelDetailsToggle: false,

      addUserToChannelToggleFlag: false
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  setChannelDetails = Details => {
    this.setState({
      ChannelDetails: Details
    });
  };

  toggleFilesContainer = () => {
    var flag = !this.state.filesContainerOpen;
    this.setState({ filesContainerOpen: flag });
    console.log("Open Files Container");
  };

  toggleViewChannelDetails = () => {
    var flag = !this.state.viewChannelDetailsToggle;
    this.setState({ viewChannelDetailsToggle: flag });
    console.log(flag);
  };

  // add user to channel modal toggle
  toggleAddUserToChannel = () => {
    var flag = !this.state.addUserToChannelToggleFlag;
    this.setState({ addUserToChannelToggleFlag: flag });
    console.log("Add User toggle setting : " + flag);
  };

  burgerMenuComponentSwitch() {
    if (this.state.filesContainerOpen) {
      return (
        <FilesContainer
          files={this.state.files}
          getfiles={this.setFiles}
          toggleFilesContainer={this.toggleFilesContainer}
        />
      );
    } else {
      return (
        <BurgerMenu
          toggleFilesContainer={this.toggleFilesContainer}
          toggleViewChannelDetails={this.toggleViewChannelDetails}
          toggleAddUserToChannel={this.toggleAddUserToChannel}
          CurrentWorkspace={this.state.CurrentWorkspace}
        />
      );
    }
  }

  setFiles = returnedFiles => {
    this.setState({
      files: returnedFiles
    });
  };

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  getUsersByWorkspaceId() {
    var config = {
      headers: {
        Authorization: "bearer " + localStorage.getItem('token')
      }
    };
    axios
      .get(
        `http://localhost:5000/api/workspaces/getusersbyworkspaceid/${this.state.CurrentWorkspace.Id}`,
        config
      )
      .then(x => this.setState({ users: x.data }));
  }


  componentDidMount() {
    if(this.state.CurrentWorkspace!==undefined&&this.state.isLoading){
      axios(auth.includeAuth({
        method: 'get',
        url: USERS_BASE_URL + `workspaces/GetUsersByWorkspaceId/${this.state.CurrentWorkspace.Id}`,
    }))
        .then(response => {
            this.setState({
              users: response.data, isLoading:false 
            })
         
       })
        .catch(error => {
        
          console.log(error)
       })
  
       axios(auth.includeAuth({
        method: 'get',
        url: USERS_BASE_URL + `users/${auth.getCurrentUserId()}`,
    }))
        .then(response => {
            this.setState({
              currentUser:response.data
            })
         
       })
        .catch(error => {
        
          console.log(error)
       })}
  }
  componentDidUpdate() {
  if(this.state.CurrentWorkspace!==undefined&&this.state.isLoading){
    axios(auth.includeAuth({
      method: 'get',
      url: USERS_BASE_URL + `workspaces/GetUsersByWorkspaceId/${this.state.CurrentWorkspace.id}`,
  }))
      .then(response => {
          this.setState({
            users: response.data, isLoading:false 
          })
       
     })
      .catch(error => {
      
        console.log(error)
     })
     axios(auth.includeAuth({
      method: 'get',
      url: USERS_BASE_URL + `users/${auth.getCurrentUserId()}`,
  }))
      .then(response => {
          this.setState({
            currentUser:response.data
          })
       
     })
      .catch(error => {
      
        console.log(error)
     })
  }   }
  componentWillMount(){
    if(this.state.CurrentWorkspace===undefined){
      axios(auth.includeAuth({
        method: 'get',
        url: USERS_BASE_URL + `workspaces/getworkspaceById/${this.props.match.params.id}`,
    }))
        .then(response => {
            this.setState({
             CurrentWorkspace:response.data
            })
         
       })
        .catch(error => {
        
          console.log(error)
       })
       
     }
  }
  render() { 
    console.log(this)
    return this.state.isLoading ? (
      <WorkSpaceLoadingScreen />
    ) : (
        <Sidebar
          sidebar={this.burgerMenuComponentSwitch()}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          pullRight={true}
          styles={{ sidebar: { width: "30rem", height: "100%" } }}
        >
          <div>
            <ViewChannelDetails
              channelDetails={this.state.ChannelDetails}
              setChannelDetails={this.setChannelDetails}
              toggle={this.state.viewChannelDetailsToggle}
              toggleViewChannelDetails={this.toggleViewChannelDetails}
            />

            <AddUserToChannel
              toggle={this.state.addUserToChannelToggleFlag}
              toggleAddUserToChannel={this.toggleAddUserToChannel}
            />

            <WorkSpaceHeader
              workspaceName={this.state.CurrentWorkspace.WorkspaceName}
              channelName={this.state.channelName}
              onSetSidebarOpen={this.onSetSidebarOpen} 
              workSpaceImg={this.props.location.state.workSpaceImg}
            />

            <div id="workspace-body">
              <WorkSpaceChannels CurrentUser={this.state.currentUser} users={this.state.users} channels={this.state.channels} workspaceId={this.props.match.params.id}/>
              <WorkSpaceChat />
            </div>
          </div>
        </Sidebar>
      );
  }
}

export default withAuthentication(Workspace);
