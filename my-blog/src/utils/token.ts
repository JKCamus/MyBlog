/*
 * @Description:Token相关方法
 * @version:
 * @Author: camus
 * @Date: 2020-12-28 20:44:51
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 09:09:28
 */
import axios from "axios";
export function setToken(userInfo) {
  localStorage.setItem("USER", JSON.stringify(userInfo));
  localStorage.setItem("TOKEN_EXPIRE", `${new Date().getTime() + 3600000*23}`);
}
export function removeToken() {
  localStorage.removeItem("TOKEN");
  localStorage.removeItem("TOKEN_EXPIRE");
  delete axios.defaults.headers.common["Authorization"];
}
export function getToken () {
  return axios.defaults.headers.common['Authorization']
}

export function getUerInfo(){
  const userInfoString = localStorage.getItem("USER");
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    return userInfo
  }
  return undefined
}
