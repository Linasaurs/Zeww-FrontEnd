import React, { Component } from 'react';
import './Signup.css'
import 'bootstrap/dist/css/bootstrap.css'
import {Redirect } from 'react-router';

import axios from 'axios';
const Joi = require('joi');
const USERS_BASE_URL = "http://localhost:5000/api/users"

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",

            nameError: "",
            usernameError: "",
            emailError: "",
            phoneNumberError: "",
            passwordError: "",
            confirmPasswordError: "",

            isNameValid: undefined,
            isUserNameValid: undefined,
            isEmailValid: undefined,
            isPhoneNumberValid: undefined,
            isPasswordValid: undefined,
            isConfirmPasswordValid: undefined,

            validatingUserName: false,
            validatingEmail: false,

            signUpSucceeded: undefined,
            signUpMessage: ""
        }
      }

    schema = {
        name: Joi.string().min(3).max(15).required(),
        username: Joi.string().alphanum().min(3).max(15).required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().regex(/(^$)|(^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$)/),
        password: Joi.string().alphanum().required(),
        confirmPassword: Joi.string().alphanum().required()
    };

    validateField(name, value){
        const obj = {[name]: value};
        const schema = { [name]: this.schema[name]}
        const {error} = Joi.validate(obj,schema);
        return error? error.details[0].message : null;
    }

    render() {  
        return ( 
            <div id="signupComponent">
                {
                    this.state.signUpSucceeded?
                    <Redirect to="/login"/>
                    :
                    <React.Fragment>
                    <h2>Sign Up</h2>
                    <form>
                        <div id="signupInputs">
                            <input 
                                id="name"  
                                type="text" 
                                className={this.state.isNameValid? "form-control is-valid":
                                    (this.state.isNameValid == null)?"form-control":"form-control is-invalid"} 
                                onChange={this.dataChanged.bind(this)}
                                onBlur={this.validateName.bind(this)}
                                placeholder="*Full name..."/>
                            <label className="invalidLabel text-danger">{this.state.nameError}</label>
                            
                            <div className="inputWithSpinner">
                                <input 
                                    id="username" 
                                    type="text" 
                                    className={this.state.isUserNameValid? "form-control is-valid":
                                        (this.state.isUserNameValid == null)?"form-control":"form-control is-invalid"} 
                                    onChange={this.dataChanged.bind(this)} 
                                    onBlur={this.validateUsername.bind(this)} 
                                    placeholder="*Username..."/>
                                    {this.state.validatingUserName?
                                        <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>:""
                                    }
                            </div>
                            <label className="invalidLabel text-danger">{this.state.usernameError}</label>
                            
                            <div className="inputWithSpinner">
                                <input 
                                    id="email" 
                                    type="email" 
                                    className={this.state.isEmailValid? "form-control is-valid":
                                        (this.state.isEmailValid == null)?"form-control":"form-control is-invalid"} 
                                    onChange={this.dataChanged.bind(this)} 
                                    onBlur={this.validateEmail.bind(this)} 
                                    placeholder="*Email..."/>
                                    {this.state.validatingEmail?
                                        <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>:""
                                    }
                            </div>
                            <label className="invalidLabel text-danger">{this.state.emailError}</label>
                            
                            <input 
                                id="phoneNumber" 
                                type="tel" 
                                className={this.state.isPhoneNumberValid? "form-control is-valid":
                                    (this.state.isPhoneNumberValid == null)?"form-control":"form-control is-invalid"} 
                                onChange={this.dataChanged.bind(this)} 
                                onBlur={this.validatePhoneNumber.bind(this)}
                                placeholder="Phone number..."/>
                            <label className="invalidLabel text-danger">{this.state.phoneNumberError}</label>
                            
                            <input 
                                id="password" 
                                type="password" 
                                className={this.state.isPasswordValid? "form-control is-valid":
                                    (this.state.isPasswordValid == null)?"form-control":"form-control is-invalid"} 
                                onChange={this.dataChanged.bind(this)}
                                onBlur={this.validatePassword.bind(this)}
                                placeholder="*Password..."/>
                            <label className="invalidLabel text-danger">{this.state.passwordError}</label>
                            
                            <input 
                                id="confirmPassword" 
                                type="password" 
                                className={this.state.isConfirmPasswordValid? "form-control is-valid":
                                    (this.state.isConfirmPasswordValid == null)?"form-control":"form-control is-invalid"} 
                                onChange={this.dataChanged.bind(this)} 
                                onBlur={this.validateConfirmPassword.bind(this)} 
                                placeholder="*Confirm password..."/>
                            <label className="invalidLabel text-danger">{this.state.confirmPasswordError}</label>

                            <button type="submit" className="btn" id="signupBtn" onClick={this.signUp.bind(this)}>Sign up</button>
                            <label id="statusLabel" className={this.state.signUpSucceeded?"text-success":
                                (this.state.signUpSucceeded == null)?"":"text-danger"}>
                                    {this.state.signUpMessage}
                            </label>
                        </div>
                    </form>
                    </React.Fragment>
                }
            </div>
         )
    }

    dataChanged(e){
        this.setState({[e.target.id]: e.target.value});
    }

    signUp(e){
        e.preventDefault();
        const state = this.state;
        if(state.isNameValid && state.isUserNameValid && state.isEmailValid &&
           (state.isPhoneNumberValid || state.isPhoneNumberValid == null) &&
           state.isPasswordValid && state.isConfirmPasswordValid){
            
            axios({
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                url: USERS_BASE_URL + '/signup',
                data: {
                    "name": state.name,
                    "username": state.username,
                    "email": state.email,
                    "phonenumber": state.phoneNumber.trim().length===0? null : state.phoneNumber,
                    "password": state.password
                }
            })
                .then(response => {
                    this.setState({
                        signUpSucceeded: true,
                        signUpMessage: "Congratulations! You signed up successfully"
                    })
                    console.log(response)

                    
               })
                .catch(error => {
                  this.setState({
                      signUpSucceeded: false,
                      signUpMessage: "The server encountered an error. Please try again later."
                  })
                  console.log(error)
               })
        }
        else{
            this.validateName();
            this.validateUsername();
            this.validateEmail();
            this.validatePhoneNumber();
            this.validatePassword();
            this.validateConfirmPassword();
            this.setState({
                signUpSucceeded: false,
                signUpMessage: "Please correct the erros above."
            })
        }
    }

    validateName(e){
        var nameValue;
        if(e == null){
            nameValue = this.state.name;
        }
        else{
            nameValue = e.target.value;
        }

        const error = this.validateField('name', nameValue);
        if(error != null){
            this.setState({
                isNameValid: false,
                nameError: error.replace('"name"', 'Name')
            });
        }
        else{
            this.setState({
                isNameValid: true,
                nameError: ""
            });
        }
    }

    validateUsername(e){
        var usernameValue;
        if(e == null){
            usernameValue = this.state.username;
        }
        else{
            usernameValue = e.target.value;
        }

        const error = this.validateField('username', usernameValue);
        if(error != null){
            this.setState({
                isUserNameValid: false,
                usernameError: error.replace('"username"', 'Username'),
                validatingUserName: false
            });
            return
        }

        this.setState({
            validatingUserName: true
        })

        console.log(USERS_BASE_URL + '/verifyusernameisunique')
        axios({
            method: 'get',
            url: USERS_BASE_URL + '/verifyusernameisunique',
            params: {"username": usernameValue}
        })
            .then(() => {
                this.setState({
                    isUserNameValid: true,
                    usernameError: "",
                    validatingUserName: false
                })
           })
            .catch(error => {
              this.setState({
                  isUserNameValid: false,
                  usernameError: error.response==null? "The server encountered an error" : "ERRORRRRRRRRRR",
                  validatingUserName: false
              })
           })
    }
    
    validateEmail(e){
        var emailValue;
        if(e == null){
            emailValue = this.state.email;
        }
        else{
            emailValue = e.target.value;
        }

        const error = this.validateField('email', emailValue);
        if(error != null){
            this.setState({
                isEmailValid: false,
                emailError: error.replace('"email"', 'Email')
            });
            return
        }

        this.setState({
            validatingEmail: true
        })

        axios({
            method: 'get',
            url: USERS_BASE_URL + '/verifyemailisunique',
            params: {"email": emailValue}
        })
            .then(() => {
                this.setState({
                    isEmailValid: true,
                    emailError: "",
                    validatingEmail: false
                })
           })
            .catch(error => {
              this.setState({
                  isEmailValid: false,
                  emailError: error.response==null? "The server encountered an error" : error.response.data,
                  validatingEmail: false
              })
           })
    }

    validatePhoneNumber(e){
        var phoneNumberValue;
        if(e == null){
            phoneNumberValue = this.state.phoneNumber;
        }
        else{
            phoneNumberValue = e.target.value;
        }

        const error = this.validateField('phoneNumber', phoneNumberValue);
        if(error != null){
            this.setState({
                isPhoneNumberValid: false,
                phoneNumberError: "This is not a valid phone number"
            });
            //remove error if value is empty, as this is not a required filed
            if(phoneNumberValue.trim().length === 0){
                this.setState({
                    isPhoneNumberValid: true,
                    phoneNumberError: ""
                });
            }
        }
        else{
            this.setState({
                isPhoneNumberValid: true,
                phoneNumberError: ""
            });
        }
    }

    validatePassword(e){
        var passwordValue;
        if(e == null){
            passwordValue = this.state.password;
        }
        else{
            passwordValue = e.target.value;
        }

        const error = this.validateField('password', passwordValue);
        if(error != null){
            this.setState({
                isPasswordValid: false,
                passwordError: error.replace('"password"', 'Password')
            });
        }
        else{
            this.setState({
                isPasswordValid: true,
                passwordError: ""
            });
        }
        this.validateConfirmPassword()
    }
    
    validateConfirmPassword(e){
        var confirmPasswordValue;
        if(e == null){
            confirmPasswordValue = this.state.confirmPassword;
        }
        else{
            confirmPasswordValue = e.target.value;
        }

        if(confirmPasswordValue === this.state.password){
            this.setState({
                isConfirmPasswordValid: true,
                confirmPasswordError: ""
            });
        }
        else{
            this.setState({
                isConfirmPasswordValid: false,
                confirmPasswordError: "Passwords do not match"
            });
        }

        const error = this.validateField('confirmPassword', confirmPasswordValue);
        if(error != null){
            this.setState({
                isConfirmPasswordValid: false,
                confirmPasswordError: error.replace('"confirmPassword"', 'Confirm password')
            });
        }
    }
}
 
export default Signup;