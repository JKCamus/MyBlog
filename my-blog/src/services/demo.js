/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-12 21:21:28
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 11:05:54
 */
import request from "./request";
/**
 * @description: 获取notes列表
 * @param {*} page
 * @param {*} size
 */
export function getDemoList(page, size) {
  return request({
    url: "demo/getDemoList",
    params: {
      page,
      size,
    },
  });
}
