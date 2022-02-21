/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-27 16:33:16
 * @LastEditors: camus
 * @LastEditTime: 2020-12-04 22:01:10
 */
const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });
const {
  create,
  detail,
  getList,
  update,
  remove,
  addLabels,
  fileInfo
} = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middleware");

const { verifyAuth } = require("../middleware/auth.middleware");
const { verifyPermission } = require("../middleware/auth.middleware");
momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", getList);

momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);


// 给momentId对应的动态添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter;
