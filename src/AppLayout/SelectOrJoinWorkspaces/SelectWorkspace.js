import React, { Component } from 'react'
import WorkSpaceNameTag from './WorkSpaceNameTag';
import './ListofWorkspacesPage.css'

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
                {this.state.workspaces.map((w,i)=><WorkSpaceNameTag key={i}workspace={w}/>)}
                </div>
                </React.Fragment>:<React.Fragment>No reasluts found</React.Fragment>}
                </React.Fragment> 
                
            </div>
        )
    }
}

export default SelectWorkspace
