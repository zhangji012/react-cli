/** APP入口 **/
import React from "react";
import ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import MainRouter from "./router";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(<MainRouter/>, document.getElementById("app-root"));

registerServiceWorker();

if (module.hot) {
  module.hot.accept();
}
