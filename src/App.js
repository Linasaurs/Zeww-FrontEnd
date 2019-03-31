import React, { Component } from "react";
import "./App.css";
import Routing from "./Routing/Routing";
import EditProfile from "./AppLayout/workspace/burger_menu/components/UserProfile/EditProfile/EditProfile";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Routing /> 
               
            </div> 
        );
    }
}

export default App;
