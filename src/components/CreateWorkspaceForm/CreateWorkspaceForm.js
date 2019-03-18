import React, { Component } from 'react'
import InputField from '../InputField/InputField'
import ImageUpload from '../ImageUpload/ImageUpload'
import Button from '../Button/Button'  
import '../CreateWorkspaceForm/CreateWorkspaceForm.css' 
import '../Button/WorkspaceButton.css'
import '../InputField/WorkspaceInputField.css' 
import axios from 'axios'
class CreateWorkspaceForm extends Component {  
    constructor(props){
        super(props)
        this.state = {
            workspaceName :null,
            companyName :null,
            projectName :null
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
       <div  className="container workspaceData">
            <form onSubmit={this.handelSubmit.bind(this)}>
            <InputField  labelStyle="labelStyle" inputClassName="form-control inputField" label="Workspace Name" name="workspaceName" onChange={this.handleInputChange.bind(this)}/> 
            <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Company Name" name="companyName" small="(Optional)" onChange={this.handleInputChange.bind(this)}/> 
            <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Project you're working on" name="projectName" small="(Optional)" onChange={this.handleInputChange.bind(this)} />
            <Button text="Create Workspace" type="submit" buttonStyle="btn createWS" />
           </form> 
           <ImageUpload label="Add workspace Image" /> 
        </div>
        )
    }
}

export default CreateWorkspaceForm