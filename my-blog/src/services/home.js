/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-08 19:42:11
 * @LastEditors: camus
 * @LastEditTime: 2020-12-26 16:01:49
 */
import request from "./request";

export function getPhotoList(page, size) {
  return request({
    // /photo/getPhotos?page=1&&size=12
    url: "/photo/getPhotos",
    params: {
      page,
      size,
    },
  });
}
export function authTest() {
  return request({
    url: "/test",
  });
}
