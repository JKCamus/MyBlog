/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-26 10:59:33
 * @LastEditors: camus
 * @LastEditTime: 2020-11-27 14:50:54
 */
const Router = require("koa-router");

const authRouter = new Router();
const { login, success } = require("../controller/auth.controller");

const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

authRouter.post("/login", verifyLogin, login);
/* 权限测试路由，token有效则返回成功，失败返回无效token */
authRouter.get("/test", verifyAuth, success);
module.exports = authRouter;
