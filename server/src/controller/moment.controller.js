/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-11-27 16:35:38
 * @LastEditors: camus
 * @LastEditTime: 2020-12-08 13:38:59
 */
const fs = require("fs");
const { PICTURE_PATH } = require("../constants/file.path");
const fileService = require("../service/file.service");
const momentService = require("../service/moment.service");
class MomentController {
  async create(ctx, next) {
    // ctx.body="创建动态成功"
    const userId = ctx.user.id;
    const content = ctx.request.body.content;
    const result = await momentService.create(userId, content);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }
  async getList(ctx, next) {
    const { page, size } = ctx.query;
    const result = await momentService.getMomentList(page, size);
    ctx.body = result;
  }
  async update(ctx, next) {
    try {
      const { momentId } = ctx.params;
      const { content } = ctx.request.body;
      const result = await momentService.update(content, momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }
  async remove(ctx, next) {
    try {
      const { momentId } = ctx.params;
      const result = await momentService.remove(momentId);
      ctx.body = result;
    } catch (error) {
      console.log("", error);
    }
  }
  async addLabels(ctx, next) {
    try {
      const { labels } = ctx;
      const { momentId } = ctx.params;
      for (let label of labels) {
        const isExist = await momentService.hasLabel(momentId, label.id);
        if (!isExist) {
          await momentService.addLabels(momentId, label.id);
        }
      }
    } catch (error) {
      console.log("MomentController.addLabels", error);
    }
  }
  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params;
      const fileInfo = await fileService.getFileByFilename(filename);
      if (!fileInfo) throw new Error();
      // console.log("fileInfo", fileInfo);
      const { type } = ctx.query;
      const types = ["small", "middle", "large"];
      if (types.some((item) => item === type)) {
        filename = filename + "-" + type;
      }
      ctx.response.set("content-type", fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    } catch (error) {
      console.log("MomentController.fileInfo", error);
    }
  }
}
module.exports = new MomentController();
