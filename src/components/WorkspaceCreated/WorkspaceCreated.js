import React, { Component } from 'react'
import '../WorkspaceCreated/WorkspaceCreated.css'
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
                     <button type="button" className="btn createWS">Go to workspace</button> 
                     </div>
                </div> 
            </div>
        )
    }
}

export default WorkspaceCreated