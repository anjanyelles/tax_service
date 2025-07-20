import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import Login from "views/Authentication/Login";
import Newlogin from "views/Authentication/Newlogin";

// Add console log for debugging
console.log("App loading...", window.location.pathname);

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      {/* <Route path="/" component={Login} /> */}
      <Route path="/" component={Newlogin} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Switch>
  </BrowserRouter>
);

// Ensure DOM is ready before rendering
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  });
} else {
  ReactDOM.render(<App />, document.getElementById("root"));
}