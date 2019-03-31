import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./CreateNewChannel.css";
import axios from "axios";
import auth from "../../Services/authService";
import config from '../../config'

const Joi = require("joi");

const channelNameSchema = Joi.object().keys({
    channelName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
});



class CreateNewChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 0,
            channelName: "",
            workspaceId: this.props.workspaceId,
            isPrivate: false,
            channelPurpose: "",
            dataToSend: null,
            result: null
        };
        
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });

        const result = Joi.validate({ channelName: value }, channelNameSchema);
        this.setState({ result: result });
        // console.log(result);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Submit pressed!");
        // if (this.state.result.error != null)
        //      alert("Channel name is not a valid name!");

        var chat = {};
        chat.workspaceId = this.state.workspaceId;
        chat.name = this.state.channelName;
        chat.isPrivate = this.state.isPrivate;
        chat.channelPurpose = this.state.channelPurpose;

        // console.log(chat);
        var self=this

        axios(
            auth.includeAuth({
                method: "post",
                url: `${config.BASE_URL}/chats/createnewchannel`,
                responseType: "json",
                data: chat
            })
        ).then(function(response) {
            self.props.concatenateChatinChannelList(response.data[0])
            self.props.toggle();
        });
    }

    

    render() {
        return (
            <Modal
                isOpen={this.props.createNewWorkspaceModalVisible}
                toggle={this.props.toggle}
                className="Modal"
                // dialogClassName="border-radius-2"
                size="lg"
            >
                <ModalHeader toggle={this.props.toggle} className="ModalHeader">
                    <p className="modal-title">Create new channel</p>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={event => this.handleSubmit(event)}>
                        <div className="textboxes-area">
                            <div className="text-entry-area">
                                <label>
                                    Channel Name * <br />
                                    <input
                                        name="channelName"
                                        type="text"
                                        value={this.state.channelName}
                                        className="form-control"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </label>
                            </div>
                            <div className="text-entry-area">
                                <label>
                                    Channel Pupose <br />
                                    <input
                                        name="channelPurpose"
                                        type="text"
                                        value={this.state.channelPurpose}
                                        className="form-control"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="submit-area">
                            <Button className="submit-btn" size="lg">
                                Create Channel
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}

export default CreateNewChannel;
