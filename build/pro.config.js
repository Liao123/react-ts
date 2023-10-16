const path = require("path");
const base = require("./base.config");
const { merge } = require("webpack-merge");
// js压缩
const TerserPlugin = require("terser-webpack-plugin");
// cdn 引入
const WebpackCdnPlugin = require("webpack-cdn-plugin");
// 转移静态文件
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 打包进度条
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
//压缩css
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
//css 抽离文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(base, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  // devtool: "source-map",
  module: {
    rules: [],
  },
  //使用cdn引入的模块声明可以用的变量名 配合cdn使用
  externals: {
    // react: "React",
    // "react-dom": "ReactDOM",
    // "react-router-dom": "ReactRouterDom",
    // axios: "axios",
  },
  performance: {
    hints: false, //"warning", // 或 "error"
    maxAssetSize: 244 * 1024, // 限制文件大小为244 KiB
  },
  optimization: {
    moduleIds: "deterministic", //vendor哈希值应该在构建之间保持一致
    runtimeChunk: "single", //https://www.jianshu.com/p/af775a64c5a4  改哪个文件 哪个文件更新hash
    splitChunks: {
      chunks: "all", //all，async 和 initial 这表明将选择哪些 chunk 进行拆分优化  一个动态导入 一个入口文件
      minSize: 20000, //生成 chunk 的最小体积
      minRemainingSize: 0,
      minChunks: 1, //拆分共享模块的最小 chunks 数。
      maxAsyncRequests: 30, //按需加载时的最大并行请求数。
      maxInitialRequests: 30, //入口点的最大并行请求数。
      enforceSizeThreshold: 50000, //强制执行拆分的体积阈值和其他限制
      cacheGroups: {
        //缓存
        react: {
          // 优先级
          priority: 20,
          test: /[\\/]node_modules[\\/](react|react-router-dom|react-redux|react-dom)[\\/]/, // 单独打一个包
          name: "react",
          chunks: "all",
        },
        //公共js
        // default: {
        //   name: "common",
        //   chunks: "all",
        //   minChunks: 2, //模块被引用2次以上的才抽离
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
    usedExports: true, //Tree Shaking 只导出使用的模块
    minimize: true,
    minimizer: [
      //压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          // cache: true,
          compress: {
            // 删除console.log
            pure_funcs: ["console.log"],
            // 去除打印
            drop_console: true,
            // 去除debugger
            drop_debugger: true,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    // new WebpackCdnPlugin({
    //   modules: [
    //     {
    //       name: "react",
    //       var: "React",
    //       prod: true,
    //       prodUrl:
    //         "//unpkg.zhimg.com/react@16.14.0/umd/react.production.min.js",
    //     },
    //     {
    //       name: "react-dom",
    //       var: "ReactDOM",
    //       prod: true,
    //       prodUrl:
    //         "//unpkg.zhimg.com/react-dom@16.14.0/umd/react-dom.production.min.js",
    //     },
    //     {
    //       name: "react-router-dom",
    //       var: "ReactRouterDOM",
    //       prod: true,
    //       prodUrl:
    //         "//unpkg.zhimg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js",
    //     },
    //     {
    //       name: "axios",
    //       var: "axios",
    //       prod: true,
    //       prodUrl: "//unpkg.zhimg.com/axios@0.20.0/dist/axios.min.js",
    //     },
    //   ],
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/static"),
          to: path.resolve(__dirname, "../dist/static"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // 加上[contenthash:8]
    }),
    new CssMinimizerWebpackPlugin(),
  ],
});
