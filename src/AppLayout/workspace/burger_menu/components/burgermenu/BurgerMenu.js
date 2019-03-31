import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import UserProfile from '../UserProfile/UserProfile'
import "./BurgerMenu.css";
import authService from "../../../../../Services/authService"; 
import axios from 'axios'
class BurgerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { showProfile: false, currentUser: null}; 
    this.getCurrentUserData = this.getCurrentUserData.bind(this);  
  
  } 
  
  componentDidMount(){
    this.getCurrentUserData();
  }
  getCurrentUserData(){ 
    const currentUser = authService.getCurrentUserId();
      axios.get(`http://10.0.67.127:8080/api/users/${currentUser}`).then(res=> {
            this.setState({currentUser:res.data});
      });
  } 

  render() { 
  
    return ( 
      <React.Fragment>
      <div className="userPlaceholder"> 
        <div className="userInfo">
          <img className="userImg" src={require('../burgermenu/logoplaceholder.svg')}/> 
          <div className="userStatus"> 
            <div style={{display:'flex'}}>
             <label style={{fontSize: '1.2rem'}}>{this.state.currentUser?this.state.currentUser.name:"Zeww User"}</label>    
             </div>
          <div style={{display:'flex'}}>  
              <div className="status"></div>
              <small>{this.state.currentUser?this.state.currentUser.connectionStatus == 0? "Active" : "Away" : "Online"}</small>
          </div> 
          </div>
          </div>
          <button className="profileBtn" onClick={()=>{this.state.showProfile? this.setState({showProfile:false}): this.setState({showProfile:true})}}><img src={require('../burgermenu/arrow.png')}style={{float:'right',width:'20px',height:'20px'}}/></button> 
        
        </div>
        <div className="burger-menu-div-ul">  
          {this.state.showProfile && <UserProfile userData={this.state.currentUser} /> }
          <ul className="burger-menu-ul">
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleFilesContainer()}
            >
              Files
            </li>
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleViewChannelDetails()}
            >
              Channel Details
            </li>
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleAddUserToChannel()}
            >
              Add member to Channel
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/ChangeWorkspaceName/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Change Workspace Name
              </Link>
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/ChangeWorkspaceUrl/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Change Workspace URL
              </Link>
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/SetDefaultWorkspaceHours/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Set Default Workspace Hours
               </Link>
            </li>
          </ul>
        </div>
        </React.Fragment>
    );
  }
}

export default BurgerMenu;
