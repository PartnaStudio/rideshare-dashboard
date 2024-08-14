import React from "react";
import ReactDOM from "react-dom";
import {Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={`/admin`} component={AdminLayout} />
      <Redirect from={`/`} to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
