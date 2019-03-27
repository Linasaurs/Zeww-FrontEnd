import React, { Component } from 'react';
import MainNavLayout from '../AppLayout/MainNavLayout';
import { Route,BrowserRouter as Router } from 'react-router-dom';
import Signup from '../AppLayout/signup/Signup'
import LandingPage from '../AppLayout/Landingpage/LandingPage';
import WorkspaceCreated from '../components/WorkspaceCreated/WorkspaceCreated'; 
import CreateWorkspace from '../components/CreateWorkspaceLayout/CreateWorkspace';
import Workspace from '../AppLayout/workspace/Workspace'

class Routing extends Component {
    render () {
        return (
            <Router>
                <MainNavLayout path="/" render={()=><LandingPage/>}exact/>
                <MainNavLayout path="/signup" render={()=><Signup/>}/>   
                <MainNavLayout path="/createWorkspace" render={()=><CreateWorkspace/>}/> 
                <MainNavLayout path="/created/:id"  render={(props)=><WorkspaceCreated data={props.location.state} id={props.match.params.id}/>} /> 
                <Route path="/workspace" render={()=><Workspace/>}/>
            </Router>
        )
    }
}

export default Routing