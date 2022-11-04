/*
 * @Description:登录验证中间件
 * @version:
 * @Author: camus
 * @Date: 2020-11-26 11:04:11
 * @LastEditors: camus
 * @LastEditTime: 2021-02-07 17:43:20
 */
const { PUBLIC_KEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");
const authService = require("../service/auth.service");
/**
 * @description: 登录验证
 * @param {*} async
 * @param {*} next
 * @return {*}
 * @author: camus
 */
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户是否存在,
  const result = await service.getUserByName(name);
  const user = result[0];
  // 与注册接口区分，这边需要判断不存在，抛出异常
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 4.判断密码是否一致（加密后），将当前的密码也做加密并和数据库中的对比
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};
/**
 * @description: 通过携带的token判断是否有权限，另一种理解是登录过
 * @param {*} ctx
 * @param {*} next
 * @return {*}
 * @author: camus
 */
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 1. 获取token,没有token返回错误
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.NOT_LOGGED);
    return ctx.app.emit("error", error, ctx);
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log("err", err);
    const error = new Error(errorTypes.UNAUTHORIZED);
    ctx.app.emit("error", error, ctx);
  }
};
/**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */
const verifyPermission = async (ctx, next) => {
  console.log("鉴权middleware");
  // 获取参数{commentId:'10'}
  // console.log('ssssbody',  ctx.req)
  const [resourceKey] = Object.keys(ctx.params);
  // 规范命名后，可以获取表名。表名+Id就是这个信息的id

  const tableName = resourceKey.replace("Id", "");
  const resourceId = Number(ctx.params[resourceKey]);

  const { id } = ctx.user;
  try {
    const IsPermission = await authService.checkResource(
      tableName,
      resourceId,
      id
    );
    // 避免代码冗余，直接抛出异常，会进入catch
    if (!IsPermission) throw new Error();
    await next();
  } catch (error) {
    const err = new Error(errorTypes.UN_PERMISSION);
    return ctx.app.emit("error", err, ctx);
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
