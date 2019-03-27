import React from "react";
import { Row, Col } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DirectMessagesComponant from "../../components/Direct Messages Component/DirectMessagesComponant";
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