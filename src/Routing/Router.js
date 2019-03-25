import React, { Component } from 'react'
import { Route,Switch, BrowserRouter } from 'react-router-dom' 
import CreateWorkspaceFormContainer from '../components/CreateWorkspaceForm/CreateWorkspaceFormContainer';
import WorkspaceCreated from '../components/WorkspaceCreated/WorkspaceCreated';
class Router extends Component { 
    render () { 
       
        return (
            <React.Fragment>
     <Router>
          
          <Switch>
          <Route path="/createWorkspace" render={() =><CreateWorkspaceFormContainer created={this.workspaceCreated} redirect={this.state.workspaceCreated}/>} />
          <Route path="/created" render={()=><WorkspaceCreated/>} />
          </Switch>
        
     </Router>   
          </React.Fragment>
        )
    }
}

export default Router