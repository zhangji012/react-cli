import React, { Component } from 'react'
import { Layout, Icon, Alert, Spin } from 'antd'
import {
  Link,
  Route,
  Redirect
} from 'react-router-dom'
import AppMenu from 'Components/Menus'
import * as urls from 'Contants/url'
import YXBreadcrunb from 'Components/Breadcrumb'
import style from './style.css'

const { Sider, Content } = Layout

export let showSpin = null

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSpin: null,
      collapsed: false
    }
    showSpin = this.setSpin
  }

  // 设置是否可收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  // 设置全局加载
  setSpin = (showSpin) => {
    this.setState({ showSpin })
  }

  // 拓展时用
  selectMenu() {
    let pathName = decodeURI(location.pathname)
    let menuName = this.getMenuName(pathName)
    switch (menuName) {
      case 'App':
        return <AppMenu match={this.props.match} selectedMenu={this.props.selectedMenu}
                        collapsed={this.state.collapsed}/>
      default :
        return <AppMenu match={this.props.match} selectedMenu={this.props.selectedMenu}
                        collapsed={this.state.collapsed}/>
    }
  }

  getMenuName(pathName) {
    if (!pathName || pathName === '/') return ''
    let reg = new RegExp(/\/(\b\w*\b)/)
    let matchName = pathName.match(reg)[1]
    let name = matchName.split('')
    name = name[0].toUpperCase() + name.slice(1).join('')
    return name
  }

  render() {
    const { routes } = this.props
    const { collapsed, showSpin } = this.state
    return (
      <Layout className={style.layout}>
        <Sider className={style.sidebar}
               trigger={null}
               collapsible
               collapsed={collapsed}>
          <div className={style.logo}>
            <Link className={style['to-home']} to='/'>
              <img src={require('../assets/logo.png')} alt='logo'/>
              {collapsed ? null : <span>后台管理</span>}
            </Link>
          </div>
          <div className={style.menu}>
            {this.selectMenu()}
          </div>
        </Sider>
        <Layout className={collapsed ? style['main-content-collapsed'] : style['main-content']}>
          {(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
            ? '' : <Alert message='请使用google chrome浏览器使用系统' banner closable/>}
          <div className={style['header']}>
            <div className={style['header-button']} onClick={this.toggle}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
            </div>
            <div className={style['left-warpper']}>
            </div>
            <div className={style['right-warpper']}>
            </div>
          </div>
          <Layout className={style['content']} style={{ padding: '0 24px 24px' }}>
            {
              routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(match) => {
                      return route.path === '/' ? <Redirect to={urls.HOME}/> : <div>
                        <YXBreadcrunb match={match} routes={routes}/>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                          <route.component match={match}/>
                        </Content>
                      </div>
                    }}
                  />
                )
              })
            }
          </Layout>
        </Layout>
        {
          showSpin && showSpin.bool ? (
            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '2000' }}>
              <Spin tip={showSpin.content}
                    style={{ position: 'absolute', top: '50%', width: '100%' }}
                    size='large'/>
            </div>) : null
        }
      </Layout>
    )
  }
}

export default MainLayout

