import React, { Component } from 'react';
import './App.css';
import CreateWorkspace from './components/CreateWorkspaceLayout/CreateWorkspace';
import NavBar from './components/NavBar/NavBar';
import { Route,Switch, BrowserRouter } from 'react-router-dom' 
import CreateWorkspaceFormContainer from './components/CreateWorkspaceForm/CreateWorkspaceFormContainer';
import Router from './Routing/Router';

class App extends Component {
  render() {
    return ( 
       <BrowserRouter>
      <div className="App">   
       <NavBar/>
       <CreateWorkspace/>

      </div> 
      </BrowserRouter>
    );
  }
}

export default App;
