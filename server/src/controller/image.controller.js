/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-11 22:31:07
 * @LastEditors: camus
 * @LastEditTime: 2021-01-11 22:58:19
 */
const fs = require("fs");


class ImageController {
  async imageInfo(ctx, next) {
    try {
      let { filename, folder } = ctx.params;
      ctx.response.set("content-type","image/jpeg" );
      const path = `./uploads/${folder}`;
      ctx.body = fs.createReadStream(`${path}/${filename}`);
    } catch (error) {
      console.log("ImageController.imageInfo", error);
    }
  }
}
module.exports = new ImageController();
