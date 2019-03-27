import React, { Component } from 'react'
import './css/WhyZeww.css'
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
} from 'reactstrap';

class WhyZeww extends Component {
    
    render() {
        return (
            <div className="whyzewwDiv">
                <h1 id="whyHeader">Why Zeww?</h1>
                <CardDeck style={{"margin-left": "4rem", "margin-right": "4rem"}}>
                    <Card className="channels" style={{"background": "#cccccc8a", "border-radius": "17px", "border": "none", "height": "20rem", "overflow": "hidden"}}>
                        <CardBody className="deck">
                            <CardTitle className="title">Channels <i className='fas fa-comments'></i></CardTitle>
                            <CardText id="description">Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.</CardText>
                        </CardBody>
                    </Card>

                    <Card className="search" style={{"background": "#cccccc8a", "border-radius": "17px", "border": "none", "height": "20rem", "overflow": "hidden"}}>
                        <CardBody className="deck">
                            <CardTitle className="title">Search <i className="fa fa-search"></i></CardTitle>
                            <CardText id="description">Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.</CardText>
                        </CardBody>
                    </Card>

                    <Card className="integration" style={{"background": "#cccccc8a", "border-radius": "17px", "border": "none", "height": "20rem", "overflow": "hidden"}}>
                        <CardBody className="deck">
                            <CardTitle className="title">Integration <i className="fa fa-sitemap"></i></CardTitle>
                            <CardText id="description">Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.</CardText>
                        </CardBody>
                    </Card>

                    <Card className="security" style={{"background": "#cccccc8a", "border-radius": "17px", "border": "none", "height": "20rem", "overflow": "hidden"}}>
                        <CardBody className="deck">
                            <CardTitle className="title">Security <i className='fa fa-shield'></i></CardTitle>
                            <CardText id="description">Lorem ipsum dolor sit amet,
                            eirmod intellegat incorrupte per te.
                            Magna omittantur necessitatibus in mel.
                            Iriure corpora temporibus pri et.
                            Ut ius clita maiorum vulputate,
                            cibo facer mei ut.</CardText>
                        </CardBody>
                    </Card>
                </CardDeck>
            </div>
        )
    }
}

export default WhyZeww