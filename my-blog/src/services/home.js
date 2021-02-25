/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-08 19:42:11
 * @LastEditors: camus
 * @LastEditTime: 2021-02-25 09:34:58
 */
import request from "./request";

/**
 * @description: 获取gallery展示照片
 * @param {*} page
 * @param {*} size
 */
export function getPhotoList(page, size) {
  return request({
    url: "/photo/getPhotos",
    params: {
      page,
      size,
    },
  });
}
/**
 * @description: 获取全部照片
 * @param {*} page
 * @param {*} size
 */
export function getAllPhotoList(page, size) {
  return request({
    url: "/photo/getAllPhotos",
    params: {
      page,
      size,
    },
  });
}
/**
 * @description: 权限测试
 */
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
