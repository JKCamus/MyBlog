/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-05 21:10:55
 * @LastEditors: camus
 * @LastEditTime: 2021-01-16 21:21:22
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
export function getDemoList(page, size) {
  return request({
    url: "/demo/getDemoList",
    params: {
      page,
      size,
    },
  });
}

export function uploadNotes(data) {
  return request({
    url: "/demo/uploadDemo",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
export function clearNotes() {
  return request({
    url: "/demo/clearNotes",
    method: "delete",
  });
}
