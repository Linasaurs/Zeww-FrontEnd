import React, { Component } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import '../../components/Button/WorkspaceButton.css'
import '../../components/InputField/WorkspaceInputField.css'
import './ListofWorkspacesPage.css';
import {Link } from 'react-router-dom';

class NoWorkspaceFound
 extends Component {
    render () {
        return (
            <div className="JoinWorkspace">
            <h4 className="joinWorkspaceLeft">Create a new Workspace</h4>
            <div id="joinDiv">
               <Link to="/createWorkspace" className="createWorkspace"><Button text="Create Workspace" type="submit" buttonStyle="btn createWS" /></Link>
            </div>
        </div>
        )
    }
}

export default NoWorkspaceFound
