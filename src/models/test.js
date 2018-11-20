/**
 * 测试页的Model 在src/store/index.js中被挂载到store上，命名为test
 * 项目中不同的大模块可以创建不同的js作为model
 * 此model中包含了用于src/pages/test模块的数据和方法
 * **/
import { message } from "antd";
// import Server from "../util/fetch-api"; // 自己封装的异步请求方法

const model = {
  /** store数据 **/
  state: {
    count: 0, // 测试数字
    fetchvalue: [] // 异步请求的测试数据
  },
  /** reducers **/
  reducers: {
    add(state, payload) {
      return { ...state, count: payload };
    },
    updateFetchApi(state, payload) {
      return { ...state, fetchvalue: payload };
    }
  },
  /** actions **/
  actions: {
    // 测试 - 数字加1
    onTestAdd(params) {
      this.add(params + 1); // 调用上面reducers中的add方法
    },

  }
};

export default model;
