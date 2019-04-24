import axios from "axios"
import Cookies from 'js-cookie'

/**
 * 请求参数处理
 * @param {object} params
 */
const parseBody = (params = {}) => {

  if (Cookies.get('ticket')) {
    Cookies.set('ticket', Cookies.get('ticket'))
  }

  params = {
    ...params,
    user_ticket: Cookies.get('ticket'),
    platform: 'cyminiparams',
    version: 'XXX',
    // appchannel: 'web',
  }
  return params
}

export const request = (url, params = {}) => {
  const paramsed = Object.assign(params, { appchannel: 'web' })
  return axios({
    url,
    data: parseBody(paramsed),
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then(res => {
    const { statusCode, data } = res

    if (res.data && res.data.errCode && res.data.errCode === 2002) {
      Cookies.remove({ key: 'ticket' })
      Cookies.remove({ key: 'user_id' })
      // todo 跳转地址
    }
    if (statusCode >= 200 && statusCode < 300) {
      return data
    }
    throw new Error(`网络请求错误，状态码${statusCode}`)
  })
}
export const get = (url, params) => {
  const paramsed = Object.assign(params, { appchannel: 'web' })
  return axios({
    url,
    data: parseBody(paramsed),
  }).then(res => {
    const { statusCode, data } = res
    if (statusCode >= 200 && statusCode < 300) {
      return data
    }
    throw new Error(`网络请求错误，状态码${statusCode}`)
  })
}
