const path = require("path");
const CracoLessPlugin = require("craco-less");
const CracoSwcPlugin = require("craco-swc");
const cracoPluginStyleResourcesLoader = require("craco-plugin-style-resources-loader");
const babelPluginStyledComponents = require("babel-plugin-styled-components");
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径
// 确实去除了sourceMap
process.env.GENERATE_SOURCEMAP = "false";
// 添加webpack速度分析,在webpack那边假如smp
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 编译进度条
const WebpackBar = require("webpackbar");
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");
// 打包信息配置
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const {  whenProd } = require("@craco/craco");

const threadLoader = require("thread-loader");
const logPlugin = require('./log');


const jsWorkerPool = {
  workers: 2,
  poolTimeout: 2000,
};
threadLoader.warmup(jsWorkerPool, ["babel-loader"]);
// 最新版本热更新
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  webpack: smp.wrap({
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      pages: resolve("src/pages"),
      common: resolve("src/common"),
      services: resolve("src/services"),
      store: resolve("src/store"),
      utils: resolve("src/utils"),
    },

    configure: {
      /*在这里添加任何webpack配置选项: https://webpack.js.org/configuration */
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "thread-loader",
                options: jsWorkerPool,
              },
              // "babel-loader?cacheDirectory",
            ],
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ["cache-loader", "babel-loader"],
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            // 本质上是依赖于typescript(typescript compiler)
            use: ["cache-loader", "babel-loader"],
          },
        ],
      },
      resolve: {
        modules: [
          // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
          resolve("src"),
          resolve("node_modules"),
        ],
        // 配置匹配文件后缀名eg:对于引入jsx文件，可以不填写后缀名也可以找到
        // extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".ts", ".vue"],
        alias: {
          "@": resolve("src"), // 缓存src目录为@符号，避免重复寻址
          pages: resolve("./src/pages"),
        },
      },
      //抽离公用模块
      optimization: {
        // minimize: process.env.REACT_APP_ENV !== "development" ? true : false,
        splitChunks: {
          cacheGroups: {
            commons: {
              chunks: "initial",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
            },
            vendor: {
              test: /node_modules/,
              chunks: "initial",
              name: "vendor",
              priority: 10,
              enforce: true,
            },
          },
        },
      },
    },
    plugins: [
      // webpack进度条
      new WebpackBar({ color: "green", profile: true }),
      // 打包时，启动插件
      ...whenProd(
        () => [
          // 压缩js 同时删除console debug等
          new TerserPlugin({
            parallel: true,
            extractComments: false,
            terserOptions: {
              ie8: true,
              // 删除注释
              output: {
                comments: false,
              },
              //删除console 和 debugger  删除警告
              compress: {
                drop_debugger: true,
                drop_console: true,
              },
            },
          }),

          // 打包分析
          new BundleAnalyzerPlugin(),
        ],
        []
      ),
    ],
  }),
  // 插件相关配置，一个plugin一个对象
  plugins: [
    // 配置less
    // 按需引入antd
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // 配置主题或者说是标志颜色
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            modifyVars: { "@primary-color": "#43a3ef" },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      // 配置全局less变量使用
      plugin: {
        ...CracoSwcPlugin,
        overrideCracoConfig: ({ cracoConfig }) => {
          if (typeof cracoConfig.eslint.enable !== "undefined") {
            cracoConfig.disableEslint = !cracoConfig.eslint.enable;
          }
          delete cracoConfig.eslint;
          return cracoConfig;
        },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
          if (
            typeof cracoConfig.disableEslint !== "undefined" &&
            cracoConfig.disableEslint === true
          ) {
            webpackConfig.plugins = webpackConfig.plugins.filter(
              (instance) => instance.constructor.name !== "ESLintWebpackPlugin"
            );
          }
          return webpackConfig;
        },
      },
      options: {
        swcLoaderOptions: {
          jsc: {
            externalHelpers: true,
            target: "es5",
            parser: {
              syntax: "typescript",
              tsx: true,
              dynamicImport: true,
              exportDefaultFrom: true,
            },
          },
        },
      },
    },
    // 配置全局less变量使用
    {
      plugin: cracoPluginStyleResourcesLoader,
      options: {
        patterns: path.join(__dirname, "src/assets/css/reset.less"),
        /*
          Please enter supported CSS processor type
          1. if u use css processor，please type css string
          2. if u use less processor，please type less string
          3. if u use sass or scss processor，please type sass or scss string，Choose one of the two
          4. if u use stylus processor，please type stylus string
      */
        styleType: "less",
      },
    },
    {
      plugin: babelPluginStyledComponents,
      options: {
        fileName: false,
      },
    },
    // {
    //   plugin: new ReactRefreshWebpackPlugin(),
    // },
  ],
  devServer: {
    hot: true,
    hotOnly: true, //错误修改后不刷新整个页面
    proxy: {
      "/api": {
        target: "http://43.139.66.115:8000", // 开发路由代理
        // ws: false, // websocket
        changeOrigin: true, //是否跨域
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
