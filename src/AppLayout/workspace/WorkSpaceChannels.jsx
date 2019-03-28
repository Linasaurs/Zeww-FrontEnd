import React from "react";
import { Row, Col } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DirectMessagesOrChannelsComponent from "../../components/Direct Messages Component/DirectMessagesOrChannelsComponent";
library.add(faPlusCircle);

export default class WorkSpaceChannels extends React.Component {
    state ={
        users:this.props.users,
        channels: this.props.channels
    }
    render() {
        return (
            <Col xs="2" >
                <Row className="workspace-body-title">
                    Channels
                    <FontAwesomeIcon icon={faPlusCircle} />
                </Row>
                <Row className="workspace-body-information">
                    <DirectMessagesOrChannelsComponent title="Channels"
                                                       CurrentWorkspace={this.props.CurrentWorkspace}
                                                       list={this.state.channels}
                                                       setCurrentChatId ={this.props.setCurrentChatId}/>
                </Row>
                <Row className="workspace-body-title">
                    <DirectMessagesOrChannelsComponent title="Direct Messages" 
                                                       CurrentWorkspace={this.props.CurrentWorkspace}
                                                       list={this.state.users}
                                                       setCurrentChatId ={this.props.setCurrentChatId}
                                                       hubConnection={this.props.hubConnection}/>
                </Row>
            </Col>
        )
    }
}