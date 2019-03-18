import React, { Component } from 'react'
import CreateWorkspaceForm from '../CreateWorkspaceForm/CreateWorkspaceForm';
import AddMembersWorkspace from '../AddMembersWorkspaceForm/AddMembersWorkspaceForm'; 
import '../CreateWorkspaceLayout/CreateWorkspace.css'
class CreateWorkspace extends Component {
    render () {
        return (
            <div>
       <h2>Create a new workspace</h2>
   <div className="container formWrapper"> 
           <CreateWorkspaceForm/>
           <AddMembersWorkspace/>
   </div> 
   </div>
        )
    }
}

export default CreateWorkspace