/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-26 11:07:01
 * @LastEditors: camus
 * @LastEditTime: 2020-11-27 15:01:48
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../app/config");
class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, //过期时间为一天，单位是秒
      algorithm: "RS256",
    });
    // ctx.body = `登录成功，欢迎${name}回来~`;
    ctx.body = { id, name, token };
  }

  async success(ctx, next) {
    ctx.body = "授权成功~";
  }
}
module.exports = new AuthController();
