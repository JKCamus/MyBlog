/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-29 14:04:33
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 10:14:02
 */
const Router = require("koa-router");
const commentRouter = new Router({ prefix: "/comment" });
const {
  create,
  reply,
  update,
  remove,
  getList,
} = require("../controller/comment.controller");

const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/auth.middleware");

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/reply/:commentId", verifyAuth, reply);
commentRouter.patch("/:commentId", verifyAuth, verifyPermission, update);
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);
// 获取评论列表
commentRouter.get("/", getList);
module.exports = commentRouter;
