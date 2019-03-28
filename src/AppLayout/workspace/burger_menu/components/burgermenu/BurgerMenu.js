import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";

class BurgerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
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
            <Link
              className="burger-menu-li"
              to={`/ChangeWorkspaceName/${this.props.CurrentWorkspace.Id}`}
            >
              Change Workspace Name
            </Link>
          </ul>
        </div>
      </>
    );
  }
}

export default BurgerMenu;
