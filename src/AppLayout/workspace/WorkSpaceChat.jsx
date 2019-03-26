import React from "react";
import { Row, Col } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from '@fortawesome/free-solid-svg-icons'

library.add(faComments)

export default class WorkSpaceChat extends React.Component {
     state = {
                messages:[{}]
            }
    render() {
        return (
            //if there are no messages Render placeholder, else Render list of messages
            this.state.messages.length ? 
            //Messages Placeholder
            <Col xs="9">
                <div id="workspace-body-chat">
                    <FontAwesomeIcon icon={faComments} />
                </div>
                Start by saying hello!
            </Col>: 
            //Messages Container if there are Messages
    <div> List of Messages</div>
            
        )
    }
}