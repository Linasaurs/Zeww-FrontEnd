import React from 'react';
// import ReactDOM from 'react-dom';
// import axios from "axios";
// import DirectMessagesOrChannelsComponent from './DirectMessagesOrChannelsComponent';

export default class MainPage extends React.Component {
   
    render() {
      return (
        <div>
        <div className="home container">
            <div className="main">
                <h1 id="header">First group chat developed by a bunch of freshies!</h1>
                <button type="button" className="btn" id="joinbtn">join zeww</button>
                <button type="button" className="btn" id="signinbtn" onClick={()=>this.props.workspace()}>Sign In</button>
            </div>
        </div>
    
        {/* <div className="break"></div>  */}
    
        <div id="whyZeww" className="container container-fluid">
                <h1 id="whyHeader">Why Zeww?</h1>
                <div className="row whyDiv">
                    <div className="col-sm-3 col-md-6 col-lg-4 channels">
                        <div id="titleDiv">
                            <h4>Channels</h4>
                            <i className='fas fa-comments'></i>
                        </div>
                        <p id="description">
                            Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.
                        </p>
                    </div>
    
                    <div className="col-sm-3 col-md-6 col-lg-4 search">
                        <div id="titleDiv">
                            <h4>Search</h4>
                            <i className="fa fa-search"></i>
                        </div>
                        <p id="description">
                            Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.
                        </p>
                    </div>
    
                    <div className="col-sm-3 col-md-6 col-lg-4 integration">
                        <div id="titleDiv">
                            <h4>Integration</h4>
                            <i className="fa fa-sitemap"></i>
                        </div>
                        <p id="description">
                            Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.
                        </p>
                    </div>
                    <div className="col-sm-3 col-md-6 col-lg-4 security">
                        <div id="titleDiv">
                            <h4>Security</h4>
                            <i className='fa fa-shield'></i>
                        </div>
                        <p id="description">
                            Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.
                        </p>
                    </div>
                </div>
        </div>
    
         {/* <div className="break"></div>  */}
    
        <div id="aboutUs" className="container container-fluid">
            <h1 id="whyHeader">About Us</h1>
            <div className="row aboutBody">
                <p className="col-sm-6 col-md-6 col-lg-6">We are the TGP, the chosen 13, the future of ITWORX. 
                    We are the creme de la creme of the graduates, the brightest of them.
                    We made this design in a couple of hours. We are made for greatness.
                    Each and everyone of us. We are not humble, for we are awesome.
                    All thanks go to our mentors and instructors. We love you Ayman, Nermine, Mariam..
                </p>
                <img className="img-responsive" src="imgs/lovelyTGP.jpg" alt="Lovely TGP"></img>
            </div>
        </div>
    </div>
      )
    }
  
  }