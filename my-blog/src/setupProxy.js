const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//     app.use(proxy('/api', {
//       target: 'http://123.207.32.32:9001',
//       secure: false,
//       changeOrigin: true,
//       pathRewrite: {
//         "^/api": "/api"
//       }
//     }))
// }

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://47.102.211.145:8086",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:8888",
//       changeOrigin: true,
//     })
//   );
// };
