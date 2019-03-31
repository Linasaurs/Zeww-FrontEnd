import React, { Component } from 'react'
import SelectWorkspace from './SelectWorkspace';
import JoinWorkspace from './JoinWorkspace';
import './ListofWorkspacesPage.css'
import auth from '../../Services/authService';
import axios from "axios";
import withAuthentication from '../../HOC/withAuthentication';
import configuration from '../../config'


class SelectOrJoinWorkspaces extends Component {
    state={isloading:true, workspaces:[]}
    componentDidMount(){
       var config = {
           headers: { 'Authorization': "bearer " + localStorage.getItem('token')
          }
         };
         axios.get(`${configuration.BASE_URL}/users/GetworkspacesbyUserId/${auth.getCurrentUserId()}`, config).then(x => this.setState({ workspaces: x.data ,isloading:false}));

    }
    render () {
        return (
            <React.Fragment>
            {this.state.isloading?<React.Fragment>
                </React.Fragment>: <React.Fragment>
                {/* style= here=>vvv {{display:this.state.workspaces.length>0?"":"none"}} */}
                {/* <h4 className="NoworkspaceHeader" > Ooops! Seems like you don't have any workspaces in your account</h4> */}
                <div className="mainDiv">
                <SelectWorkspace workspaces={this.state.workspaces}/>
               <JoinWorkspace textBoxVisable={this.state.workspaces.length>0?"":"none"}/>       
               </div>
               </React.Fragment>} 
           </React.Fragment>
        );
     }
}

export default withAuthentication(SelectOrJoinWorkspaces)