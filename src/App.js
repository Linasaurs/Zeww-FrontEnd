import React, { Component } from "react";
import "./App.css";
import Routing from "./Routing/Routing";
import OmniSearch from "./components/OmniSearch/OmniSearch";

class App extends Component {
    render() {
        return (
            <div className="App">
                <OmniSearch workspaceId={12} />
            </div>
        );
    }
}

export default App;
