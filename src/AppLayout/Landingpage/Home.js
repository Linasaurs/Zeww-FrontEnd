import React, { Component } from 'react';
import './home.css';
import {Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="home container">
                <div className="main">
                    <h1 id="header">First group chat developed by a bunch of freshies!</h1>
                    <Link  to="/signup" type="button" className="btn" id="joinbtn">join zeww</Link>
                    <Link  to="/"type="button" className="btn" id="signinbtn">Sign In</Link>
                </div>
            </div>
        )
    }
}

export default Home