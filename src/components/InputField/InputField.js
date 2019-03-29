import React, { Component } from 'react'
import '../InputField/WorkspaceInputField.css'
class InputField extends Component { 
    render () {
        return (
        
     <div className={this.props.className} style={{display:this.props.display}}>
        <label className={this.props.labelStyle} htmlFor="name">{this.props.label}</label> <small>{this.props.small}</small>
        <input type="text" className={this.props.inputClassName} name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.onChange} />
       </div>
        )
    }
}

export default InputField