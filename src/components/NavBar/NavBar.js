import React, { Component } from 'react'
import '../NavBar/NavBar.css'
class NavBar extends Component {
    render() {
        return ( 
<nav className="navbar navbar-expand-lg navbar-light bg-light zewwNavBar">
  <img className="logo" href="#" src={require("../images/logo.png")}/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="navBarLinks" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="navBarLinks" href="#">Why Zeww?</a>
      </li>
      <li className="nav-item">
        <a className="navBarLinks" href="#" > Pricing </a>
      </li> 
      <li className="nav-item">
        <a className="navBarLinks" href="#" > About Us </a>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}

export default NavBar