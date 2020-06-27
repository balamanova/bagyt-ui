import React, { Component } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {
  universities,
  users,
  univerityScreen,
  usersScreen,
} from "../util/text";
import logo from "../images/logo.svg";
import ListUniversity from "./ListUniversity";
import ListUser from "./ListUser";
import { Button } from "antd";
import {logout} from '../services/UserService'

class Home extends Component {
  state = {
    navHided: false,
    currentPage: univerityScreen,
  };

  onNavToogle = () => this.setState({ navHided: !this.state.navHided });
  onPageChanged = (eventKey) => {
    this.setState({ currentPage: eventKey });
  };

  onLogoutClick = () => {
    logout();
    this.props.history.push('')
  }

  render() {
    const { navHided, currentPage } = this.state;
    return (
      <div>
        <SideNav
          className="sideNav"
          onToggle={() => this.onNavToogle()}
          onSelect={(eventKey, event) => {
            this.onPageChanged(eventKey);
          }}
        >
          <Toggle />
          <Nav defaultSelected={univerityScreen}>
            {navHided && <img className="imageDiv" src={logo} alt="Logo" />}
            <NavItem eventKey={univerityScreen}>
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>{universities}</NavText>
            </NavItem>
            <NavItem eventKey={usersScreen}>
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>{users}</NavText>
            </NavItem>
          </Nav>
          {navHided && <Button className="logout" onClick = {() => this.onLogoutClick()}>Logout</Button>}
        </SideNav>
        {currentPage === univerityScreen ? (
          <ListUniversity navHided={navHided} />
        ) : (
          <ListUser navHided={navHided} />
        )}
      </div>
    );
  }
}

export default Home;
