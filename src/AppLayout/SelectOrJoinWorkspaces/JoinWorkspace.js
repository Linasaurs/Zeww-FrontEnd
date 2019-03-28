import React, { Component } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import '../../components/Button/WorkspaceButton.css'
import '../../components/InputField/WorkspaceInputField.css'
import './ListofWorkspacesPage.css';
import axios from 'axios';

const USERS_BASE_URL = "http://localhost:5000/api/workspace"
class JoinWorkspace extends Component {
    constructor (props) {
        super(props)
        this.state={
            workspaceURL:""
        }
        this.joinworkspace=this.joinworkspace.bind(this)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value,preferredFullName:this.state.firstName+ " "+this.state.lastName });
      }    
    
    joinworkspace(){
        var elements=this.state.workspaceURL.trim().split("/")
        if(elements.length===3&&!elements.includes("")){
             
            axios({
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                url: USERS_BASE_URL + '/signup',
               
            })
                .then(response => {
                    // this.setState({
                       
                    // })
                    console.log(response)

                    
               })
                .catch(error => {
                
                  console.log(error)
               })
        }
        else{
            console.log("Invalid Input string");

        }
         
       
    }
    render() {
        return (
            <div className="JoinWorkspace">
                <h4 className="joinWorkspaceLeft">Join new Workspace</h4>
                <div id="joinDiv">
                    <InputField labelStyle="labelStyle" inputClassName="form-control inputField" placeholder="Workspace Url" name="workspaceURL" onChange={this.onChange.bind(this)}/>
                    <Button text="Join Workspace" type="submit" buttonStyle="btn createWS" onclick={this.joinworkspace} />
                </div>
            </div>
        )
    }
}

export default JoinWorkspace