import React, { Component } from 'react';
import './ListofWorkspacesPage.css';
import {Link } from 'react-router-dom';


class WorkSpaceNameTag extends Component {
    render () {
        return (
            <Link  to={{pathname:`/workspace/${this.props.workspace.Id}`,workspace:this.props.workspace}} className="workspaceTag">
            <img className="workspaceImage" alt="workspace" src={require("../Landingpage/css/imgs/lovelyTGP.jpg")}/>
            <p className="workspaceName">{this.props.workspace.WorkspaceName}</p>   
            </Link>
        )
    }
}

export default WorkSpaceNameTag