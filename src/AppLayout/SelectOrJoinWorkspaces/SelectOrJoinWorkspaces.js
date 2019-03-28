import React, { Component } from 'react'
import SelectWorkspace from './SelectWorkspace';
import JoinWorkspace from './JoinWorkspace';
import './ListofWorkspacesPage.css' 


class SelectOrJoinWorkspaces extends Component {
    render () {
        return ( 
            <React.Fragment>
            <div className="mainDiv">
                <SelectWorkspace/>
                <JoinWorkspace/> 
               
            </div> 
           
             </React.Fragment>
        )
    }
}

export default SelectOrJoinWorkspaces