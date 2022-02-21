/*
 * @Description: 动态添加规范命名的路由
 * @version:
 * @Author: camus
 * @Date: 2020-11-26 15:51:09
 * @LastEditors: camus
 * @LastEditTime: 2020-11-27 09:57:35
 */
const fs = require("fs");

const useRoutes = (app) => {
  /* 读取当前目录下的文件，返回数组 */
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === "index.js") return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
};
module.exports = useRoutes;


