/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-05 16:05:06
 * @LastEditors: camus
 * @LastEditTime: 2020-12-05 16:07:52
 */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径

module.exports = override(
  // 按需加载 antd
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // 添加加载 less 的 javascriptEnabled 和 antd 的主题配置。
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#1DA57A" },
    },
  }),
  addWebpackAlias({
    "@": resolve("src"),
    components: resolve("src/components"),
    pages: resolve("src/pages"),
    common: resolve("src/common"),
    services: resolve("src/services"),
  })
);
