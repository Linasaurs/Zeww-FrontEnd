import React, { Component } from 'react' 
import InputField from '../InputField/InputField'
import '../InputField/WorkspaceInputField.css'
import '../AddAnotherButton/AddAnother.css'
import '../CreateWorkspaceForm/CreateWorkspaceForm.css'
import Button from '../Button/Button'; 
import '../Button/WorkspaceButton.css'
class AddMembersWorkspaceForm extends Component {
    render () {
        return (
            <div className="container workspaceData"> 
       <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Add members to workspace" placeholder="name@example.com" />
       <Button text="Send Invitation" buttonStyle="btn inviteBtn"/>
            </div> 
        )
    }
}

export default AddMembersWorkspaceForm