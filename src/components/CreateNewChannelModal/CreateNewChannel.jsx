import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./CreateNewChannel.css";

class CreateNewChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: 1,
            channel: {
                channelName: "",
                channelUsers: []
            },
            workspaceName: "",
            dataToSend: null
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSubmit() {
        console.log("Submit pressed!");
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className="Modal"
                dialogClassName="border-radius-2"
                size="lg"
            >
                <ModalHeader toggle={this.toggle} className="ModalHeader">
                    <p className="modal-title">Create new channel</p>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <div className="textboxes-area">
                            <div className="text-entry-area">
                                <label>
                                    Channel Name <br />
                                    <input
                                        name="channelName"
                                        type="text"
                                        defaultValue={
                                            this.state.channel.channelName
                                        }
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="submit-area">
                            <Button
                                className="submit-btn"
                                type="Sumbit"
                                size="lg"
                            >
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
