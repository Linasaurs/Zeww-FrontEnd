import React, { Component } from 'react';
import './whyZeww.css';

class WhyZeww extends Component {
    render() {
        return (
            <div id="whyZeww" className="container container-fluid">
                <h1 id="whyHeader">Why Zeww?</h1>
                <div className="row whyDiv">
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 channels">
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

                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 search">
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

                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 integration">
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
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 security">
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
        )
    }
}

export default WhyZeww