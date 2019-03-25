import React, { Component } from 'react'
import CreateWorkspaceForm from './CreateWorkspaceForm';
import axios from 'axios' 
import WorkspaceCreated from '../WorkspaceCreated/WorkspaceCreated';
import {Link, Route} from 'react-router-dom'
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
            {this.state.data != null ? <Link to={"/created"}>Created</Link> :  <CreateWorkspaceForm submit={this.handelSubmit.bind(this)} change={this.handleInputChange.bind(this)} data={this.state.data}/>  }; 
            <Route path="/created" render={() =><WorkspaceCreated/>} />
            </React.Fragment>
        )
    }
}
export default CreateWorkspaceFormContainer