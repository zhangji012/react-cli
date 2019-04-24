/** APP入口 **/
// import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
// todo  typescript的配置还有问题， yarn dll现在会报错
import * as serviceWorker from "./serviceWorker";
import Root from "./root";

/** 公共样式 **/
import "./styles/css.css";
import "./styles/less.less";

ReactDOM.render(<Root />, document.getElementById("app-root"));

serviceWorker.register();

if (module.hot) {
  module.hot.accept();
}
