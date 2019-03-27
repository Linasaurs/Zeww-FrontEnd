import React, { Component } from 'react'
import '../WorkspaceCreated/WorkspaceCreated.css' 
import ImageUpload from '../ImageUpload/ImageUpload'
import {Link } from 'react-router-dom';
import ImageUploadContainer from '../ImageUpload/ImageUploadContainer';
class WorkspaceCreated extends Component {
    render () {
        return (
            <div>
               <div className="container createdWrapper"> 
                    <div className="wsCreated">
                    <h2>Tada! Your workspace was successfully created!</h2> 
                     <p className="createdText">
                     A channel brings together every part of your project
                     – the people, conversations, ideas, updates, and files <br/>
                     –  so your team can move forward and get more done.
                     </p>   
                     <div className="WSNameImage"> 
                       <ImageUploadContainer wsId={this.props.id} label={"Add image to"} wsName={this.props.data ? this.props.data.workspaceName : "WS Name"} /> 
                     </div>
                    
                     <Link to="/workspace" style={{alignItems: "center"}}className="btn createWS">Go to workspace</Link> 
                     </div>
                </div> 
            </div>
        )
    }
}

export default WorkspaceCreated