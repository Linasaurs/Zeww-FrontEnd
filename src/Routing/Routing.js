import React, { Component } from 'react';
import MainNavLayout from '../AppLayout/MainNavLayout';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import Signup from '../AppLayout/signup/Signup'
import Login from '../AppLayout/login/Login'
// import LandingPage from '../AppLayout/Landingpage/LandingPage';
import Home from '../AppLayout/Landingpage/Home';
import WhyZeww from '../AppLayout/Landingpage/WhyZeww';
import AboutUs from '../AppLayout/Landingpage/AboutUs';
import WorkspaceCreated from '../components/WorkspaceCreated/WorkspaceCreated'; 
import CreateWorkspace from '../components/CreateWorkspaceLayout/CreateWorkspace';
import Workspace from '../AppLayout/workspace/Workspace'
import SelectOrJoinWorkspaces from '../AppLayout/SelectOrJoinWorkspaces/SelectOrJoinWorkspaces';
import ChangeWorkspacename from "../AppLayout/workspace/burger_menu/components/ChangeWorkspaceName/ChangeWorkspacename";
import Axios from 'axios';

class Routing extends Component {
    render () {
        return (
            <Router>
                <Route path="/" render={()=><Home/>}exact/>
                <Route path="/why-zeww" render={()=><WhyZeww/>}exact/>
                <Route path="/aboutus" render={()=><AboutUs/>}exact/>
                <MainNavLayout path="/signup" render={()=><Signup/>}/>   
                <MainNavLayout path="/login" render={()=><Login/>}/>   
                <MainNavLayout path="/createworkspace" render={()=><CreateWorkspace/>} exact/> 
                <MainNavLayout path="/created/:id"  render={(props)=><WorkspaceCreated data={props.location.state} id={props.match.params.id}/>} /> 
                <MainNavLayout path="/workspaces" render={()=><SelectOrJoinWorkspaces/>}/>
                <Route path="/workspace/:id" render={(props)=><Workspace {...props}/>}/>     
                <Route path="/ChangeWorkspaceName/:id" render={props => <ChangeWorkspacename {...props} />} />
            </Router>
        )
    }
}

export default Routing;
