import React from 'react'
import InputField from '../InputField/InputField'
import ImageUpload from '../ImageUpload/ImageUpload'
import Button from '../Button/Button'  
import '../CreateWorkspaceForm/CreateWorkspaceForm.css' 
import '../Button/WorkspaceButton.css'
import '../InputField/WorkspaceInputField.css' 
const CreateWorkspaceForm = props =>
       <div  className="container workspaceData">
            <form onSubmit={props.submit}>
            <InputField  labelStyle="labelStyle" inputClassName="form-control inputField" label="Workspace Name" name="workspaceName" onChange={props.change}/>  
            {props.validationErr && <small className="wsExists"><i className="fas fa-exclamation-triangle"></i>  Workspace name already exists! Please choose another name.</small>}
            <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Company Name" name="companyName" small="(Optional)" onChange={props.change}/> 
            <InputField labelStyle="labelStyle" inputClassName="form-control inputField" label="Project you're working on" name="projectName" small="(Optional)" onChange={props.change} />
            <Button text="Create Workspace" type="submit" buttonStyle="btn createWS" /> 
           </form> 
        </div>
        
    


export default CreateWorkspaceForm