/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-25 09:45:51
 * @LastEditors: camus
 * @LastEditTime: 2020-11-26 10:23:13
 */
const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");
/**
 * @description: 验证中间件
 * @param {*} ctx
 * @param {*} next  这个没有，跳不到下一个中间件，并且不会报错
 * @return {*}
 * @author: camus
 */
const verifyUser = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;
  // 2.判断用户名或者密码不能为空
  if (!name || !password || name.length === 0 || password.length === 0) {
    /* 抽出声明的错误常量 */
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    /* 发射错误事件，'error'为发射错误的类型，后面为携带的参数 */
    return ctx.app.emit("error", error, ctx);
  }
  // 3.判断该用户名未被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  //   只有调用这个next下一个中间件才会运行，使用await是因为下一个中间件也可能是
  // 异步操作，所以要拿到后面异步请求的结果，需要await
  await next();
};
/**
 * @description: 密码加密中间件，采用md5加密
 * @param {*} ctx
 * @param {*} next
 * @return {*}
 * @author: camus
 */
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = {
  verifyUser,
  handlePassword,
};
