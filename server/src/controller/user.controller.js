/*
 * @Description:user的具体处理逻辑
 * @version:
 * @Author: camus
 * @Date: 2020-11-24 21:11:40
 * @LastEditors: camus
 * @LastEditTime: 2021-01-11 14:33:55
 */
const service = require("../service/user.service");
const fileService = require("../service/file.service");
const {AVATAR_PATH} =require('../constants/file.path')
const fs = require("fs");
/**
 * @description: 创建一个类，里面有一个对象方法，可以在router里直接使用
 * @param {*}
 * @return {*}
 * @author: camus
 */
class UserController {
  /* 用于异步操作数据库 */
  async create(ctx, next) {
    /* 获取用户参数 */
    /* 这边的user为通过koa-bodyparser库解析后放入中间件中的*/
    const user = ctx.request.body;
    /* 查询数据 */
    const result = await service.create(user);
    // 返回数据
    ctx.body = result;
  }
  async avatarInfo(ctx, next) {
    try {
      // 通过用户id获取对应头像
      const { userId } = ctx.params;
      const avatarInfo = await fileService.getAvatarByUserId(userId);
      // 设置图片信息，避免浏览器当文件直接下载
      ctx.response.set("content-type", avatarInfo.mimetype);
      // 返回图片信息
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    } catch (error) {
      console.log("UserController.avatarInfo", error);
    }
  }
}
module.exports = new UserController();
