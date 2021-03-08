import axios from "axios";
import { message } from "antd";
// 接口相关，未上传git
import { BASE_URL, TIMEOUT } from "./config";

import {} from 'utils/token';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});
/**
 * @description: 请求拦截
 */
instance.interceptors.request.use(
  (config) => {
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件

    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面

    // 3.params/data序列化的操作
    const userInfoString = localStorage.getItem("USER");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      config.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (err) => {
    console.log('res=>', err)
  }
);
/**
 * @description: 响应拦截
 */
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err && err.response) {
      err.response.data && message.error(err.response.data);
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权访问");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    // 不是直接返回err而是需要返回Promise包装的err
    // 否则try catch不能捕捉，且，await等待错误之后为一个错误对象，即try catch失效
    return Promise.reject(err);
  }
);

export default instance;
