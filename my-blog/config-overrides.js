/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2020-12-05 16:05:06
 * @LastEditors: camus
 * @LastEditTime: 2020-12-06 16:29:29
 */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require("customize-cra");
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径
// const customizeImageLoader  = () => config  => {
//   console.log('config', config)
//   config.module.rules[2].oneOf.push({
//       test:  [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//       loader: 'file-loader'
//   });
//   return config;
// }
// "start": "react-app-rewired start",

module.exports = override(
  // myOverrides(config,env),
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
      // modifyVars: { "@primary-color": "#1DA57A" },
      modifyVars: { "@primary-color": "#43a3ef" },
    },
  }),
  addWebpackAlias({
    "@": resolve("src"),
    components: resolve("src/components"),
    pages: resolve("src/pages"),
    common: resolve("src/common"),
    services: resolve("src/services"),
  }),
  // (config, env) => {
  //   // config = rewireLess(config, env);
  //   // // with loaderOptions
  //   // config = rewireLess.withLoaderOptions({
  //   //   modifyVars: {
  //   //     "@primary-color": "#1890ff",
  //   //   },
  //   // })(config, env);
  //   // config.module.rules[1].oneOf.push({
  //   //   test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  //   //   loader: "file-loader",
  //   // });
  //   config.module.rules.push({
  //     test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  //     use: ["file-loader"],
  //     // loader: "file-loader",
  //   });
  //   return config;
  // }
);
