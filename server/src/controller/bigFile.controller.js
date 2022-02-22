const errorTypes = require("../constants/error-types");
const path = require("path");
const fse = require("fs-extra");
const { BIG_FILE_PATH } = require("../constants/file.path");

const extractExt = (filename) =>
  filename.slice(filename.lastIndexOf("."), filename.length); // 提取后缀名

// const UPLOAD_DIR = path.resolve(__dirname, "./", "target"); // 大文件存储目录

const pipeStream = (path, writeStream) =>
  new Promise((resolve) => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

// 合并切片
const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(BIG_FILE_PATH, fileHash);
  const chunkPaths = await fse.readdir(chunkDir);

  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        // 指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  );
  fse.rmdirSync(chunkDir); // 合并后删除保存切片的目录
  // 测试用，合并之后删除
  // setTimeout(() => {
  //   const fileDir = path.resolve(UPLOAD_DIR, filePath);
  //   fse.unlink(fileDir);
  // }, 2000);
};

const createUploadedList = async (fileHash) =>
  fse.existsSync(path.resolve(BIG_FILE_PATH, fileHash))
    ? await fse.readdir(path.resolve(BIG_FILE_PATH, fileHash))
    : [];

class BigFileController {
  // 合并切片
  async handleMerge(ctx, next) {
    try {
      const { size, fileHash, filename } = ctx.request.body;
      const ext = extractExt(filename);
      const filePath = path.resolve(BIG_FILE_PATH, `${fileHash}${ext}`);
      if (!fse.existsSync(filePath)) {
        ctx.body = "not found";
      }
      await mergeFileChunk(filePath, fileHash, size);
      ctx.body = { code: 0, message: "file merged success" };
      await next();
    } catch (error) {
      console.log("handleMerge error", error);
    }
  }
  // 处理切片
  async handleFormData(ctx, next) {
    try {
      // if (Math.random() < 0.1) {
      //   // 概率报错
      //   console.log("合并报错了");
      //   const error = new Error(errorTypes.WILLFUL_ERROR);
      //   return ctx.app.emit("error", error, ctx);
      // }
      const chunk = ctx.req.file;
      const { hash, filename, fileHash } = ctx.req.body;
      const chunkDir = path.resolve(BIG_FILE_PATH, fileHash);
      const filePath = path.resolve(
        BIG_FILE_PATH,
        `${fileHash}${extractExt(filename)}`
      );
      // // 文件存在直接返回
      if (fse.existsSync(filePath)) {
        ctx.body = "file exist";
      }

      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }
      // // fs-extra 专用方法，类似 fs.rename 并且跨平台
      // // fs-extra 的 rename 方法 windows 平台会有权限问题
      // // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
      await fse.move(chunk.path, path.resolve(chunkDir, hash));
      ctx.body = "received file chunk";
      await next();
    } catch (error) {
      console.log("upload chunk", error);
    }
  }
  // 验证是否已上传/已上传切片下标
  async handleVerifyUpload(ctx, next) {
    try {
      const { filename = "", fileHash = "" } = ctx.request.body;
      const ext = extractExt(filename);
      const filePath = path.resolve(BIG_FILE_PATH, `${fileHash}${ext}`);
      if (fse.existsSync(filePath)) {
        ctx.body = {
          shouldUpload: false,
        };
      } else {
        ctx.body = {
          shouldUpload: true,
          uploadedList: await createUploadedList(fileHash),
        };
      }
    } catch (error) {}
  }
}

module.exports = new BigFileController();
