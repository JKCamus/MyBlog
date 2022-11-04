/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-11 13:30:35
 * @LastEditors: camus
 * @LastEditTime: 2021-02-08 09:52:37
 */
const Router = require("koa-router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { demoFieldsHandle } = require("../middleware/file.middleware");

const {
  saveDemoInfo,
  getDemoList,
  clearNotes,
} = require("../controller/demo.controller");
const { verifyPermission } = require("../middleware/auth.middleware");

const demoRouter = new Router({ prefix: "/demo" });

demoRouter.post("/uploadDemo", verifyAuth, demoFieldsHandle, saveDemoInfo);
demoRouter.patch(
  "/:demoId",
  verifyAuth,
  verifyPermission,
  demoFieldsHandle,
  saveDemoInfo
);

demoRouter.get("/getDemoList", getDemoList);

demoRouter.delete("/clearNotes", verifyAuth, clearNotes);
module.exports = demoRouter;
