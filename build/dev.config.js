const path = require('path');
const base = require('./base.config')
const { merge } = require('webpack-merge');
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports =merge(base,{
  mode: 'development',
  devtool: 'inline-source-map', //完全显示源码
  devServer: {
    static: './dist',
    hot: true,
  },
  optimization: {
    // 如果我们要在单个 HTML 页面上使用多个入口点，optimization.runtimeChunk: 'single'也需要
    // runtimeChunk: 'single',//配合 devServer  代码拆分单独的包
  },
  plugins: [
    new ReactRefreshWebpackPlugin() //无刷热重载
  ],
});