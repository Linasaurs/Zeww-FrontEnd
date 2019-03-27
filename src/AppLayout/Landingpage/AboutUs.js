import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './css/AboutUs.css'

class AboutUs extends Component {
    render() {
        return (
            <Container className="aboutContainer">
                <h1 id="aboutHeader">About Us</h1>
                <Row>
                    <Col className="aboutBody">
                        <p className="aboutDescription">We are the TGP, the chosen 13, the future of ITWORX.
                           We are the creme de la creme of the graduates, the brightest of them.
                           We made this design in a couple of hours. We are made for greatness.
                           Each and everyone of us. We are not humble, for we are awesome.
                           All thanks go to our mentors and instructors. We love you Ayman, Nermine, Mariam..
                        </p>
                        <img id="tgpImg" className="img-responsive" src={require("../Landingpage/css/imgs/lovelyTGP.jpg")} alt="Lovely TGP" />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default AboutUs