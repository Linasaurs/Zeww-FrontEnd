import React, { Component } from 'react';
import MainNavLayout from '../AppLayout/MainNavLayout';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Signup from '../AppLayout/signup/Signup'
import Login from '../AppLayout/login/Login'
import WorkspaceCreated from '../components/WorkspaceCreated/WorkspaceCreated';
// import LandingPage from '../AppLayout/Landingpage/LandingPage';
import Home from '../AppLayout/Landingpage/Home';
import WhyZeww from '../AppLayout/Landingpage/WhyZeww';
import AboutUs from '../AppLayout/Landingpage/AboutUs';
import CreateWorkspace from '../components/CreateWorkspaceLayout/CreateWorkspace';
import Workspace from '../AppLayout/workspace/Workspace'
import SelectOrJoinWorkspaces from '../AppLayout/SelectOrJoinWorkspaces/SelectOrJoinWorkspaces';
import CreateNewChannel from '../components/CreateNewChannelModal/CreateNewChannel';
import ChangeWorkspacename from "../AppLayout/workspace/burger_menu/components/ChangeWorkspaceName/ChangeWorkspacename";
import ChangeWorkspaceUrl from '../AppLayout/workspace/burger_menu/components/ChangeWorkspaceUrl/ChangeWorkspaceUrl';
import SetDefaultWorkspaceHours from '../AppLayout/workspace/burger_menu/components/SetDefaultWorkspaceHours/SetDefaultWorkspaceHours';

class Routing extends Component {
    render() {
        return (
            <Router>
                <MainNavLayout path="/signup" render={()=><Signup/>}/>   
                <MainNavLayout path="/login" render={()=><Login/>}/>   
                <MainNavLayout path="/createWorkspace" render={()=><CreateWorkspace/>}/> 
                <MainNavLayout path="/created/:id"  render={(props)=><WorkspaceCreated data={props.location.state} id={props.match.params.id}/>} /> 
                <MainNavLayout path="/workspaces" render={()=><SelectOrJoinWorkspaces/>}/>
                <Route path="/workspace/:id" render={(props)=><Workspace {...props}/>}/>   
                <Route path="/" render={() => <Home />} exact />
                <Route path="/why-zeww" render={() => <WhyZeww />} exact />
                <Route path="/aboutus" render={() => <AboutUs />} exact />
                <Route path="/ChangeWorkspaceName/:id" render={props => <ChangeWorkspacename {...props} CurrentWorkspace={props.location.CurrentWorkspace} />} />
                <Route path="/ChangeWorkspaceUrl/:id" render={props => <ChangeWorkspaceUrl {...props} CurrentWorkspace={props.location.CurrentWorkspace} />} />
                <Route path="/SetDefaultWorkspaceHours/:id" render={props => <SetDefaultWorkspaceHours {...props} CurrentWorkspace={props.location.CurrentWorkspace} />} />
                <Route path="/createNewChannelModal" render={(props)=><CreateNewChannel {...props}/>}/>
            </Router>
        )
    }
}

export default Routing;
