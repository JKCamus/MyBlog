/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-11 22:29:27
 * @LastEditors: camus
 * @LastEditTime: 2021-01-11 22:41:21
 */
const Router = require("koa-router");
const {imageInfo}=require('../controller/image.controller')
const imageRouter = new Router({ prefix: "/image" });

imageRouter.get("/:folder/:filename", imageInfo);

module.exports = imageRouter;
