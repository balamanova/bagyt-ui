import React from "react";
import { Table, Input, Button, message, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import EditUserDrawer from "../components/EditUserDrawer";
import { deleteUser } from "../services/UserService";

export default class UserTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    openUserEditDrawer: false,
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onEditLinkClicked = (editingItem) => {
    console.log("editingItem ", editingItem);
    this.setState(
      {
        editingItem,
      },
      () => this.onOpenUserEditDrawer()
    );
  };
  onDeleteButtonPressed = (id) => {
    deleteUser(id).then((res) => {
      this.props.refreshData();
    });
    message.success("User successfully deleted");
    // props.onDrawerChange()
  };
  onOpenUserEditDrawer = () =>
    this.setState({ openUserEditDrawer: !this.state.openUserEditDrawer });

  render() {
    const { data } = this.props;
    const { openUserEditDrawer, editingItem } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
        ...this.getColumnSearchProps("email"),
      },
      {
        title: "Telephone",
        dataIndex: "msisdn",
        key: "password",
        width: "20%",
        ...this.getColumnSearchProps("msisdn"),
      },
      {
        title: "University",
        dataIndex: "universityName",
        key: "universityName",
        ...this.getColumnSearchProps("universityName"),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <a onClick={() => this.onEditLinkClicked(record)}>Edit</a>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => this.onDeleteButtonPressed(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a href="javascript:;">Delete</a>
          </Popconfirm>
        ),
      },
    ];
    return (
      <div>
        <EditUserDrawer
          item={editingItem}
          openDrawer={openUserEditDrawer}
          onOpenUserEditDrawer={() => this.onOpenUserEditDrawer()}
        />
        <Table columns={columns} dataSource={data} rowKey={"id"} />
      </div>
    );
  }
}
