/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-07 23:21:10
 * @LastEditors: JKcamus 924850758@qq.com
 * @LastEditTime: 2023-06-24 09:39:41
 */
const Router = require("koa-router");
const photoRouter = new Router({ prefix: "/photo" });
const {
  getPhotos,
  photoInfo,
  getAllPhotos,
  clearPhotosByStatus,
  clearAllPhotos
} = require("../controller/photo.controller");
const {
  handlePhotoHandler
} = require("../middleware/file.middleware");
const { verifyAuth } = require("../middleware/auth.middleware");
const { photoHandler, photoResize } = require("../middleware/file.middleware");
const { savePhotoInfo } = require("../controller/file.controller");
const { verifyPermission } = require("../middleware/auth.middleware");

photoRouter.get("/getPhotos", getPhotos);
photoRouter.get("/getAllPhotos", getAllPhotos);
photoRouter.get("/:filename", photoInfo);

photoRouter.patch(
  "/:photoId",
  verifyAuth,
  verifyPermission,
  handlePhotoHandler,
  photoHandler,
  photoResize,
  savePhotoInfo
);
photoRouter.delete(
  "/clearPhotos",
  verifyAuth,
  clearPhotosByStatus
);

photoRouter.delete(
  "/clearAllPhotos",
  clearAllPhotos
);

module.exports = photoRouter;
