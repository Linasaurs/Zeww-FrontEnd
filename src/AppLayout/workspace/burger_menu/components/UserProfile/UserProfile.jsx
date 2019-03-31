import React from 'react';
import './UserProfile.css'
import EditProfileContainer from './EditProfile/EditProfileComponent';
class UserProfile extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
           editProfileVisible : false
        }
    } 
    toggle() {
        this.setState(prevState => ({
            editProfileVisible: !prevState.editProfileVisible
        })); 
      }
render(){
    return ( 
        <React.Fragment>
        <div className="profileDiv">
            <div className="userData">  
                <div style={{display:'flex'}}>
                 <img className="userImgSmall" src={require('../burgermenu/logoplaceholder.svg')}/>
                 <label>@{this.props.userData.userName}</label>   
                 <button className="profileBtn" style={{float:'right', height:0}} onClick={this.toggle.bind(this)}>Edit</button> 
                  <EditProfileContainer  userData={this.props.userData} toggle={this.toggle.bind(this)} editProfileVisible={this.state.editProfileVisible}/>
                 </div>  
                 <div className="userDetails">
                 <div style={{display:'flex'}}> <label>Email:  </label> <p style={{margin:0}}>{this.props.userData.email}</p> </div>
                 <div style={{display:'flex'}}> <label>Phone:  </label> <p style={{margin:0}}>{this.props.userData.phoneNumber}</p> </div>
                 {/* <div style={{display:'flex'}}> <label>Company:</label> <p style={{margin:0}}>{}</p> </div>  */}
                 </div>
                </div>
        </div> 
        </React.Fragment>
    ); 
    }
}

export default UserProfile;