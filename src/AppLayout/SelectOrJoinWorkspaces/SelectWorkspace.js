import React, { Component } from 'react'
import WorkSpaceNameTag from './WorkSpaceNameTag';
import './ListofWorkspacesPage.css'
import NoWorkspaceFound from './NoWorkspacesFound';

class SelectWorkspace
 extends Component {
    render () {
        return (
            <div>
                <React.Fragment>
              {this.props.workspaces.length!==0?  
              <React.Fragment>
                   <h4 className="workspacesHeader">Your workspaces</h4>
                <div className="workspacesDiv">
                {this.props.workspaces.map((w,i)=><WorkSpaceNameTag key={i}workspace={w}/>)}
                </div>
                </React.Fragment>:<NoWorkspaceFound/>}
                </React.Fragment> 
                
            </div>
        )
    }
}

export default SelectWorkspace
