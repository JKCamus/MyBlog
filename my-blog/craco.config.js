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
// 开启gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const { POSTCSS_MODES, whenProd } = require("@craco/craco");

const threadLoader = require("thread-loader");

const jsWorkerPool = {
  workers: 2,
  poolTimeout: 2000,
};
threadLoader.warmup(jsWorkerPool, ["babel-loader"]);

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
        ],
      },
      resolve: {
        modules: [
          // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
          resolve("src"),
          resolve("node_modules"),
        ],
        alias: {
          "@": resolve("src"), // 缓存src目录为@符号，避免重复寻址
        },
      },
      //抽离公用模块
      optimization: {
        minimize: process.env.REACT_APP_ENV !== "development" ? true : false,
        splitChunks: {
          chunks: "all", // initial、async和all
          minSize: 30000, // 形成一个新代码块最小的体积
          maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
          maxInitialRequests: 3, // 最大初始化请求数
          automaticNameDelimiter: "~", // 打包分割符
          name: true,
          cacheGroups: {
            // commons: {
            //   chunks: "initial",
            //   minChunks: 2,
            //   maxInitialRequests: 5,
            //   minSize: 0,
            // },
            // vendor: {
            //   test: /node_modules/,
            //   chunks: "initial",
            //   name: "vendor",
            //   priority: 10,
            //   enforce: true,
            // },
            "async-commons": {
              // 其余异步加载包
              chunks: "async",
              minChunks: 2,
              name: "async-commons",
              priority: 90,
            },
            commons: {
              // 其余同步加载包
              chunks: "all",
              minChunks: 2,
              name: "commons",
              priority: 80,
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
            // parallel: true, // 多线程
            // terserOptions: {
            //   ie8: true,
            //   // 删除注释
            //   output: {
            //     comments: false,
            //   },
            //   //删除console 和 debugger  删除警告
            //   compress: {
            //     drop_debugger: true,
            //     drop_console: true,
            //   },
            // },
          }),
          // 开启gzip
          // new CompressionWebpackPlugin({
          //   // 是否删除源文件，默认: false
          //   deleteOriginalAssets: false,
          // }),
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
      // 配置全局less变量使用，用的是一个少有人知的loader，必须先弄这个配置
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
    // 配置全局less变量使用，用的是一个少有人知的loader
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
  ],
};
