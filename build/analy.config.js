const prodConfig = require("./pro.config.js"); // 引入打包配置
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require("webpack-merge"); // 引入合并webpack配置方法
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 引入分析打包结果插件
// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
prodConfig.module.rules[1].use[0] = "style-loader";
module.exports = smp.wrap(
  merge(prodConfig, {
    // rules: [
    // {
    //   test: /.(css|less)$/,
    //   include: [path.resolve(__dirname, "../src")],
    //   use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
    // },
    // ...prodConfig.rules,
    // ],
    plugins: [
      new BundleAnalyzerPlugin(), // 配置分析打包结果插件
    ],
  })
);
