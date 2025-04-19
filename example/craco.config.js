const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@react-insight': path.resolve(__dirname, '../src'),
      };
      return webpackConfig;
    },
  },
};