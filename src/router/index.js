import React, { Fragment } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createHashHistory"; // 锚点模式的history
const history = createHistory(); // 实例化history对象

import XLayout from "../pages/layout";
import routes from "./routerConf";

const RouteConfig = () => (
  <Provider store={store}>
    <Fragment>
      <Router history={history}>
        <XLayout routes={routes} />
      </Router>
    </Fragment>
  </Provider>
);
export default RouteConfig;
