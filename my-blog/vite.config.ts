import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import reactRefresh from "@vitejs/plugin-react-refresh";
const pkg = require("./package.json");
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import path from "path";
import fs from "fs";
import lessToJS from "less-vars-to-js";
// import config from './config/variables.less'

// less-vars-to-js 是将 less 样式转化为 json 键值对的形式，当然你也可以直接在 modifyVars 属性后写 json 键值对。

// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
// )
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // root: "./", // js导入的资源路径，src
  plugins: [
    // react(),
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
    PkgConfig(),
    OptimizationPersist(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        // modifyVars:themeVariables
      },
    },
  },
  // esbuild: {
  //   jsxFactory: "h",
  //   jsxFragment: "Fragment",
  //   jsxInject: `import React from 'react'`,
  // },
  resolve: {
    alias: {
      "@": resolve("src"), // src 路径
      components: resolve("src/components"),
      pages: resolve("src/pages"),
      common: resolve("src/common"),
      services: resolve("src/services"),
      store: resolve("src/store"),
      utils: resolve("src/utils"),
    },
  },
  build: {
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: true, // 是否产出maifest.json
    sourcemap: true, // 是否产出soucemap.json
    outDir: "build", // 产出目录
    emptyOutDir: true, //构建清空目标文件夹
    chunkSizeWarningLimit: 1000,
    assetsDir: "assets",
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // 自定义一些可以共享的 chunk, 默认 node_modules 下的 package 只拆出一个 vendor
        manualChunks: {
          basic: ["react", "react-dom", "react-router-dom"],
          vendor: ["antd", "axios", "lodash", "ahooks"],
        },
        chunkFileNames: path.join("static", "chunk/[name]-[hash].js"),
        entryFileNames: path.join("static", "js/[name]-[hash].js"),
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true, // 去除构建环境的debugger以及console
      },
    },
  },
  optimizeDeps: {
    include: ["antd", "ahooks", "lodash"],
  },

  server: {
    port: 3001,
    open: true,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://47.99.134.126:28019/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
