/**
 * @Author: zhangji
 * @Date: 2017-10-31 10:28:38
 * @Title: mock 数据
 */
import Mock from 'mockjs'

// 登陆接口
// 登入
Mock.mock('/api/login.json', {
  code: 0,
  data: true,
  accessToken: 'asdasfaefefafassf',
  message: '登陆成功'
})
// 登出
Mock.mock('/api/logout.json', {
  code: 0,
  data: true,
  message: '登出成功'
})
/* 店铺营业统计 */
Mock.mock('/api/echarts1.json', {
  code: 0,
  data: {
    yAxis: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
    series: ['18203', '23489', null, undefined, '131744', '630230']
  },
  message: '登出成功'
})
// bar2
Mock.mock('/api/echarts2.json', {
  code: 0,
  data: {
    yAxis: ['印尼', '美国', '中国', '世界人口(万)', '巴西', '印度'],
    series: [23489, 29034, 131744, 630230, 18203, 104970],
  },
  message: '登出成功'
})
// bar3
Mock.mock('/api/echarts3.json', {
  code: 0,
  data: {
    yAxis: ['印尼', '印度', '巴西', '中国', '世界人口(万)', '美国'],
    series: [23489, 104970, 18203, 131744, 630230, 29034],
  },
  message: '登出成功'
})
// table1
Mock.mock('/api/table1.json', {
  code: 0,
  data: {
    result: [
      {
        'sequence': 1,
        'card': 'v 进空间看剧看得见考虑经常考虑将来可操作性剧看了场',
        'card1': 1,
        'card2': 1,
        'card3': undefined,
        'card4': null,
        'card5': 1,
        'card6': 1,
        'card7': 1,
      },
      {
        'sequence': 2,
        'card': 2,
        'card1': 3,
        'card2': 2,
        'card3': 2,
        'card4': 2,
        'card5': 2,
        'card6': 2,
        'card7': 2,
      }
    ],
    rows: 30,
  },
  message: '登出成功'
})
// table2
Mock.mock('/api/table2.json', {
  code: 0,
  data: {
    result: [
      {
        'sequence': 1,
        'card': 1,
        'card1': 1,
        'card2': 1,
        'card3': 1,
        'card4': 1,
        'card5': 1,
        'card6': 1,
        'card7': 1,
      },
      {
        'sequence': 2,
        'card': 2,
        'card1': 3,
        'card2': 2,
        'card3': 2,
        'card4': 2,
        'card5': 2,
        'card6': 2,
        'card7': 2,
      }
    ],
    rows: 30,
  },
  message: '登出成功'
})
// table3
Mock.mock('/api/table3.json', {
  code: 0,
  data: {
    result: [
      {
        'sequence': 1,
        'card': 1,
        'card1': 1,
        'card2': 1,
        'card3': 1,
        'card4': 1,
        'card5': 1,
        'card6': 1,
        'card7': 1,
      },
      {
        'sequence': 2,
        'card': 2,
        'card1': 3,
        'card2': 2,
        'card3': 2,
        'card4': 2,
        'card5': 2,
        'card6': 2,
        'card7': 2,
      }
    ],
    rows: 30,
  },
  message: '登出成功'
})
// table4
Mock.mock('/api/table4.json', {
  code: 0,
  data: {
    result: [
      {
        'sequence': 1,
        'card': 1,
        'card1': 1,
        'card2': 1,
        'card3': 1,
        'card4': 1,
        'card5': 1,
        'card6': 1,
        'card7': 1,
      },
      {
        'sequence': 2,
        'card': 2,
        'card1': 3,
        'card2': 2,
        'card3': 2,
        'card4': 2,
        'card5': 2,
        'card6': 2,
        'card7': 2,
      }
    ],
    rows: 30,
  },
  message: '登出成功'
})
