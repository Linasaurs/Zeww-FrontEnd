import React, { Component } from 'react';
import './login.css'
import 'bootstrap/dist/css/bootstrap.css'
import auth from '../../Services/authService'
import {Redirect } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginSucceeded: undefined,
            loginMessage: ""
        }
      }

    render() {  
        return ( 
            <React.Fragment>
                {this.state.loginSucceeded? <Redirect to="/workspace"/>:
                <div id="loginComponent">
                <h2>Login</h2>
                <form>
                    <div id="loginInputs">
                        
                        <div className="inputWithSpinner">
                            <input 
                                id="email" 
                                type="email" 
                                className="form-control" 
                                onChange={this.dataChanged.bind(this)} 
                                placeholder="email..."/>
                        </div>                        
                        
                        <input 
                            id="password" 
                            type="password" 
                            className="form-control"
                            onChange={this.dataChanged.bind(this)} 
                            placeholder="password..."/>

                        <button type="submit" className="btn" onClick={this.login.bind(this)}>Login</button>
                        <label id="statusLabel" className={this.state.loginSucceeded?"text-success":
                            (this.state.loginSucceeded == null)?"":"text-danger"}>
                                {this.state.loginMessage}
                        </label>
                    </div>
                </form>
            </div> }
            </React.Fragment>
           
         )
    }

    dataChanged(e){
        this.setState({[e.target.id]: e.target.value});
    }

    async login(e){
        e.preventDefault();
        const state = this.state;
        try{
            await auth.login(state.email, state.password)
            this.setState({
                loginSucceeded: true,
                loginMessage: "Congratulations! You Logged in successfully"
            })
        }catch(exception){
            if(exception.response && exception.response.status === 400){
                this.setState({
                    loginSucceeded: false,
                    loginMessage: "The email or password is incorrect"
                })
            }else{
                this.setState({
                    loginSucceeded: false,
                    loginMessage: "The server encountered an error. Please try again later."
                })
            }
        }
    }
}
 
export default Login;