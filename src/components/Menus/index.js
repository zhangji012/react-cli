/**
 * Created by yiming on 2017/6/20.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import * as urls from '../../contants/url'
import classNames from 'classnames'
import Style from './style.css'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      data: []
    }
  }

  getMenuItemClass(str) {
    const pathName = decodeURI(location.pathname)
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

  async componentWillMount() {
    this.setState({
      data: [
        { key: 'home', value: '首页', icon: 'home', url: 'urls.HOME', 'children': null },
        {
          key: 'operating_report', value: '运营报表', icon: 'area-chart',
          children: [
            { key: 'platform_base', value: '平台基础数据', icon: 'area-chart',
              children: [
                { key: 'jcb_count', value: '游戏币统计', icon: 'pay-circle-o', url: 'urls.JCB_COUNT', 'children': null },
              ]
            },
            { key: 'industrial_amount', value: '产业消费金额', icon: 'pay-circle-o', url: 'urls.INDUSTRIAL_AMOUNT', 'children': null },
          ]
        },
      ]
    })
  }

  render() {
    let { data } = this.state
    const loop = (data = []) => data.map((item) => {
      if (item.children) {
        return <SubMenu key={item.key} title={<span className={Style.ellip}><Icon type={item.icon}/><span
        title={item.value}>{item.value}</span></span>}>
          {loop(item.children)}</SubMenu>
      }
      return <MenuItem key={item.key} className={this.getMenuItemClass(urls[item.url.split('.')[1]])}>
        <Link to={urls[item.url.split('.')[1]]} className={Style.ellip}><Icon type={item.icon}/><span title={item.value}>{item.value}</span></Link>
      </MenuItem>
    })
    const menusData = loop(data)
    return menusData.length > 0 ? <Menu
      theme='dark'
      mode={this.state.mode}
      selectedKeys={[this.props.selectedMenu]}
      style={{ border: 'none' }}
      >
      {menusData}
    </Menu> : null
  }
}

export default MamsMenu
