import React, { Component } from 'react';
import Home from './Home';
import WhyZeww from './WhyZeww';
import AboutUs from './AboutUs';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <Home></Home>
                <WhyZeww></WhyZeww>
                <AboutUs></AboutUs>
            </div>
        )
    }
}

export default LandingPage