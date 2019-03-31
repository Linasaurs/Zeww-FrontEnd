import React from 'react';
// import ReactDOM from 'react-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import configuration from '../../config'
// import DirectMessagesOrChannelsComponent from './DirectMessagesOrChannelsComponent';
 class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
         users:[]
        }
      }
       componentDidMount(){
        var config = {
          headers: {'Authorization': "bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjgiLCJuYmYiOjE1NTIzMTMyOTYsImV4cCI6MTU1MjkxODA5NiwiaWF0IjoxNTUyMzEzMjk2fQ.WvHOnsYCgtNFSEmoxzB_h0h09XRBkx0SGIZekKpGYoI"}
      };
        var users = axios.get(`${configuration.BASE_URL}/workspaces/getusersbyworkspaceid/3`,config).then(x => x.data);
        
        this.setState({users:users})
      }
    render() {
      return (
        <div >
            ehyyy
    </div>
      )
    }
  
  }
  
export default Profile;