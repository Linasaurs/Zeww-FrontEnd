import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './css/AboutUs.css';
import NavBar from '../../components/NavBar/NavBar'

class AboutUs extends Component {
    render() {
        return (
            <div className="aboutContainer">
                <NavBar styleClass="navbar navbar-expand-lg homeNavBar" />
                <h1 id="aboutHeader">About Us</h1>
                <div className="row aboutBody">
                    <p className="col-sm-9 col-md-9 col-lg-6">We are the TGP, the chosen 13, the future of ITWORX.
                        We are the creme de la creme of the graduates, the brightest of them.
                        We made this design in a couple of hours. We are made for greatness.
                        Each and everyone of us. We are not humble, for we are awesome.
                        All thanks go to our mentors and instructors. We love you Ayman, Nermine, Mariam..
                    </p>
                    <img className="img-responsive abouUsImg" src={require("./css/imgs/lovelyTGP.jpg")} alt="Lovely TGP"/>
                </div>
            </div>
        )
    }
}

export default AboutUs