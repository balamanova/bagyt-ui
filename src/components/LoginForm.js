import React, { useState } from "react";
import "antd/dist/antd.css";

import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  LOGIN,
  LOGIN_FAILED,
  PASSWORD,
} from "../util/text";
import { layout, tailLayout } from "../util/styleConstants";
import logo from "../images/logo.svg";
import {authenticate, registerSuccessfulLoginForJwt, isUserAdmin} from '../services/UserService'

const LoginForm = (props) => {
  const [form] = Form.useForm();
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  const loginSubmit = (email, password) => {
    authenticate({email, password})
      .then(response => {
        registerSuccessfulLoginForJwt(
          email,
          response.jwttoken,
          response.authorities[0].authority,
        );
        
        if(isUserAdmin()) {
          props.history.push(`/home`)
        } else {
          props.history.push(`/client`)
        }
      })
      .catch(() => {
        setShowSuccessMessage(false)
        setHasLoginFailed(true)
      });
  };

  const onFinish = (values) => {
    loginSubmit(values.email, values.password);
  };

  return (
    <Form
      {...layout}
      // onValuesChange = {onValuesChange}
      form={form}
      name="register"
      onFinish={onFinish}
    >
      <div className="text-align-center">
        <img className="imageDiv" src={logo} alt="Logo" />
      </div>
      {hasLoginFailed && <div className="loginFailed">{LOGIN_FAILED}</div>}
      <Form.Item
        name="email"
        // label="Email"
        className="width-350"
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
        <Input
          className="border-radius-15 "
          prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder={"E-mail"}
        />
      </Form.Item>
      <Form.Item
        name="password"
        className="width-350"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          className="border-radius-15"
          placeholder={PASSWORD}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button
          htmlType="submit"
          className="border-radius-15 login-form-button"
        >
          {LOGIN}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
