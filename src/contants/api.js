/**
 * @Author: zhangji
 * @Date: 2017-10-31 10:34:47
 * @Title: 接口调用
 */

import { fetch } from 'Util/fetch'
import { baseUrl } from 'Util'
import { message } from 'antd'
import { showSpin } from 'Models/layout'
// 获取数据类接口
export const Fetch = (url, params) => {
  // showSpin({ bool: true, content: '正在加载数据....' })
  return fetch(url, params).then(
    res => {
      if (res.code === 0) {
        showSpin()
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}

// 保存类接口
export const FetchSave = (url, params) => {
  // showSpin({ bool: true, content: '正在加载数据....' })
  return fetch(url, params).then(
    res => {
      if (res.code === 0) {
        showSpin()
        message.success(res.errmsg, 2)
        return res.data
      } else {
        showSpin()
        message.error(res.errmsg, 2)
      }
    },
    err => {
      showSpin()
      message.error(err.errmsg, 2)
    }
  )
}

export default {
  platLogin: {
    ssoLogin: {
      getMenu(params) { // 列表
        return Fetch('/order-api/sso/getMenu', params)
      },
    }
  },
  OperatingReport: { // 运营报表
    PlatformBase: { // 平台基础数据
      JCBCount: { // 游戏币统计
        tableData(params) { // 列表
          return Fetch('/order-api/report/coin', params)
        },
        echartsData(params) { // 列表
          return Fetch('/order-api/report/coin/nonsort', params)
        },
        export(params) { // 导出
          return `${baseUrl}/order-api/report/coin/export?cycle=${params.cycle}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`
        },
      },
    },
    getIndustryInfos(params) { // 产业 列表
      return Fetch('/order-api/report/industry/getIndustryInfos', params)
    },
    IndustrialAmount: { // 产业金额
      tableData(params) { // 列表
        return Fetch('/order-api/report/industry/statisticsPading', params)
      },
      echartsData(params) { // 列表
        return Fetch('/order-api/report/industry/statistics', params)
      },
      export(params) { // 导出
        return `${baseUrl}/order-api/report/industry/export?industryNo=${params.industryNo}&dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`
      },
    },
    IndustrialASum: { // 产业金额汇总
      list(params) { // 列表
        return Fetch('/order-api/report/industry/summary', params)
      },
    }
  },
}
