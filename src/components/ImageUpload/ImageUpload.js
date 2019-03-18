import React, { Component } from 'react'

class ImageUpload extends Component {
    render () {
        return (
            <div className="form-group">
        <label htmlFor="name">{this.props.label}</label>
        <form method="post" encType="multipart/form-data">
          <input type="file" id="files"  name="files" multiple />
          <input type="button"  id="upload"  value="Upload" />
      </form>
       <img id="wsimage"/>
      </div>
        )
    }
}

export default ImageUpload