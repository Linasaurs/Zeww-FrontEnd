import React from "react";
import defaultWorkspaceIcon from "./imgs/logoplaceholder.svg";
import { Container, Row, Col } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons'
import OmniSearch from "../../components/OmniSearch/OmniSearch";

library.add(faInfoCircle)
library.add(faBars)

export default class WorkSpaceHeader extends React.Component {

    state = {
        workspaceName: this.props.workspaceName,
        channelName: this.props.channelName,
    }
    
    render() {
        
        return (
            <Container fluid className="class-sticky">
                <Row id="workspace-header">
                    <Col id="workspace-header-details" xs="2">
                        <img id="workspace-header-img" src={this.props.workSpaceImg} />
                        <div id="workspace-header-title">{this.state.workspaceName}</div>
                    </Col>
                    <Col>
                        <div id="workspace-header-channeltitle">
                            {this.props.channelName}
                        </div>
                    </Col>
                    <Col id="workspace-header-icons" xs="2">
                     <OmniSearch workspaceId={this.props.WorkspaceId}/>
                        <span onClick={() => this.props.onSetSidebarOpen(true)}> <FontAwesomeIcon icon={faBars} /> </span>
                    </Col>
                </Row>
            </Container>

        )
    }
}
