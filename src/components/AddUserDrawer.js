import React, { Component, useState } from "react";
import { Modal, Input, Form, Select, Button, Spin, Alert } from "antd";
import {
  updateUniversity,
  getAllUniversity,
} from "../services/UniversityService";

import MaskedInput from "antd-mask-input";
import { createUniversityAdmin } from "../services/UserService";
import { formItemLayout, tailFormItemLayout } from "../util/styleConstants";

const { Option } = Select;

const RegistrationForm = (props) => {
  const { universityList } = props;
  var filteredUniversityList = universityList;
  const [visible, setVisible] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { name, email, msisdn, universityId } = values;
    setButtonLoading(true)
    createUniversityAdmin({
      name,
      email,
      msisdn,
      university: {
        _id: universityId,
      },
    }).then((res) => props.onDrawerChange()
    ).catch(err => {
      setVisible(true);
    }).finally(()=>  setButtonLoading(false))
    ;
    console.log("Received values of form: ", values);
  };
  const handleClose = () => {
    setVisible(false);
  };

  if (!filteredUniversityList) {
    return <Spin className="spinnerStyle" size="large" />;
} 

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      className="margin-right-30"
      scrollToFirstError
    >
     {visible ? (
        <Alert
        className="margin-20"
        message="Такой e-mail уже существует" type="error" closable afterClose={handleClose} />
      ) : null}
      <Form.Item
        name={"name"}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="msisdn"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <MaskedInput mask="+7 (111) 111-11-11" name="card" size="20" />
      </Form.Item>

      <Form.Item
        name="universityId"
        label="University"
        rules={[
          {
            required: true,
            message: "Please input website!",
          },
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select university"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {filteredUniversityList.map((item) => (
            <Option value={item._id}>{item.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout} style={{ textAlign: "right" }}>
        <Button type="primary" htmlType="submit" loading = {buttonLoading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

class UniversityModal extends Component {
  state = {
    item: "",
    visible: true,
  };

  componentDidMount() {
    getAllUniversity().then((data) =>
      this.setState({
        universityList: data,
      })
    );
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
    const { item, universityList } = this.state;
    const { onDrawerChange, openDrawer } = this.props;
    // if (!item) {
    //   return <div />;
    // }
    return (
      <Modal
        visible={openDrawer}
        // onOk={this.handleOk}
        onCancel={onDrawerChange}
        width={500}
        footer={null}
      >
        {/* <div className="justify-center margin-bottom-20 "> */}
        <RegistrationForm
          universityList={universityList}
          onDrawerChange={onDrawerChange}
        />
        {/* </div> */}
      </Modal>
    );
  }
}

export default UniversityModal;
