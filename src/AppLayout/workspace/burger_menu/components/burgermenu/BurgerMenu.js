import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";

class BurgerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("Burger Menu :")
    console.log(this.props.CurrentWorkspace)
    return (
      <>
        <div className="Ziad">
          <h1>Ziad</h1>
        </div>
        <div className="burger-menu-div-ul">
          <ul className="burger-menu-ul">
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleFilesContainer()}
            >
              Files
            </li>
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleViewChannelDetails()}
            >
              Channel Details
            </li>
            <li
              className="burger-menu-li"
              onClick={() => this.props.toggleAddUserToChannel()}
            >
              Add member to Channel
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/ChangeWorkspaceName/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Change Workspace Name
              </Link>
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/ChangeWorkspaceUrl/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Change Workspace URL
              </Link>
            </li>
            <li className="burger-menu-li">
              <Link
                to={{ pathname: `/SetDefaultWorkspaceHours/${this.props.CurrentWorkspace.Id}`, CurrentWorkspace: this.props.CurrentWorkspace }}>
                Set Default Workspace Hours
               </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default BurgerMenu;
