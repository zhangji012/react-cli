/** APP入口 **/
import "babel-polyfill";   // 兼容到ie9
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Root from "./container/routers";

ReactDOM.render(<Root />, document.getElementById("app-root"));

serviceWorker.register();

if (module.hot) {
  module.hot.accept();
}
