import React from "react";
import { Row, Col } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DirectMessagesComponant from "../../components/Direct Messages Component/DirectMessagesComponant";
import {Link} from 'react-router-dom'
import CreateNewChannel from "../../components/CreateNewChannelModal/CreateNewChannel";
import './WorkspaceChannel.css'
library.add(faPlusCircle);

export default class WorkSpaceChannels extends React.Component {
    state ={
        users:this.props.users,
        channels: this.props.channels,
        createNewWorkspaceModalVisible: false
    }
    toggle() {
        this.setState(prevState => ({
            createNewWorkspaceModalVisible: !prevState.createNewWorkspaceModalVisible
        }));
       
    }
    
    render() {
       
        return (
            <Col xs="2" >
                <Row className="workspace-body-title">
                    Channels
           <button onClick={this.toggle.bind(this)} className="showModal"><FontAwesomeIcon icon={faPlusCircle}/></button>
            <CreateNewChannel toggle={this.toggle.bind(this)} createNewWorkspaceModalVisible={this.state.createNewWorkspaceModalVisible} workspaceId={this.props.workspaceId} />
                </Row>
                {this.state.channels.length ?  //if there are no Channels Render placeholder, else Render list of channels
                <Row className="workspace-body-information">
                    {this.state.channels}
                </Row>:
                <Row className="workspace-body-information">
                    No channels found
                </Row>}
                <Row className="workspace-body-title">
          <DirectMessagesComponant users={this.state.users}/>
                </Row>
            </Col>
        )
    }
}