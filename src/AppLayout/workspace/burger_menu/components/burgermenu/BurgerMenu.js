import React , {Component} from 'react';
import './BurgerMenu.css'


class BurgerMenu extends Component {
    constructor(props) {
      super(props);

      this.state = {
      }
    }

    render() {
      return (
       <>
        <div className="burger-menu-div-ul">
        <div className="User"></div>
            <ul className="burger-menu-ul">
                <li className="burger-menu-li" onClick={()=>this.props.toggleFilesContainer()}>
                Files
                </li>
                <li className="burger-menu-li" onClick={()=>this.props.toggleViewChannelDetails()}>
                    Channel Details
                </li>
                <li className="burger-menu-li" onClick={()=>this.props.toggleAddUserToChannel()}>
                    Add member to Channel
                </li>
            </ul>
        </div>
        
       </>
      );
    }
  }

  export default BurgerMenu;