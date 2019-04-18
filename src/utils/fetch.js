// import storage from '../utils/storage'
import axios from 'axios'
import { baseUrl, baseUrl2 } from './index'

let fetcher = axios.create({
  method: 'post',
  baseURL: baseUrl,
  withCredentials: 'include',
  transformRequest: [function (data) {
    return JSON.stringify(data)
  }],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

fetcher.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
  if (response.data.code === 89001 || response.data.code === 81001 || response.data.code === 2) {
    // window.location.href = lgoinUrl
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})

/* 订单分析下面3个页面使用另外的后端接口 */
let fetcher2 = axios.create({
  // method: 'post',
  baseURL: baseUrl2,
  withCredentials: 'include',
  transformRequest: [function (data) {
    return JSON.stringify(data)
  }],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

fetcher2.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher2.interceptors.response.use(function (response) {
  if (response.data.code === 89001 || response.data.code === 81001 || response.data.code === 2) {
    // window.location.href = lgoinUrl
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})

let fetch = fetcher.post
// let fetch2 = fetcher2.post
export { fetch, fetcher2 }
