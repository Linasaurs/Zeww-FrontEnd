import React, { Component } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import '../../components/Button/WorkspaceButton.css'
import '../../components/InputField/WorkspaceInputField.css'
import './ListofWorkspacesPage.css';
class JoinWorkspace extends Component {
    render() {
        return (
            <div className="JoinWorkspace">
                <h4 className="joinWorkspaceLeft">Join new Workspace</h4>
                <div id="joinDiv">
                    <InputField labelStyle="labelStyle" inputClassName="form-control inputField" placeholder="Workspace Url" name="workspaceName" />
                    <Button text="Join Workspace" type="submit" buttonStyle="btn createWS" />
                </div>
            </div>
        )
    }
}

export default JoinWorkspace