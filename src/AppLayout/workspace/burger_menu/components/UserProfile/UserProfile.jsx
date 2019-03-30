import React from 'react';
import './UserProfile.css'
const UserProfile = () => {
    return ( 
        <React.Fragment>
        <div className="profileDiv">
            <div className="userData">  
                <div style={{display:'flex'}}>
                 <img className="userImgSmall" src={require('../burgermenu/logoplaceholder.svg')}/>
                 <label>@userName</label>   
                 <button className="profileBtn" style={{float:'right', height:0}}>Edit</button>
                 </div>  
                 <div className="userDetails">
                 <div style={{display:'flex'}}> <label>Email:</label> <p style={{margin:0}}>user@email.com</p> </div>
                 <div style={{display:'flex'}}> <label>Phone:</label> <p style={{margin:0}}>012230104</p> </div>
                 <div style={{display:'flex'}}> <label>Company:</label> <p style={{margin:0}}>Itworx</p> </div> 
                 </div>
                </div>
        </div> 
        </React.Fragment>
    );
};

export default UserProfile;