import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./Antd.css";
import { Home, Login, ClientHome } from "./pages";
import AuthenticatedRoute from './components/AuthenticatedRoute'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <AuthenticatedRoute path="/client" exact component={ClientHome} />
      </Switch>
    </Router>
  );
}

export default App;
