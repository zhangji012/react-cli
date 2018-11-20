import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import * as urls from '../../utils/url'
import classNames from 'classnames'
import Style from './style.less'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

export default class MainMenu extends React.PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      data: [
        { key: 'home', value: '首页', icon: 'home', url: 'urls.HOME', 'children': null },
        {
          key: 'first', value: '1', icon: 'area-chart',
          children: [
            { key: 'first_first', value: '1-1', icon: 'pay-circle-o', url: 'urls.First_First', 'children': null },
            { key: 'first_second', value: '1-2', icon: 'bank', url: 'urls.First_Second', 'children': null },
            { key: 'first_third', value: '1-3', icon: 'bank', url: 'urls.First_Third', 'children': null },
            { key: 'first_four', value: '1_4', icon: 'area-chart',
              children: [
                { key: 'first_four_first', value: '1_4_1', icon: 'pay-circle-o', url: 'urls.First_Four_First', 'children': null },
              ]
            },
          ]
        },
      ]
    };
  }
  getMenuItemClass(str) {
    const pathName = decodeURI(location.pathname)
    // todo 这个地方在仔细看下
    if (str !== urls.HOME) {
      return classNames({
        'ant-menu-item-selected': new RegExp(str + '$').test(pathName)
      })
    }
    return classNames({
      'ant-menu-item-selected': pathName === str
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline'
    })
  }
  menusData() {
    let { data } = this.state
    const loop = (data = []) => data.map((item) => {
      if (item.children) {
        const subTitle = (<span className={Style.ellip}>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </span>)
        return <SubMenu key={item.key} title={subTitle}>
          {loop(item.children)}
        </SubMenu>
      }
      return <MenuItem key={item.key} className={this.getMenuItemClass(urls[item.url.split('.')[1]])}>
        <Link to={urls[item.url.split('.')[1]]} className={Style.ellip}>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </Link>
      </MenuItem>
    })
    return loop(data)
  }
  render() {
    const menusData = this.menusData()
    return (
      menusData.length > 0 ? <Menu
        theme='dark'
        mode={this.state.mode}
        style={{ border: 'none' }}
      >
        {menusData}
      </Menu> : null
    );
  }
}