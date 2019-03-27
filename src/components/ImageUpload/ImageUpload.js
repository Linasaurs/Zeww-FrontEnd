import React, { Component } from 'react'
import '../ImageUpload/ImageUpload.css'
class ImageUpload extends Component {
    render () {
        return (
            <div className="form-group imageUpload">  
            <div className="WSNameImage"> 
                <img className="wsImage" src={this.props.imageUrl != null ? this.props.imageUrl:require('../images/groupIcon.png')}/> 
                <label className="imageUploadLabel" htmlFor="name">{this.props.label}</label> 
                <label className="wsName">{this.props.wsName}</label>
            </div>
        <form onSubmit={this.props.uploadImage} method="post" encType="multipart/form-data">
          <input onChange={this.props.onchange} type="file" id="file"  name="file" multiple />
          <button type="submit" id="upload"  value="Upload">Upload</button>
      </form>
      </div>
        )
    }
}

export default ImageUpload