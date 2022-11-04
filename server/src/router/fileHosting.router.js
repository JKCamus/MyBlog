/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-13 09:16:27
 * @LastEditors: camus
 * @LastEditTime: 2021-01-13 09:20:28
 */
const Router = require("koa-router");
const {fileInfo}=require('../controller/fileHosting.controller')

const fileHostingRouter = new Router({ prefix: "/fileHosting" });

fileHostingRouter.get("/:folder/:filename", fileInfo);

module.exports = fileHostingRouter;
