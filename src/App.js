import React, { Component } from 'react';
import './App.css';
import CreateWorkspace from './components/CreateWorkspaceLayout/CreateWorkspace';
import NavBar from './components/NavBar/NavBar';
import ModalLayout from './components/ModalLayout/ModalLayout';

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <ModalLayout/>
      </div>
    );
  }
}

export default App;
