import React, { Component } from 'react'
import CreateWorkspaceForm from '../CreateWorkspaceForm/CreateWorkspaceForm'
import axios from 'axios' 
import WorkspaceCreated from '../WorkspaceCreated/WorkspaceCreated';
import {Redirect, Route} from 'react-router-dom'
class CreateWorkspaceFormContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            workspaceName :null,
            companyName :null,
            projectName :null,
            data: null, 
        }
    }
    handelSubmit(event){  
        event.preventDefault()
        const workspaceName= this.state.workspaceName
        const companyName =  this.state.companyName 
        const projectName = this.state.projectName 
        const data = {workspaceName, companyName, projectName} 
        axios.post('https://localhost:44346/api/workspaces/CreateWorkspace',data).then(res => { 
            if(res != null){ 
                this.setState({data: res.data}); 
                console.log(res);
                console.log(res.data); 
                
            }
          })
    } 
    handleInputChange(event){
     this.setState({
         [event.target.name]: event.target.value
        });
    } 
    render () {
        return ( 
            <React.Fragment>  
                <CreateWorkspaceForm submit={this.handelSubmit.bind(this)} change={this.handleInputChange.bind(this)}/>
            {this.state.data != null && <Redirect to={"/created"}>Created</Redirect> }
            </React.Fragment>
        )
    }
}
export default CreateWorkspaceFormContainer