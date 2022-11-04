/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2022-02-21 16:27:06
 * @LastEditors: camus
 * @LastEditTime: 2022-02-22 11:36:20
 */
const Router = require("koa-router");
const { bigFileUploadHandle } = require("../middleware/file.middleware");

const { wiiFullError } = require("../middleware/willFullError.middleware");
const {
  handleMerge,
  handleVerifyUpload,
  handleFormData,
} = require("../controller/bigFile.controller");

const bigFileRouter = new Router();

process.on("uncaughtException", (err) => {
  console.error(err);
});

bigFileRouter.post("/verify", handleVerifyUpload);
bigFileRouter.post("/merge", handleMerge);
bigFileRouter.post(
  "/uploadChunks",
  wiiFullError,
  bigFileUploadHandle,
  handleFormData
);

module.exports = bigFileRouter;
