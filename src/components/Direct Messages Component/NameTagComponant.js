import React from 'react';
import ReactDOM from 'react-dom';

export default class NameTagComponant extends React.Component {
    render() {
      return (
        <div className="NameTags">
        <label className="UserName">
          {this.props.name}
        </label>
    </div>
      )
    }
  
  }