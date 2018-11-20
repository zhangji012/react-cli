/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
// import classNames from "classnames";
import P from "prop-types";

/** 所需的各种资源 **/
// import ImgLogo from "../../assets/react-logo.jpg";

@connect(
  state => ({}),
  model => ({
    actions: {}
  })
)
export default class HomePageContainer extends React.Component {
  static propTypes = {
    location: P.any,
    history: P.any,
    actions: P.any
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        1-3
      </div>
    );
  }
}
