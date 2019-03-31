import React from "react";
import { Row, Col } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DirectMessagesOrChannelsComponent from "../../components/Direct Messages Component/DirectMessagesOrChannelsComponent";
// import {Link} from 'react-router-dom'
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
            <CreateNewChannel concatenateChatinChannelList={this.props.concatenateChatinChannelList} toggle={this.toggle.bind(this)} createNewWorkspaceModalVisible={this.state.createNewWorkspaceModalVisible} workspaceId={this.props.workspaceId} />
                </Row>
                <Row className="workspace-body-information">
                    <DirectMessagesOrChannelsComponent title="Channels"
                                                       CurrentWorkspace={this.props.CurrentWorkspace}
                                                       list={this.props.channels}
                                                       setCurrentChatId ={this.props.setCurrentChatId}
                                                       setCurrentChannelName = {this.props.setCurrentChannelName}/>
                </Row>
                <Row className="workspace-body-title">
                    <DirectMessagesOrChannelsComponent title="Direct Messages" 
                                                       CurrentWorkspace={this.props.CurrentWorkspace}
                                                       list={this.props.users}
                                                       setCurrentChatId ={this.props.setCurrentChatId}
                                                       setCurrentChannelName = {this.props.setCurrentChannelName}
                                                       hubConnection={this.props.hubConnection}/>
                </Row>
            </Col>
        )
    }
}