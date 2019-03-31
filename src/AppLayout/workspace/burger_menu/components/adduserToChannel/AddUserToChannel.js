import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import './AddUserToChannel.css'
import config from '../../../../../config'
import auth from '../../../../../Services/authService'
import axios from 'axios'

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
        alert(this.state.userName)
        event.preventDefault();
        
        axios(
            auth.includeAuth({
                method: "post",
                url: `${config.BASE_URL}/chats/AddUserToChannel/${this.props.channelId}`,
                responseType: "json",
                headers: { 'Content-Type': 'text/plain' },
                data: JSON.stringify({userName:this.state.userName})
            })
        ).then(function(response) {
         
            // self.props.concatenateChatinChannelList(response.data[0])
            // self.props.toggle();
        })
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //     this.props.toggleAddUserToChannel();
    //     fetch(auth.includeAuth( {
    //         url:`${config.BASE_URL}/chats/AddUserToChannel/${this.props.channelId}`,
    //         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state.userName)
    //     })).then(function (response) {
    //         return response.json();
    //     }).then(function (data) {
    //         console.log('Created: ', data);
    //     });
    //     this.setState({
    //         userName: ""
    //     });
    // }

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