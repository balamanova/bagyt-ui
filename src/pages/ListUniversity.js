import React, { Component } from "react";
import {
  getUniversities,
  getUniversityById,
} from "../services/UniversityService";
import UniversityBoxItem from "../components/UniversityBoxItem";
import { Input, Pagination } from "antd";
import { writeUniversityName, seacrh } from "../util/text";
import UniversityModal from "../components/UniversityModal";
const { Search } = Input;

class ListUniversity extends Component {
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

  componentDidMount() {
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
    const { universities, currentPage, total, openDrawer, univer } = this.state;
    const { navHided } = this.props;
    return (
      <div className = "basic-container">
        <div
          className="universityBox "
          style={{ marginLeft: navHided && "300px" }}
        >
          <Search
            placeholder={writeUniversityName}
            size="large"
            onSearch={(value) => this.onSearchChange(value)}
            onChange={(e) => this.onSearchChange(e.target.value)}
          />
          {openDrawer && (
            <UniversityModal
              openDrawer={openDrawer}
              onDrawerChange={() => this.onDrawerChange()}
              item={univer}
            />
          )}
          {universities.map((item) => (
            <UniversityBoxItem
              item={item}
              onUniversityButtonPressed={(id) =>
                this.onUniversityButtonPressed(id)
              }
            />
          ))}
        </div>
        <Pagination
          size="small"
          className = 'text-align-center'
          onChange={(page) => this.onPageChange(page)}
          pageSize={15}
          defaultCurrent={currentPage}
          total={total}
        />
      </div>
    );
  }
}

export default ListUniversity;
