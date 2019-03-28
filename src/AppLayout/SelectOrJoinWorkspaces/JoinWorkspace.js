import React, { Component } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import '../../components/Button/WorkspaceButton.css'
import '../../components/InputField/WorkspaceInputField.css'
import './ListofWorkspacesPage.css';
import axios from 'axios';
import auth from '../../Services/authService';
import {Redirect } from 'react-router';


const USERS_BASE_URL = "http://10.0.67.127:8080/api/workspaces"
class JoinWorkspace extends Component {
    constructor (props) {
        super(props)
        this.state={
            workspaceURL:"",
            textBoxVisable:this.props.textBoxVisable,
            joinedWorkspace:false,
            workspaceId:""
        }
        this.joinworkspace=this.joinworkspace.bind(this)
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value,preferredFullName:this.state.firstName+ " "+this.state.lastName });
      }    
    
    joinworkspace(){
        if(this.state.textBoxVisable===""){
        var elements=this.state.workspaceURL.trim().split("/")
        if(elements.length===3&&!elements.includes("")){
             
            axios(auth.includeAuth({
                method: 'post',
                url: USERS_BASE_URL + '/joinworkspace',
                params: {
                    workspaceId:parseInt( elements[1]),
                    key:elements[2]
                  }
               
            }))
                .then(response => {
                    this.setState({
                       joinedWorkspace:true,
                      workspaceId:parseInt( elements[1])
                    })
                    

                    
               })
                .catch(error => {
                
                  console.log(error)
               })
        }
        else{
            console.log("Invalid Input string");

        }
    }else{
        this.setState({textBoxVisable:""});

    }
       
    }
    render() {
        return (
            <React.Fragment>
            {this.state.joinedWorkspace?<Redirect to={`/workspace/${this.state.workspaceId}`}/>:
            <div className="JoinWorkspace">
                <h4 className="joinWorkspaceLeft">Join new Workspace</h4>
                <div id="joinDiv">
                    <InputField labelStyle="labelStyle" inputClassName="form-control inputField" placeholder="Workspace Url" name="workspaceURL" onChange={this.onChange.bind(this)} display={this.state.textBoxVisable}/>
                    <Button text="Join Workspace" type="submit" buttonStyle="btn createWS" onclick={this.joinworkspace}  />
                </div>
            </div>}
            </React.Fragment>
        )
    }
}

export default JoinWorkspace