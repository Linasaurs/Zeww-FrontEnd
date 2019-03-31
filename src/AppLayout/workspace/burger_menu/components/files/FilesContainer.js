import React, {Component} from 'react'
import FileTemplate from './FileTemplate'
import Axios from 'axios'
import './file.css'
import 'bootstrap/dist/css/bootstrap.css'
import config from '../../../../../config'

class FilesContainer extends Component
{

    fetchData()
    {
        Axios.get(`${config.BASE_URL}/chats/GetFiles/wael`)
        .then(res => {
          console.log(res.data);
          this.props.getfiles(res.data);
        })
    }

    componentDidMount() 
    {
       this.fetchData()
    }

    download(downloadUrl)
    {
        //api call to download
        console.log(downloadUrl);
    }

    render()
    {
        const {files} = this.props
        if(files.length < 1)
        {
            return(<h1>No Files</h1>)
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