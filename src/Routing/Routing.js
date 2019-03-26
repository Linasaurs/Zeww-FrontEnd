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
                <MainNavLayout path="/" component={LandingPage}exact/>
                <MainNavLayout path="/signup" component={Signup}/>   
                <MainNavLayout path="/createWorkspace" component={CreateWorkspace}/>
                <MainNavLayout path="/created"  component={WorkspaceCreated} /> 
                <Route path="/workspace" component={Workspace}/>
            </Router>
        )
    }
}

export default Routing