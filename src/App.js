import React, { Component } from "react";
import "./App.css";
import CreateWorkspace from "./components/CreateWorkspaceLayout/CreateWorkspace";
import NavBar from "./components/NavBar/NavBar";
import ModalLayout from "./components/ModalLayout/ModalLayout";
import CreateNewChannel from "./components/CreateNewChannelModal/CreateNewChannel";

class App extends Component {
    render() {
        return (
            <div className="App">
                <CreateNewChannel workspaceId="1" />
            </div>
        );
    }
}

export default App;
