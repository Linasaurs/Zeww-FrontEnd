import React, { Component } from 'react'
import CreateWorkspaceForm from '../CreateWorkspaceForm/CreateWorkspaceForm'
import axios from 'axios' 
import WorkspaceCreated from '../WorkspaceCreated/WorkspaceCreated';
import {Redirect, Route} from 'react-router-dom'
import auth from '../../Services/authService'
import config from '../../config'
class CreateWorkspaceFormContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            workspaceName :null,
            companyName :null,
            projectName :null,
            data: null,  
            workspaceNameExists: false
        }
    }
    handelSubmit(event){  
        event.preventDefault()
        const workspaceName= this.state.workspaceName
        const companyName =  this.state.companyName 
        const projectName = this.state.projectName 
        const _data = {workspaceName, companyName, projectName}  

        axios(auth.includeAuth({
            method: "post",
            headers: { "Content-Type": "application/json" },
            url: `${config.BASE_URL}/workspaces/CreateWorkspace`,
            data: _data 
        })).then(res => {  
            console.log(res)
            if(res != null){  
                this.setState({data: res.data});     
            } 
          }).catch(err => { 
              if(err!=null){
                if(JSON.parse(JSON.stringify(err)).response.status == 400){
                    this.setState({workspaceNameExists:true});
                } 
            }
          });

    } 
    handleInputChange(event){
     this.setState({
         [event.target.name]: event.target.value
        });
    } 
    render () {
        return ( 
            <React.Fragment>  
   <CreateWorkspaceForm submit={this.handelSubmit.bind(this)} change={this.handleInputChange.bind(this)} validationErr={this.state.workspaceNameExists}/>
    {this.state.data != null && <Redirect to={{pathname:`/created/${this.state.data.id}`,state:this.state.data}}>Created</Redirect> }
            </React.Fragment>
        )
    }
}
export default CreateWorkspaceFormContainer