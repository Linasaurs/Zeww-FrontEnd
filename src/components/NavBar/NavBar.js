import React, { Component } from 'react'
import '../NavBar/NavBar.css' 
import {Link} from 'react-router-dom'
class NavBar extends Component { 
    render() {
        return ( 
<nav className={this.props.styleClass}>
  <img className="logo" href="#" src={require("../images/logo.png")}/>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="navBarLinks" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <a className="navBarLinks" href="/why-zeww">Why Zeww?</a>
      </li>
      <li className="nav-item">
        <a className="navBarLinks" href="#" > Pricing </a>
      </li> 
      <li className="nav-item">
        <a className="navBarLinks" href="/aboutus" > About Us </a>
      </li>
    </ul>
  </div>
</nav>
        )
    }
}

export default NavBar