/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-08 19:42:11
 * @LastEditors: camus
 * @LastEditTime: 2020-12-08 22:16:44
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
