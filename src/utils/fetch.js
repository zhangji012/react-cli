// import storage from '../utils/storage'
import axios from "axios";
// process.env.NODE_ENV 可以根据这个来判断baseUrl是在什么环境下的
let baseUrl = "";
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

let fetcher = axios.create({
  method: "post",
  baseURL: baseUrl,
  withCredentials: "include",
  transformRequest: [
    function(data) {
      return JSON.stringify(data);
    }
  ],
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
});

fetcher.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

fetcher.interceptors.response.use(
  function(response) {
    if (
      response.data.code === 89001 ||
      response.data.code === 81001 ||
      response.data.code === 2
    ) {
      // window.location.href = lgoinUrl
    }
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

let fetch = fetcher.post;
export { fetch };
