/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-07 23:22:17
 * @LastEditors: JKcamus 924850758@qq.com
 * @LastEditTime: 2023-06-24 12:54:12
 */
const fs = require("fs");
const fileService = require("../service/file.service");
const { PHOTO_PATH } = require("../constants/file.path");
const path = require("path");

class PhotoController {
  async getPhotos(ctx, next) {
    try {
      const { size, page } = ctx.query;
      if (!size || !page) throw new Error();
      const result = await fileService.getPhotoList(page, size);
      ctx.set("Cache-Control", "public,max-age=120");
      ctx.body = result;
    } catch (error) {
      console.log("PhotoController.create", error);
    }
  }
  async photoInfo(ctx, next) {
    try {
      let { filename } = ctx.params;
      const fileInfo = await fileService.getFilePhotoByUrl(filename);
      if (!fileInfo) throw new Error();
      // console.log("fileInfo", fileInfo);
      const { type } = ctx.query;
      const types = ["small", "middle", "large"];
      if (types.some((item) => item === type)) {
        filename = filename + "-" + type;
      }
      ctx.response.set("content-type", fileInfo.mimetype);
      ctx.set("Cache-Control", "public,max-age=60");
      ctx.body = fs.createReadStream(`${PHOTO_PATH}/${filename}`);
    } catch (error) {
      console.log("PhotoController.fileInfo", error);
    }
  }
  async getAllPhotos(ctx, next) {
    try {
      const { size, page } = ctx.query;
      if (!size || !page) throw new Error();
      const result = await fileService.getAllPhotoList(page, size);
      ctx.body = result;
    } catch (error) {
      console.log("PhotoController.getAllPhotos", error);
    }
  }

  static delPhotos = async (result) => {
    console.log("res=>", readDir);
    let readDir = fs.readdirSync(PHOTO_PATH);
    const filenameSet = new Set(result.map((item) => item.filename));
    for (let del of readDir) {
      if (filenameSet.has(del)) {
        // console.log("del", path.resolve(PHOTO_PATH, `${del}-large`));
        fs.unlink(path.resolve(PHOTO_PATH, `${del}-large`), (err) => {
          if (err) throw err;
        });
        fs.unlink(path.resolve(PHOTO_PATH, `${del}-small`), (err) => {
          if (err) throw err;
        });
        fs.unlink(path.resolve(PHOTO_PATH, `${del}-middle`), (err) => {
          if (err) throw err;
        });
        fs.unlink(path.resolve(PHOTO_PATH, del), (err) => {
          if (err) throw err;
        });
      }
    }
  };

  async clearPhotosByStatus(ctx, next) {
    try {
      const result = await fileService.getClearPhotoList();
      let readDir = fs.readdirSync(PHOTO_PATH);
      const filenameSet = new Set(result.map((item) => item.filename));
      for (let del of readDir) {
        if (filenameSet.has(del)) {
          // console.log("del", path.resolve(PHOTO_PATH, `${del}-large`));
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-large`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-small`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-middle`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, del), (err) => {
            if (err) throw err;
          });
        }
      }
      await fileService.clearPhotoList();
      ctx.body = "清除成功";
    } catch (error) {
      console.log("PhotoController.clearPhotos", error);
    }
  }

  // debug service
  async clearAllPhotos(ctx, next) {
    try {
      const result = await fileService.getAllPhotosFileName();

      let readDir = fs.readdirSync(PHOTO_PATH);
      const filenameSet = new Set(result.map((item) => item.filename));
      for (let del of readDir) {
        if (filenameSet.has(del)) {
          // console.log("del", path.resolve(PHOTO_PATH, `${del}-large`));
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-large`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-small`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, `${del}-middle`), (err) => {
            if (err) throw err;
          });
          fs.unlink(path.resolve(PHOTO_PATH, del), (err) => {
            if (err) throw err;
          });
        }
      }
      await fileService.clearAllPhotoList();
      ctx.body = "所有清除成功";
    } catch (error) {
      console.log("PhotoController.clearAllPhotos", error);
    }
  }
}

module.exports = new PhotoController();
