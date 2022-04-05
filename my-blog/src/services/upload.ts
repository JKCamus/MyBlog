import request from "./request";
import axios from "axios";
const CancelToken = axios.CancelToken;

interface IVerify {
  filename: string;
  fileHash: string;
}

export const verifyUploadTest = ({ filename, fileHash }: IVerify) =>
  request({
    url: "/verify",
    headers: {
      "content-type": "application/json",
    },
    method: "post",
    data: JSON.stringify({ filename, fileHash }),
  });

export const uploadChunksTest = (params: FormData, { onUploadProgress, onCancel }) => {
  return request({
    url: "/uploadChunks",
    method: "POST",
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
    cancelToken: new CancelToken((c) => onCancel(c)),
  });
};

export const mergeChunks = (data) => {
  return request({
    url: "/merge",
    headers: {
      "content-type": "application/json",
    },
    method: "post",
    data: JSON.stringify(data),
  });
};
