import React, { Component } from 'react'
import AddMembersWorkspace from '../AddMembersWorkspaceForm/AddMembersWorkspaceForm'; 
import '../CreateWorkspaceLayout/CreateWorkspace.css'
import CreateWorkspaceFormContainer from '../CreateWorkspaceForm/CreateWorkspaceFormContainer';
class CreateWorkspace extends Component {
    render () {
        return (
            <div>
       <h2>Create a new workspace</h2>
   <div className="container formWrapper"> 
           <CreateWorkspaceFormContainer/>
           <AddMembersWorkspace/>
   </div> 
           </div>
        )
    }
}

export default CreateWorkspace