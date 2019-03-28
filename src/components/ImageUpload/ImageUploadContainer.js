import React, { Component } from 'react'
import ImageUpload from './ImageUpload';
import axios, { post } from 'axios';
class ImageUploadContainer extends Component { 
    constructor(props){
        super(props)
        this.state = {
            file : null, 
            imageUrl: null
        }
    } 
    onchange(e) {
        this.setState({file:e.target.files[0]})
      }
    uploadImage(file) {  
       const url = `http://10.0.67.127:8080/api/workspaces/Upload/${this.props.wsId}`
       const formData = new FormData();
       formData.append('file',file)
       const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
     }   
     return  post(url, formData,config)
    } 

    submitForm(e) {
        e.preventDefault()
        this.uploadImage(this.state.file).then((response)=>{  
            console.log(response.data);  
             if(response!=null){
                console.log(response.status); 
                this.setState({imageUrl:response.data})
             }
             console.log(this.state.imageUrl); 
        }).catch(err => {
               console.log(JSON.parse(JSON.stringify(err)).response);
        });
    }
    render () {
        return (
            <div>
                <ImageUpload imageUrl={this.state.imageUrl} onchange={this.onchange.bind(this)} uploadImage={this.submitForm.bind(this)} wsId={this.props.wsId} label={this.props.label} wsName={this.props.wsName}/>
            </div>
        )
    }
}

export default ImageUploadContainer