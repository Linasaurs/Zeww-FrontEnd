import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './css/Home.css';
import NavBar from '../../components/NavBar/NavBar'
import {Link} from 'react-router-dom'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
              <NavBar/>
            <div className='homeDiv'>
                <Container className='homeContainer'>
                    <Row className="homeRow">
                        <Col className="ay7aga">
                            <h1 id="headeray7aga">First group chat developed by a bunch of freshies!</h1>
                            <Link to="/signup" id="joinbtnay7aga">join zeww</Link>
                            <Link to="/login" id="signinbtnay7aga">Sign In</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
            </React.Fragment>
        )
    }
}

export default Home