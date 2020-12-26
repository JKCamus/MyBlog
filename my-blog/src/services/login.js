/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-26 12:24:57
 * @LastEditors: camus
 * @LastEditTime: 2020-12-26 12:37:48
 */
import request from './request'

export function login(data) {
  return request({
    // /photo/getPhotos?page=1&&size=12
    url: "/login",
    method:'post',
    data
  });
}
