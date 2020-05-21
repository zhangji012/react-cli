/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import tools from "@/util/tools";
import IconSearch from "../../assets/icon_search@2x.png";

console.log(222222, tools);

/** 所需的各种资源 **/
import "./index.less";

function HomePageContainer(props) {
  return (
    <div className="page-home all_nowarp">
      home
      <img src={IconSearch} />
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
