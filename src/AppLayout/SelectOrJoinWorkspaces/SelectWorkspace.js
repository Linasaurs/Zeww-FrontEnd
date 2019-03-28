import React, { Component } from 'react'
import WorkSpaceNameTag from './WorkSpaceNameTag';
import axios from "axios";
import './ListofWorkspacesPage.css'
import auth from '../../Services/authService';

class SelectWorkspace
 extends Component {
     state={isloading:false, workspaces:[], dummydata:[{workspaceName:"SaraWS"},{workspaceName:"SaraWS"},{workspaceName:"SaraWS"}]}
     componentDidMount(){
        var config = {
            headers: { 'Authorization': "bearer " + localStorage.getItem('token')
           }
          };
          axios.get(`http://10.0.67.127:8080/api/users/GetworkspacesbyUserId/${auth.getCurrentUserId()}`, config).then(x => this.setState({ workspaces: x.data ,isloading:false}));

     }
    render () {
        console.log(this.state.workspaces)
        return (
         
            <div>
                {this.state.isloading?"Loading": 
                <React.Fragment>
              {this.state.dummydata.length!==0?  
              <React.Fragment> 
                  <div className="workspacesWrapper">
                   <h4 className="workspacesHeader">Your workspaces</h4>
                <div className="workspacesDiv">
                {this.state.dummydata.map((w,i)=><WorkSpaceNameTag key={i}workspace={w}/>)}
                </div> 
                </div>
                </React.Fragment>:<React.Fragment>No reasluts found</React.Fragment>}
                </React.Fragment> }
                
            </div>
        )
    }
}

export default SelectWorkspace
