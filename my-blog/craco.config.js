const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径
module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      pages: resolve("src/pages"),
      common: resolve("src/common"),
      services: resolve("src/services"),
    },
  },
};
