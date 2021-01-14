/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-08 19:42:11
 * @LastEditors: camus
 * @LastEditTime: 2021-01-14 22:15:45
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
export function getAllPhotoList(page, size) {
  return request({
    url: "/photo/getAllPhotos",
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


// export function getUserAvatar(id) {
//   return request({
//     url: `/users/${id}/avatar`,
//     method: "get",
//   });
// }
