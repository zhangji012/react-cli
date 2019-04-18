/** 根页 - 包含了根级路由 **/

import React, { Fragment } from "react";
import { Route, Link, Redirect, Switch } from "react-router-dom";
import { Layout, Icon, Alert, Spin } from "antd";
import MainMenu from "../components/Menus";
import YXBreadcrunb from "../components/Breadcrumb";
import * as urls from "../utils/url";
import style from "./style.less";
const { Sider, Content } = Layout;
import Home from "../pages/home";

export default class RootContainer extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      showSpin: null,
      collapsed: false
    };
  }
  // 设置是否可收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  // 获取根级路由
  _getRoutes() {
    const { routes } = this.props;
    return routes.map((route, index) => {
      const Component = route.component;
      console.log("route", route);
      return (
        <Route
          key={index}
          path={route.path}
          render={props => (
            // route.path === '/' ? <Home {...props}/> :
            <Fragment>
              <YXBreadcrunb match={props} routes={routes} />
              <Component {...props} />
            </Fragment>
          )}
        />
      );
      // return (
      //   <Route
      //     key={index}
      //     path={route.path}
      //     exact={route.exact}
      //     render={(props) => {
      //       return <Component {...props}/>
      //       return route.path === '/' ? <Redirect to={urls.HOME}/> : <div>
      //         <YXBreadcrunb match={props} routes={routes}/>
      //         <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
      //           <route.component match={props}/>
      //         </Content>
      //       </div>
      //     }}
      //   />
      // )
    });
  }
  // 侧边栏
  _mainSider() {
    const { collapsed } = this.state;
    return (
      <Sider
        className={style.sidebar}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={style.logo}>
          {/*<Link className={style['to-home']} to='/'>*/}
          {/*<img src={require('../assets/logo.png')} alt='logo'/>*/}
          {/*{collapsed ? null : <span>订单中心</span>}*/}
          {/*</Link>*/}
        </div>
        <div className={style.menu}>
          <MainMenu collapsed={this.state.collapsed} />
        </div>
      </Sider>
    );
  }
  // 头部部分
  _mainHeader() {
    const { collapsed } = this.state;
    return (
      <div className={style["header"]}>
        <div className={style["header-button"]} onClick={this.toggle}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </div>
        <div className={style["left-warpper"]} />
        <div className={style["right-warpper"]} />
      </div>
    );
  }
  render() {
    const { collapsed, showSpin } = this.state;

    return (
      <div>
        <Layout className={style.layout}>
          {this._mainSider()}
          <Layout
            className={
              collapsed
                ? style["main-content-collapsed"]
                : style["main-content"]
            }
          >
            {this._mainHeader()}
            <Layout
              className={style["content"]}
              style={{ padding: "0 24px 24px" }}
            >
              <Switch>{this._getRoutes()}</Switch>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
