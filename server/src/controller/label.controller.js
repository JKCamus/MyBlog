/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-02 13:58:29
 * @LastEditors: camus
 * @LastEditTime: 2020-12-02 14:24:04
 */
const LabelService = require("../service/label.service");
class LabelController {
  async create(ctx, next) {
    try {
      const { name } = ctx.request.body;
      const result = await LabelService.create(name);
      ctx.body = result;
    } catch (error) {
      console.log("LabelController.create", error);
    }
  }

  async getList(ctx, next) {
    try {
      const { size, page } = ctx.query;
      if(!size||!page)throw new Error()
      const result = await LabelService.getList(page, size);
      ctx.body = result;
    } catch (error) {
      console.log("LabelController.create", error);
    }
  }
}
module.exports = new LabelController();
