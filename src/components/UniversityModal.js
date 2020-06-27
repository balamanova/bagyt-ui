import React, { Component } from "react";
import { Modal, Input } from "antd";
import EditableTable from "./EditableTable";
import { updateUniversity } from "../services/UniversityService";

const { TextArea } = Input;

class UniversityModal extends Component {
  state = {
    item: "",
    visible: true,
  };

  componentDidMount() {
    console.log(this.props.item)
    this.setState({
      item: this.props.item,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    const { item } = this.state;
    updateUniversity(item.id, item).then((res) => console.log(res));
    this.props.onDrawerChange();
  };

  onItemChange = (description, key) => {
    var { item } = this.state;
    item[key] = description;
    this.setState({
      item,
    });
  };

  render() {
    const { item } = this.state;
    const { onDrawerChange, openDrawer } = this.props;
    if (!item) {
      return <div />;
    }
    return (
      <Modal
        visible={openDrawer}
        onOk={this.handleOk}
        onCancel={onDrawerChange}
        width={800}
      >
        <div className="display-flex margin-bottom-20 ">
          <div
            className="universityImage"
            style={{ background: "url(" + item.photo + ")" }}
          />
          <p className="universityName alignSelfCenter">{item.name}</p>
        </div>
        <div className="display-flex margin-bottom-20 ">
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
        <div className="display-flex margin-bottom-20  ">
          <EditableTable
            onItemChange={(data, key) => this.onItemChange(data, key)}
            data={item.majorPoints}
          />
        </div>
      </Modal>
    );
  }
}

export default UniversityModal;
