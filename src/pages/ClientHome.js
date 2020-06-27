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
  univerityScreen,
  usersScreen,
} from "../util/text";
import logo from "../images/logo.svg";
import { Button,Spin, Input, message  } from "antd";
import { updateUniversity } from "../services/UniversityService";
import { getUniversityByUser, logout } from "../services/UserService";
import EditableTable from '../components/EditableTable'

const { TextArea } = Input;

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
          <Nav defaultSelected={usersScreen}>
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

          </Nav>
          {navHided && <Button className="logout" onClick = {() => this.onLogoutClick()}>Logout</Button>}
        </SideNav>
        {currentPage === univerityScreen && (
          <ClientHome navHided={navHided} />
        )}
      </div>
    );
  }
}

export default Home;


class ClientHome extends Component {
  state = {
  };

  componentDidMount() {
    getUniversityByUser().then(item => {
      this.setState({
        item
      })
    })
  }

  onItemChange = (description, key) => {
    var { item } = this.state;
    item[key] = description;
    this.setState({
      item,
    });
  };

  handleOk = (e) => {
    const { item } = this.state;
    updateUniversity(item.id, item).then((res) => console.log(res));
    message.info('University data successfully changed');
  };


  render() {
    const { item } = this.state;
    const {navHided} = this.props
    if(!item) {
      return <Spin />
    }
   
    return (
      <div className = 'basic-container '  style={{ marginLeft: navHided ? "300px" : "150px", marginRight: '100px' }}>
        <div className="display-flex margin-bottom-20 " >
          <div
            className="universityImage"
            style={{ background: "url(" + item.photo + ")" }}
          />
          <p className="universityName alignSelfCenter">{item.name}</p>
        </div>
        <div className="display-flex margin-bottom-20 " style={{ marginRight: '100px' }}>
          <p className="alignSelfCenter fieldName">Описание: </p>
          <TextArea
            allowClear={true}
            value={item.description}
            onChange={(e) => this.onItemChange(e.target.value, "description")}
            placeholder={item.description}
            // autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div className="display-flex margin-bottom-20  ">
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">
              Number of students:
            </p>
            <Input
              placeholder="Basic usage"
              onChange={(e) =>
                this.onItemChange(e.target.value, "numberOfStudents")
              }
              allowClear={true}
            />
          </div>
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">Number of grants:</p>
            <Input
              placeholder="Basic usage"
              onChange={(e) =>
                this.onItemChange(e.target.value, "numberOfGrants")
              }
              allowClear={true}
            />
          </div>
        </div>
        <div className="display-flex margin-bottom-20  ">
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">Telephone:</p>
            <Input
              allowClear={true}
              onChange={(e) => this.onItemChange(e.target.value, "phone")}
              width={"80px"}
              value={item.phone}
            />
          </div>
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">Email:</p>
            <Input
              allowClear={true}
              onChange={(e) => this.onItemChange(e.target.value, "email")}
              width={"100px"}
              value={item.email}
            />
          </div>
        </div>
        <div className="display-flex margin-bottom-20  ">
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">Website:</p>
            <Input
              onChange={(e) => this.onItemChange(e.target.value, "webSite")}
              allowClear={true}
              value={item.webSite}
            />
          </div>
          <div className="inline-block">
            <p className="alignSelfCenter smallFieldName">Address:</p>
            <Input
              onChange={(e) => this.onItemChange(e.target.value, "address")}
              allowClear={true}
              value={item.address}
            />
          </div>
        </div>
        <div className="display-flex margin-bottom-20 ">
          <EditableTable
            onItemChange={(data, key) => this.onItemChange(data, key)}
            data={item.majorPoints}
          />
        </div>
        <div className="display-flex margin-bottom-20 justify-flex-end" style={{ marginRight: '220px' }}>
        <Button
         
        onClick={this.handleOk}
        className="customButton "
        type="primary"
        style={{}}
      >
       Update University
      </Button>
        </div>
      </div>
    );
  }
}
