/*
 * @Description:负责注册接口，验证接口，具体逻辑在controller里面

 * @version:
 * @Author: camus
 * @Date: 2020-11-24 19:59:38
 * @LastEditors: camus
 * @LastEditTime: 2020-12-03 21:29:08
 */
const Router = require("koa-router");
const { create,avatarInfo } = require("../controller/user.controller");
const userRouter = new Router({ prefix: "/users" });

const { verifyUser,handlePassword } = require("../middleware/user.middleware");

// userRouter.post("/", (ctx, next) => {
//   ctx.body = "创建用户成功";
// });
// 可以直接从controller中获取具体逻辑放入请求中
/**
 * @description: 接收post请求，第二个参数为中间件，可以作为验证
 * @param {*}
 * @return {*}
 * @author: camus
 */
userRouter.post("/", verifyUser,handlePassword, create);
// 获取用户头像
userRouter.get('/:userId/avatar', avatarInfo);


module.exports = userRouter;
