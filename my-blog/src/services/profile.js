/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-05 21:10:55
 * @LastEditors: camus
 * @LastEditTime: 2021-02-08 09:56:26
 */
import request from "./request";
/**
 * @description: 上传照片墙图片
 */
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
/**
 * @description: 更新照片墙图片
 */
export function updatePhoto(data) {
  return request({
    url: `/photo/${data.get('id')}`,
    method: "patch",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
/**
 * @description: 清空状态为0的图片
 */
export function deletePhotos() {
  return request({
    url: "/photo/clearPhotos",
    method: "delete",
  });
}
/**
 * @description: 查notes列表
 * @param {*} page
 * @param {*} size
 */
export function getDemoList(page, size) {
  return request({
    url: "/demo/getDemoList",
    params: {
      page,
      size,
    },
  });
}
/**
 * @description: 上传notes列表
 * @param {*} data
 */
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

/**
 * @description: 更新照片墙图片
 */
export function updateNote(data) {
  return request({
    url: `/demo/${data.get('id')}`,
    method: "patch",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
}
/**
 * @description: 清空状态为0的列表
 */
export function clearNotes() {
  return request({
    url: "/demo/clearNotes",
    method: "delete",
  });
}
