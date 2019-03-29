import React, { Component } from 'react'
import { Redirect } from 'react-router';
import auth from '../Services/authService'

export default function withAuthentication(WrappedComponent) {
    return class extends Component{
        constructor(props){
            super(props);
        }
        render(){
            if(auth.getCurrentUserId()){
                return <WrappedComponent {...this.props} />
            }else{
                return <Redirect to="/login"/>
            }
        }
    };
}