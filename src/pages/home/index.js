/** 主页 **/

/** 所需的各种插件 **/
import React from "react";
import { connect } from "react-redux";
// import classNames from "classnames";
import P from "prop-types";

/** 所需的各种资源 **/
import css from "./index.less";
// import ImgLogo from "../../assets/react-logo.jpg";
import axios from "axios";

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
  componentDidMount() {
    axios({
      method: "post",
      url: "/user/12345",
      data: {
        firstName: "Fred",
        lastName: "Flintstone"
      }
    });
  }
  render() {
    return <div className={css.home}>home111111111122222233333</div>;
  }
}
