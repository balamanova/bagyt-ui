import React, { Component, useState } from "react";
import {
  Select,
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Form,
  Input,
} from "antd";

import {
  getUniversities,
  getUniversityById,
} from "../services/UniversityService";
import AddUserDrawer from "../components/AddUserDrawer";
import { getUniversityAdmins } from "../services/UserService";
import UserTable from "../components/UserTable";

class ListUser extends Component {
  state = {
    universities: [],
    searchText: "",
    currentPage: 1,
    openDrawer: false,
    total: 0,
  };

  getUniversities = () => {
    const { searchText, currentPage } = this.state;
    getUniversities(currentPage, searchText)
      .then((res) => {
        this.setState({
          universities: res["universityList"],
          total: res["totalSize"],
        });
      })
      .catch((error) => console.log(error));
  };

  getUniversityAdmins = () => {
    getUniversityAdmins()
      .then((users) => {
        this.setState({
          users,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getUniversityAdmins();
    this.getUniversities();
  }

  onSearchChange = (searchText) => {
    this.setState(
      {
        searchText,
        currentPage: 1,
      },
      () => this.getUniversities()
    );
  };

  onPageChange = (currentPage) => {
    this.setState(
      {
        currentPage,
      },
      () => this.getUniversities()
    );
  };

  onDrawerChange = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  onUniversityButtonPressed = async (id) => {
    await getUniversityById(id)
      .then((res) => {
        console.log("res", res);
        this.setState({
          univer: res,
          openDrawer: true,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { users, openDrawer, onOpenUserEditDrawer } = this.state;
    const { navHided } = this.props;
    return (
      <div
        className="basic-container"
        style={{ marginLeft: navHided && "300px" }}
      >
        <AddUserDrawer
          openDrawer={openDrawer}
          onDrawerChange={() => this.onDrawerChange()}
        />
        <Button
          onClick={() => this.onDrawerChange()}
          className="customButton"
          type="primary"
        >
          Add users
        </Button>

        <div>
          <UserTable
            data={users}
            refreshData={() => this.getUniversityAdmins()}
          />
        </div>
      </div>
    );
  }
}

export default ListUser;
