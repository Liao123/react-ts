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

module.exports = merge(base, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  devtool: "source-map",
  module: {
    rules: [],
  },
  //使用cdn引入的模块声明可以用的变量名 配合cdn使用
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDom",
    axios: "axios",
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
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
        // vendor: {//将第三方库（例如lodashor react）提取到单独的vendor块中
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all',
        // },
        default: {
          //非第三方库 复用用 也拆
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    usedExports: true, //Tree Shaking 只导出使用的模块
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // cache: true,
          compress: {
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
    new WebpackCdnPlugin({
      modules: [
        {
          name: "react",
          var: "React",
          prod: true,
          prodUrl:
            "//unpkg.zhimg.com/react@16.14.0/umd/react.production.min.js",
        },
        {
          name: "react-dom",
          var: "ReactDOM",
          prod: true,
          prodUrl:
            "//unpkg.zhimg.com/react-dom@16.14.0/umd/react-dom.production.min.js",
        },
        {
          name: "react-router-dom",
          var: "ReactRouterDOM",
          prod: true,
          prodUrl:
            "//unpkg.zhimg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js",
        },
        {
          name: "axios",
          var: "axios",
          prod: true,
          prodUrl: "//unpkg.zhimg.com/axios@0.20.0/dist/axios.min.js",
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/static"),
          to: path.resolve(__dirname, "../dist/static"),
        },
      ],
    }),
    new CssMinimizerWebpackPlugin(),
  ],
});
