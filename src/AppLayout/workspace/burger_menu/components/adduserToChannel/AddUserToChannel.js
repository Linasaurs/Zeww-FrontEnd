import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import './AddUserToChannel.css'
import config from '../../../../../config'

class AddUserToChannel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.props.toggle,
            userName: ""
        };

    }

    handleChange(event) {
        this.setState({ userName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.toggleAddUserToChannel();
        fetch(`${config.BASE_URL}/api/chats/AddUserToChannel/1`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.userName)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log('Created: ', data);
        });
        this.setState({
            userName: ""
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.toggle} modalTransition={{ timeout: 100 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.props.toggleAddUserToChannel} className={this.props.className}>
                    <ModalHeader toggle={this.props.toggleAddUserToChannel} style={{"color":"#757575"}}>Add user to channel</ModalHeader>
                    <ModalBody>
                        <form className="addUserForm" onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form-group">
                                <input className="form-control" id="addUserInput" value={this.state.userName} onChange={this.handleChange.bind(this)} placeholder="Enter user name" name="userName" />
                                <button type="submit" id="addUserBtn" className="btn btn-primary">Add Member</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default AddUserToChannel