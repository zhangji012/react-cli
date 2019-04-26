/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import tools from "@/util/tools";
console.log(111111111, tools);

/** 所需的各种资源 **/
import "./index.less";

function HomePageContainer(props) {
  return (
    <div className="page-home all_nowarp">
      info
    </div>
  );
}

export default connect(
  state => {
    return {};
  },
  dispatch => ({
    actions: {}
  })
)(HomePageContainer);
