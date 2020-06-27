import React from "react";

import loginBackground from "../images/login-background.svg";
import LoginForm from "../components/LoginForm";
//import logo from "../images/logo.svg";

class Login extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div
        className="login-form"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        {/* <img className="imageDiv" src={logo} alt="Logo" /> */}
        <LoginForm history={history} />
      </div>
    );
  }
}

export default Login;
