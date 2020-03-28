const { makeWebpackConfig } = require('webpack-simple');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
});

module.exports = makeWebpackConfig({
  plugins: [htmlWebpackPlugin],
  devServer: {
    contentBase: './dist',
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
});
