/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-05 21:10:55
 * @LastEditors: camus
 * @LastEditTime: 2021-01-09 21:05:24
 */
import request from "./request";

export function uploadPhoto(data) {
  return request({
    url: "/upload/upLoadPhoto",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
export function deletePhotos() {
  return request({
    url: "/photo/clearPhotos",
    method: "delete",
  });
}
