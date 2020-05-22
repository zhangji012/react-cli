/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
import tools from "@/util/tools";
import IconSearch from "../../../assets/icon_search@2x.png";
import IconSearch2 from "@/assets/icon_search@2x.png";


console.log(222222, tools);

/** 所需的各种资源 **/
import "./index.less";

function CeshiTs(props: any) {
  return (
    <div className="page-home all_nowarp">
      测试Typescript使用
      <img src={IconSearch} />
      <img src={IconSearch2} />
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
)(CeshiTs);
