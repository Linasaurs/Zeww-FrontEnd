import React, { Component } from 'react'
import SelectWorkspace from './SelectWorkspace';
import JoinWorkspace from './JoinWorkspace';
import './ListofWorkspacesPage.css'
import auth from '../../Services/authService';
import axios from "axios";
class SelectOrJoinWorkspaces extends Component {
    state={isloading:true, workspaces:[]}
    componentDidMount(){
       var config = {
           headers: { 'Authorization': "bearer " + localStorage.getItem('token')
          }
         };
         axios.get(`http://10.0.67.127:8080/api/users/GetworkspacesbyUserId/${auth.getCurrentUserId()}`, config).then(x => this.setState({ workspaces: x.data ,isloading:false}));

    }
    render () {
        return (
            <React.Fragment>
            {this.state.isloading?<React.Fragment>
                </React.Fragment>: <div className="mainDiv">
                <SelectWorkspace workspaces={this.state.workspaces}/>
               <JoinWorkspace/>
            </div>}
           </React.Fragment>
        );
    }
}

export default SelectOrJoinWorkspaces