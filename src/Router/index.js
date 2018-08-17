import React from 'react'
// import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import * as urls from '../contants/url'
import XLayout from '../models/layout'
import Home from '../models/Home'
import IndustrialAmount from '../models/OperatingReport/IndustrialAmount'// 产品消费金额
import JCBCount from '../models/OperatingReport/PlatformBase/JCBCount'// 游戏币统计

const routes = [
  {
    path: '/',
    redirect: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.INDUSTRIAL_AMOUNT,
    exact: true,
    component: IndustrialAmount,
    breadcrumbName: '产业消费金额',
    parentPath: urls.HOME
  },
  {
    path: urls.JCB_COUNT,
    exact: true,
    component: JCBCount,
    breadcrumbName: '游戏币统计',
    parentPath: urls.HOME
  },
]

const RouteConfig = () => (
  <Router>
    <Switch>
      <XLayout routes={routes}>
      </XLayout>
    </Switch>
  </Router>
)

export default RouteConfig
