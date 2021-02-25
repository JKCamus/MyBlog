/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-26 12:24:57
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 09:35:17
 */
import request from './request'
/**
 * @description: 登录
 * @param {*} data
 */
export function login(data) {
  return request({
    url: "/login",
    method:'post',
    data
  });
}
