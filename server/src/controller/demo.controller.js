/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-01-11 13:36:25
 * @LastEditors: camus
 * @LastEditTime: 2021-04-29 19:43:34
 */
const fs = require("fs");
const DemoService = require("../service/demo.service");
const { DEMO_FILE_PATH } = require("../constants/file.path");
const path = require("path");

class DemoController {
  async saveDemoInfo(ctx, next) {
    try {
      const userId = ctx.user.id;
      const files = ctx.req.files;
      const { title, preview, status, htmlName, id } = ctx.req.body;
      if (id) {
        const imgFilename = files.image && files.image[0].filename;
        const imgMimetype = files.image && files.image[0].mimetype;
        let htmlFilename = "";
        if (files.htmlContent) {
          htmlFilename = files.htmlContent && files.htmlContent[0].filename;
        } else {
          htmlFilename = ctx.req.body.htmlName || "";
        }
        const updateData = {
          id,
          title,
          preview,
          status,
          imgFilename,
          imgMimetype,
          htmlFilename,
        };
        await DemoService.updateDemo(updateData);
        ctx.body = "Update Note Success~";
      } else {
        const { filename: imgFilename, mimetype: imgMimetype } = files.image[0];
        const htmlFilename = files.htmlContent && files.htmlContent[0].filename;
        const result = await DemoService.createDemoInfo(
          userId,
          title,
          preview,
          status,
          imgFilename,
          imgMimetype,
          htmlFilename
        );
        ctx.body = "Create Note success~";
      }
      // 所有图片上传需要再做一层判断，判断是否是是jpg等图像文件
    } catch (error) {
      console.log("DemoController.saveDemoInfo", error);
    }
  }
  //? 转存为buffer版本，但是会造成跨域渲染iframe 不好弄
  // async getDemoList(ctx, next) {
  //   try {
  //     const { size, page } = ctx.query;
  //     if (!size || !page) throw new Error();
  //     const res = await DemoService.getDemoList(page, size);
  //     const result = res.map((item) => {
  //       return {
  //         ...item,
  //         htmlContent: `${Buffer.from(item.htmlContent)}`,
  //       };

  //     });
  //     ctx.body = await result;
  //   } catch (error) {
  //     console.log("DemoService.getDemoList", error);
  //   }
  // }
  async getDemoList(ctx, next) {
    try {
      const { size, page } = ctx.query;
      if (!size || !page) throw new Error();
      const res = await DemoService.getDemoList(page, size);
      const result = res.map((item) => {
        const htmlContent =
          item.htmlName &&
          fs.readFileSync(`./uploads/demoFiles/${item.htmlName}`, "utf8");
        return {
          ...item,
          htmlContent: htmlContent || "",
          htmlUrl: item.htmlName ? item.htmlUrl : "",
        };
      });
      ctx.set("Cache-Control", "public,max-age=120");
      ctx.body = await result;
    } catch (error) {
      console.log("DemoService.getDemoList", error);
    }
  }
  async clearNotes(ctx, next) {
    try {
      const { clearHtml, clearStatus } = await DemoService.getClearNotesList();
      let readDir = fs.readdirSync(DEMO_FILE_PATH);
      const clearHtmlArr = [];
      clearHtml.forEach((item) => {
        clearHtmlArr.push(item.htmlName);
        clearHtmlArr.push(item.filename);
      });
      const clearStatusArr = [];
      clearStatus.forEach((item) => {
        clearStatusArr.push(item.htmlName);
        clearStatusArr.push(item.filename);
      });
      const htmlNameSet = new Set([...clearHtmlArr]);
      const statusClearSet = new Set([...clearStatusArr]);
      for (let del of readDir) {
        if (!htmlNameSet.has(del)) {
          // console.log("del", del);
          // console.log("del", path.resolve(DEMO_FILE_PATH, `${del}`));
          fs.unlink(path.resolve(DEMO_FILE_PATH, `${del}`), (err) => {
            if (err) throw err;
          });
        }
        if (statusClearSet.has(del)) {
          fs.unlink(path.resolve(DEMO_FILE_PATH, `${del}`), (err) => {
            if (err) throw err;
          });
        }
      }
      // await fileService.clearPhotoList();
      const result = await DemoService.clearNotes();
      ctx.body = "清除成功";
    } catch (error) {
      console.log("PhotoController.clearPhotos", error);
    }
  }
}
module.exports = new DemoController();
