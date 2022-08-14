import React, { useEffect, useState } from "react";
import { Upload, message, Progress, Table, Button } from "antd";
import { asyncRetry } from "utils/asyncRetry";

import styled from "styled-components";
const { Dragger } = Upload;
import { InboxOutlined } from "@ant-design/icons";
import { isNaN } from "lodash";
import { verifyUploadTest, mergeChunks, uploadChunksTest } from "services/upload";
import axios from "axios";
import classnames from "classnames";
import { useUpdateEffect } from "ahooks";

const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading",
  error: "error",
  done: "done",
};
interface IChunk {
  // 切片源文件
  chunk: Blob;
  // hash值，用来标识文件的唯一性
  hash: string;
  // 文件名
  fileName: string;
  // 请求进度
  percentage: number;
  // 下标，标记哪些分片包已上传完成
  index: number;
  // abort上传请求
  cancel: () => void;
  status: typeof Status;
}

const SIZE = 20 * 1024 * 1024; // 切片大小

const UploadDemo: React.FC = (props) => {
  const [status, setStatus] = useState(Status);
  const [fileList, setFileList] = useState([]);
  const [container, setContainer] = useState<any>({
    file: null,
    hash: "",
    worker: null,
  });
  const [hashPercentage, setHashPercentage] = useState(0);
  const [fileChunkList, setFileChunkList] = useState<any[]>([]);
  const [requestList, setRequestList] = useState([]);
  const [fakeStatus, setFakeStatus] = useState(Status.wait);
  const [fakeUploadPercentage, setFakeUploadPercentage] = useState(0);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [resumeDisabled, setResumeDisabled] = useState(false);
  const [uploaded, setUploaded] = useState([])

  useEffect(() => {
    const disabled = !container.file || [Status.pause, Status.uploading].includes(fakeStatus);
    setUploadDisabled(disabled);
  }, [container.file, Status]);

  useEffect(() => {
    if (!container.file || !fileChunkList?.length) {
      setUploadPercentage(0);
    }
    const loaded = fileChunkList
      .map((item) => item.size * item.percentage)
      .reduce((acc, cur) => acc + cur, 0);
    const percentage = parseInt((loaded / container.file?.size).toFixed(2), 10);
    isNaN(percentage) && setUploadPercentage(percentage);
    const doneChunks = fileChunkList.filter(({ status }) => status === Status.done);
    const fileChunksLen = fileChunkList.length;

    if (fileChunksLen > 0 && doneChunks.length === fileChunksLen) {
      const fileOption = {
        fileName: container?.file?.name,
        fileHash: container?.hash,
      };
      asyncRetry(() => mergeRequest(fileOption), { errorMessage: "重试3次后合并失败!" });
    }
  }, [fileChunkList]);

  useUpdateEffect(() => {
    if (fakeUploadPercentage < uploadPercentage) {
      setFakeUploadPercentage(uploadPercentage);
    }
  }, [uploadPercentage]);

  const handlePause = () => {
    setFakeStatus(Status.pause);
    resetData();
  };

  const resetData = () => {
    if (fileChunkList) {
      fileChunkList.forEach((chunkItem) => {
        chunkItem?.cancel && chunkItem.cancel(chunkItem.hash);
      });
      if (container.worker) {
        setContainer({ ...container, worker: { ...container?.worker, onmessage: null } });
      }
    }
  };

  const handleResume = async () => {
    setFakeStatus(Status.uploading);
    const { shouldUpload, uploadedList = [] } = await verifyUpload({
      filename: container.file.name,
      fileHash: container.hash,
    });
    if (shouldUpload !== undefined && !shouldUpload) {
      message.success("秒传：上传成功");
      setFakeStatus(Status.wait);
      setResumeDisabled(true);
      return;
    }
    const fileOption = {
      fileName: container.file.name,
      fileHash: container.hash,
    };
    await uploadChunks(uploadedList, fileOption, fileChunkList);
  };

  // 生成文件切片
  const createFileChunk = (file, size = SIZE) => {
    const chunkList = [];
    let cur = 0;
    while (cur < file.size) {
      chunkList.push({ file: file.slice(cur, cur + size) });
      cur += size;
    }
    return chunkList;
  };

  const calculateHashSampleTest = (file) => {
    let timeStart = 0
    return new Promise((resolve) => {
      const workerHash = new Worker("/hashSample.js");
      setContainer({ ...container, worker: workerHash });
      console.log('fire',file)
    // workerHash.postMessage(file);

      const fileReader = new FileReader()
      fileReader.onload = function(e){
      console.log('start===>', (new Date()).getTime())

        workerHash.postMessage(e.target.result,[e.target.result])
    // timeStart = (new Date()).getTime()
    }

    const blobSlice = File.prototype.slice
    fileReader.readAsArrayBuffer(blobSlice.call(file,0,file.size))
    timeStart = (new Date()).getTime()
      workerHash.onmessage = (e) => {
        const { percentage, hash } = e.data;
        console.log('total time: ',hash,(new Date()).getTime()-timeStart)

        setHashPercentage(parseInt(percentage.toFixed(2), 10));
        if (hash) {
          resolve(hash);
        }
      };
    });
  };

  const handleUpload = async (option: any) => {
    const file = option.file as File;
    if (!file) return;
    setFakeStatus(Status.uploading);
    const hash = await calculateHashSampleTest(file);

    const chunkList = createFileChunk(file);

    const { shouldUpload, uploadedList } = await verifyUpload({
      filename: file.name,
      fileHash: hash,
    });

    if (!shouldUpload) {
      message.success("秒传：上传成功");
      setResumeDisabled(true);
      setFakeStatus(Status.wait);
      return;
    }
    setUploaded(uploadedList)
    // hash 可以不要在这边写，在uploadChunk里面写
    const chunkData = chunkList.map(({ file }, index) => ({
      key: hash + "-" + index,
      fileHash: hash,
      index,
      hash: hash + "-" + index,
      chunk: file,
      size: file.size,
      fileName: file.name,
      percentage: uploadedList.includes(index) ? 100 : 0,
    }));
    setContainer({ ...container, hash: hash, file: file });
    const fileOption = {
      fileName: file.name,
      fileHash: hash,
    };
    await uploadChunks(uploadedList, fileOption, chunkData);
  };

  // 上传切片，同时过滤已上传的切片
  const uploadChunks = async (uploadedList = [], fileOption, chunkData) => {
    const updateChunk = chunkData.map((chunk) => ({
      ...chunk,
      percentage: uploadedList.includes(chunk.hash) ? 100 : 0,
    }));
    console.log("chunkData", chunkData);
    console.log("uploadedList", uploadedList);
    if (chunkData.length === uploadedList.length) {
      setFileChunkList(updateChunk);
      await mergeRequest(fileOption);
      return;
    }

    const requests = updateChunk
      .filter(({ hash }) => !uploadedList.includes(hash))
      .map((item) => {
        const { chunk, hash, index } = item;
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("hash", hash);
        formData.append("filename", fileOption.fileName);
        formData.append("fileHash", fileOption.fileHash);
        return { formData, index, status: Status.wait, retryNum: 0 };
      });
    await controlRequest(requests, updateChunk);
  };
  /**
   * @description: 请求并发控制，错误重试
   * @param {*} requests
   * @param {*} chunkData
   * @param {*} limit
   */
  const controlRequest = async (requests, chunkData, limit = 3) => {
    return new Promise<number>((resolve) => {
      const len = requests.length;
      let counter = 0;
      let max = limit;
      const start = async () => {
        while (counter < len && max > 0) {
          max--;
          const requestData = requests.find(
            (r) => r.status === Status.wait || (r.status === Status.error && r.retryNum <= 2)
          );
          if (!requestData) continue;
          requestData.status = requestData.status = Status.uploading;
          const formData = requestData.formData;
          const index = requestData.index;
          // 任务不能仅仅累加获取，而是要根据状态
          // wait和error的可以发出请求 方便重试
          // const cancelToken = createCancelAction(chunkData[index]);
          const onCancel = (cancel) => {
            chunkData[index].cancel = cancel;
          };
          const onUploadProgress = createProgressHandler(chunkData, index);
          // uploadChunksTest1(formData, { cancelToken, onUploadProgress })
          uploadChunksTest(formData, { onUploadProgress, onCancel })
            .then(() => {
              requestData.status = Status.done;
              chunkData[index].status = Status.done;

              max += 1;
              counter += 1;
              if (counter === len) {
                resolve(counter);
              } else {
                start();
              }
            })
            .catch((error) => {
              if (!axios.isCancel(error)) {
                console.log("重试~~~~", error);
                max += 1;
                requestData.status = Status.error;
                chunkData[index].percentage = 0;
                if (typeof requestData["retryNum"] !== "number") {
                  requestData["retryNum"] = 0;
                }
                requestData["retryNum"] += 1;
                if (requestData["retryNum"] > 2) {
                  counter++; // 把当前切块 3 次失败后，当做是成功了，不再重试发送了
                  chunkData[index].percentage = -1; // 更改上传失败进度条
                  chunkData[index].status = Status.error;
                }
                setFileChunkList(chunkData);
                start();
              }
            });
        }
      };
      start();
    });
  };

  // 创建每个chunk上传的progress监听函数
  const createProgressHandler = (chunkData, index: number) => {
    return (e) => {
      setFileChunkList(() => {
        const newChunkList = [...chunkData];
        if (newChunkList[index]) {
          newChunkList[index].percentage = parseInt(String((e.loaded / e.total) * 100), 10);
          return newChunkList;
        }
      });
    };
  };
  const handleChange = () => {
    setResumeDisabled(false);
    resetData();
    setFileList([]);
    setFileChunkList([]);
  };

  const mergeRequest = async (fileOption) => {
    const mergeData = { size: SIZE, fileHash: fileOption.fileHash, filename: fileOption.fileName };
    setResumeDisabled(true);
    // eslint-disable-next-line no-useless-catch
    try {
      await mergeChunks(mergeData);
      message.success("上传成功");
      setFakeStatus(Status.wait);
    } catch (error) {
      setResumeDisabled(false);
      throw error;
    }
  };

  // 根据 hash 验证文件是否曾经已经被上传过
  // 没有才进行上传
  const verifyUpload = async ({ filename, fileHash }): Promise<any> => {
    const res = await verifyUploadTest({ filename, fileHash });
    return res;
  };

  const onDrop = () => {
    // console.log('Dropped files', e.dataTransfer.files);
  };

  const cubeClass = (chunk: IChunk) => {
    const val = chunk.percentage;
    switch (true) {
      case val > 0 && val < 100:
        return "uploading";
      case val < 0:
        return "error";
      case val === 100:
        return "success";
      default:
        break;
    }
  };

  return (
    <div>
      <UploadWrapper>
        <Dragger
          name="file"
          multiple
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
          onDrop={onDrop}
          customRequest={handleUpload}
          fileList={fileList}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or
            other band files
          </p>
        </Dragger>
        <div className="btn-group">
          <Button onClick={handlePause}>暂 停</Button>
          <Button disabled={resumeDisabled} type="primary" onClick={handleResume}>
            恢复/重试
          </Button>
        </div>
      </UploadWrapper>
      <span>计算hash进度：</span>
      <Progress percent={hashPercentage} />
      <span>上传切片进度：</span>
      <Progress percent={fakeUploadPercentage} />
      <UploadShowWrapper>
        <div
          className="cube-container"
          style={{ width: `${Math.ceil(Math.sqrt(fileChunkList.length)) * 22}px` }}
        >
          {fileChunkList.map((chunk, index) => (
            <span
              className={classnames(cubeClass(chunk), "cube")}
              key={chunk.key}
              style={{ height: `${chunk.percentage}%` }}
            >
              {index}
            </span>
          ))}
        </div>
        {/* <div className="ant-table">
          <Table
            size="small"
            columns={columns}
            dataSource={fileChunkList}
            scroll={{ x: 150, y: 300 }}
            pagination={false}
          ></Table>
        </div> */}
      </UploadShowWrapper>
    </div>
  );
};

export default UploadDemo;

const UploadWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  .btn-group {
    margin-left: 20px;
  }
`;

const UploadShowWrapper = styled.div`
  margin-top: 20px;
  /* display: flex; */
  .ant-table {
    flex: 1;
  }
  .cube-container {
    width: 100px;
    overflow: hidden;
    color: #67c23a;
  }

  .cube {
    width: 22px;
    height: 20px;
    line-height: 20px;
    border: 1px solid black;
    background: #eee;
    float: left;
    text-align: center;
    box-sizing: border-box;
    &.success {
      background: #67c23a;
    }

    &.uploading {
      background: #409eff;
    }

    &.error {
      background: #f56c6c;
    }
  }
`;
