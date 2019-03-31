import React, {Component} from 'react'
import FileTemplate from './FileTemplate'
import axios from 'axios'
import './file.css'
import 'bootstrap/dist/css/bootstrap.css'
import config from '../../../../../config'
import auth from '../../../../../Services/authService'
const BASE_URL = config.BASE_URL+"/";

class FilesContainer extends Component
{

    fetchData()
    {
        var currentChannelName = this.props.currentChannel.name;
        axios(auth.includeAuth({
            method: 'get',
            url: `${BASE_URL}chats/GetFiles/${currentChannelName}`,
          })).then(response => {
            console.log(response.data);
          this.props.getfiles(response.data);
        })
    }

    componentDidMount() 
    {
       this.fetchData()
    }

    download(fileName)
    {
        var fileToDownload = fileName
        console.log(fileToDownload)
        axios({
            method: 'get',
            url: `${BASE_URL}users/download/${fileToDownload}`,
          })
        }

    render()
    {
        const {files} = this.props
        if(files.length < 1)
        {
            return(<div className="container files-container">
                    <h1>No Files</h1>
                    </div>
                    )
        }
        else
        {
            return(
                <div className="container files-container"> 
                <div className="row">
                    <a className="previous" onClick={()=>this.props.toggleFilesContainer()}>&#8249;</a>
                </div>
                    
                    <div>
                        <ul className="ul-files">
                        {files.map(
                                (file,i) => <FileTemplate 
                                                key={i} 
                                                name={file.name} 
                                                sender={file.sender} 
                                                timestamp={file.timestamp}
                                                extension={file.extension}
                                                image = {file.image}
                                                download = {this.download}
                                                downloadUrl = {file.downloadUrl}/>
                            )}
                        </ul>
                    </div>
                </div>
               
            )
        }
        
    }
}

export default FilesContainer;