import React from 'react';
import NameTagComponant from './NameTagComponant';
import './DirectMessage.css'
import '../../AppLayout/workspace/ChannelView.css'

export default class DirectMessagesComponant extends React.Component {
    render() {
      return (
        <div className="directMessagesMenu">
        <h4 className="titleComponent">Direct Messages</h4>
        {this.props.users.length>0?this.props.users.map((u,i)=><NameTagComponant key={i} i={i}username={u.userName}/>):<div className="workspace-body-information" style={{marginLeft:"2rem"}}>No users were found</div>}
       
        </div>
      )
    }
  
  }