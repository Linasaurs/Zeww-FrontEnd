import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
const MainNavLayout = ({render: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
          <React.Fragment>
            <NavBar/>
          <Component {...matchProps}/>
          </React.Fragment>
       
      
      )} />
    )
  };
  export default MainNavLayout;