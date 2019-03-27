import React, { Component } from "react";
import "./App.css";
import Routing from "./Routing/Routing";
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
