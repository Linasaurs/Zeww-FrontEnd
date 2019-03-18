import React, { Component } from 'react'
import '../AddAnotherButton/AddAnother.css'
class AddAnother extends Component {
    render () {
        return (
            <div id="addMembers">
       <img id="addIcon" src={this.props.src}/> 
       <small id="addTxt">{this.props.small}</small>
       </div> 
        )
    }
}

export default AddAnother