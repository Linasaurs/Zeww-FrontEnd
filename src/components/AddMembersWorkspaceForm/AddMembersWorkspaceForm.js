import React, { Component } from 'react' 
import InputField from '../InputField/InputField'
import AddAnother from '../AddAnotherButton/AddAnother'
import '../InputField/WorkspaceInputField.css'
import '../AddAnotherButton/AddAnother.css'
import '../CreateWorkspaceForm/CreateWorkspaceForm.css'
class AddMembersWorkspaceForm extends Component {
    render () {
        return (
            <div className="container workspaceData"> 
       <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Add members to workspace" placeholder="name@example.com" />
      <AddAnother small="Add Another" src={require("../images/addIcon.png")}/>
            </div> 
        )
    }
}

export default AddMembersWorkspaceForm