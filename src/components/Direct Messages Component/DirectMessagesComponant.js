import React from 'react';
import ReactDOM from 'react-dom';
import NameTagComponant from './NameTagComponant';

export default class DirectMessagesComponant extends React.Component {
    render() {
      return (
        <div className="directMessagesMenu">
        <h4>Direct Messages</h4>
        {this.props.users.length>0?this.props.users.map(u=><NameTagComponant name={u.name}/>):<div className="workspace-body-information">No users were found</div>}
       
        </div>
      )
    }
  
  }