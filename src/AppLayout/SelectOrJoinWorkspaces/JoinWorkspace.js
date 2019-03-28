import React, { Component } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import '../../components/Button/WorkspaceButton.css'
import '../../components/InputField/WorkspaceInputField.css'
import './ListofWorkspacesPage.css'; 
import {Link} from 'react-router-dom'
class JoinWorkspace extends Component {
    render() {
        return (
                <div id="joinDiv"> 
                  <h4 className="joinWorkspaceTile">Join new Workspace</h4>
                    <InputField labelStyle="labelStyle" inputClassName="form-control inputField" placeholder="Workspace Url" name="workspaceName" />
                    <Button text="Join Workspace" type="submit" buttonStyle="btn joinWSBtn"/>  
                    <div style={{textAlign:'center'}}>
                    <Link to="/createWorkspace" className="createLink">Create your own workspace</Link> 
                    </div>
                   
                </div>
            
        )
    }
}

export default JoinWorkspace