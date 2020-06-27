import React, { Component, useState } from "react";
import { Modal, Input, Form, message, Button, Spin, Alert } from "antd";
import {
  updateUniversity,
  getAllUniversity,
} from "../services/UniversityService";

import MaskedInput from "antd-mask-input";
import { deleteUser, resetPassword } from "../services/UserService";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = (props) => {
  const [passwordResetted, setVisible] = useState("");
  const { universityList, item } = props;
  var filteredUniversityList = universityList;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { name, email, msisdn } = values;

    resetPassword(item.id, {
      name,
      email,
      msisdn,
      shortCode: item.shortCode,
    }).then((res) => props.onDrawerChange());
    console.log("Received values of form: ", values);
  };

  const handleClose = () => {
    setVisible("");
  };

  const onResetButtonPressed = () => {
    resetPassword(item.id, { email: item.email });
    setVisible("Password successfully resetted. User have to check email!");
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
      {passwordResetted !== "" && (
        <Alert
          message={passwordResetted}
          style={{ margin: "20px 10px" }}
          type="success"
          closable
          afterClose={handleClose}
        />
      )}
      <Form.Item
        name={"name"}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input defaultValue={item.name} />
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
        <Input defaultValue={item.email} />
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
        <MaskedInput
          defaultValue={item.msisdn}
          mask="+7 (111) 111-11-11"
          name="card"
          size="20"
        />
      </Form.Item>
      {/* 
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
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout} style={{ textAlign: "right" }}>
        <Button
          type="primary"
          onClick={onResetButtonPressed}
          style={{
            background: "white",
            color: "#6DAD9D",
            marginRight: "10px",
            textShadow: "0 0 0 rgba(0, 0, 0, 0)",
          }}
        >
          ResetPassword
        </Button>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

class EditUserDrawer extends Component {
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
    const { universityList } = this.state;
    const { onOpenUserEditDrawer, openDrawer, item } = this.props;

    return (
      <Modal
        visible={openDrawer}
        onCancel={onOpenUserEditDrawer}
        width={500}
        footer={null}
      >
        {" "}
        {item ? (
          <RegistrationForm
            item={item}
            universityList={universityList}
            onDrawerChange={onOpenUserEditDrawer}
          />
        ) : (
          <Spin />
        )}
      </Modal>
    );
  }
}

export default EditUserDrawer;
