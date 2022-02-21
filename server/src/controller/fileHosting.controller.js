/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-13 09:18:50
 * @LastEditors: camus
 * @LastEditTime: 2021-01-13 09:27:24
 */
const fs = require("fs");

class FileHostingController {
  async fileInfo(ctx, next) {
    try {
      let { filename, folder } = ctx.params;
      ctx.response.set("content-type","text/html" );
      const path = `./uploads/${folder}`;
      ctx.body = fs.createReadStream(`${path}/${filename}`);
    } catch (error) {
      console.log("ImageController.imageInfo", error);
    }
  }
}
module.exports = new FileHostingController();
