import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import reactRefresh from '@vitejs/plugin-react-refresh'


import path from 'path';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
// import config from './config/variables.less'

// less-vars-to-js 是将 less 样式转化为 json 键值对的形式，当然你也可以直接在 modifyVars 属性后写 json 键值对。

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8')
)
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径



// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    reactRefresh(),//存疑
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        // modifyVars:themeVariables
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('src'),// src 路径
      "components": resolve("src/components"),
      "pages": resolve("src/pages"),
      "common": resolve("src/common"),
      "services": resolve("src/services"),
      "store": resolve("src/store"),
      "utils": resolve("src/utils"),
    }
  },
  build:{ 
    sourcemap:true
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://47.99.134.126:28019/api/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
})
