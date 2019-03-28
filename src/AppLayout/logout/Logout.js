import React, { Component } from 'react';
import { Redirect } from 'react-router';
import auth from '../../Services/authService'

class Logout extends Component{

    componentDidMount(){
        auth.logout();
    }

    render(){
        return <Redirect to="/"/>
    }
}

export default Logout;