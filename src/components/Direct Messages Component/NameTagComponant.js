import React from 'react';
import './DirectMessage.css'
export default class NameTagComponant extends React.Component {
    render() {
      return (
        <div key={this.props.i}className="NameTags">
        <label className="UserName">
          {this.props.username}
        </label>
    </div>
      )
    }
  
  }