import React, { Component } from 'react'
import ImageUpload from './ImageUpload';
import axios, { post } from 'axios'; 
import auth from '../../Services/authService' 
import {Link} from 'react-router-dom'
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
            'content-type': 'multipart/form-data',
        }
     }   
     return  post(url, formData,auth.includeAuth(config))
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
                <Link to={{ pathname:`/workspace/${this.props.wsId}`, state: {workSpaceImg: this.state.imageUrl} }} style={{alignItems: "center"}}className="btn createWS">Go to workspace</Link>  
            </div>
        )
    }
}

export default ImageUploadContainer