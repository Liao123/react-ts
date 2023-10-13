const path = require("path");
const base = require("./base.config");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map", //完全显示源码 eval-cheap-module-source-map
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    static: {
      //可以是数组
      directory: path.resolve(__dirname, "../public"), //指定静态文件去哪拿
    },
    hot: true,
    historyApiFallback: true, //重定向index 发布的时候也需要设置服务器 重定向
  },
  optimization: {
    // 如果我们要在单个 HTML 页面上使用多个入口点，optimization.runtimeChunk: 'single'也需要
    // runtimeChunk: 'single',//配合 devServer  代码拆分单独的包
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), //无刷热重载
  ],
});
