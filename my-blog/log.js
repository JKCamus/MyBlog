module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context,
  }) => {
    /* ... */
    webpackConfig.devtool='eval'
    console.log('webpackConfig', webpackConfig);
    return webpackConfig;
  },
};
