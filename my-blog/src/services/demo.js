/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-12 21:21:28
 * @LastEditors: camus
 * @LastEditTime: 2021-01-12 21:22:48
 */
import request from "./request";
export function getDemoList(page, size) {
  return request({
    url: "demo/getDemoList",
    params: {
      page,
      size,
    },
  });
}
