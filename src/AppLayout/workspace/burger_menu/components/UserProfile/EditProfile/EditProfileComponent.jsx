import React, { Component } from 'react'
import EditProfile from './EditProfile';
import axios from 'axios'; 

class EditProfileContainer extends Component {  
    constructor(props) {
        super(props);
        this.state = {  
            userName: null,
            email: null, 
            currentUser : this.props.userData
        } 
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
           });
    }  
    handleSubmit(event){
        event.preventDefault() 

    } 


    render () {
        return (
            <div>
                <EditProfile toggle={this.props.toggle} editProfileVisible={this.props.editProfileVisible} onchange={this.handleChange.bind(this)} onsubmit={this.handleSubmit.bind(this)}/>
            </div>
        )
    }
}

export default EditProfileContainer