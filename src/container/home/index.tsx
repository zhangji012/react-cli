/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import tools from "@/util/tools";
console.log(222222, tools);

/** 所需的各种资源 **/
import "./index.less";

function HomePageContainer(props:any) {
  return (
    <div className="page-home all_nowarp">
      home
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
