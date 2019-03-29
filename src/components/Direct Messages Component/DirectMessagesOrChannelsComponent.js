import React from 'react';
import NameTagComponant from './NameTagComponant';
import './DirectMessage.css'
import '../../AppLayout/workspace/ChannelView.css'

export default class DirectMessagesOrChannelsComponent extends React.Component {

   

    render() {
      return (
        <div className="directMessagesMenu">
        <h4 className="titleComponent">{this.props.title}</h4>
        {this.props.list.length>0?
          this.props.list.map((obj,i)=>
            <NameTagComponant key={i} i={i} obj={obj}
                              CurrentWorkspace={this.props.CurrentWorkspace} 
                              isPrivate={this.props.title === "Channels"?false:true}
                              setCurrentChatId= {this.props.setCurrentChatId}
                              setCurrentChannelName = {this.props.setCurrentChannelName}
                              hubConnection={this.props.hubConnection || null}/>)
          :
          <div className="workspace-body-information" 
               style={{marginLeft:"2rem"}}>
               No {this.props.title} were found
          </div>}
       
        </div>
      )
    }
  
  }