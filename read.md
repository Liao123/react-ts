了解有哪些插件及 loader 配合 babel 官网 react 主要由 babel-loader 提供编译：
官网地址：https://webpack.docschina.org/loaders/#files

used-loader:
css-loader --- 编译 css
style-loader --- 移动 css-loader 编译好的到 html 的 style 里面
@babel/preset-react --- babel 预设一系列列 jsx 编译 用到的组合 //https://www.babeljs.cn/docs/
@babel/preset-env --- es5+ 转 es5
@babel/core --- 编译 js 用的 比如把 ast 类型的 js 转成能运行的 js //@babel/core 是 babel 对 core-js 的高级封装 webpack 内部用的 不装会提示你
core-js --- 代替 polyfill

used-plugin:
html-webpack-plugin --- 默认打包是没有 html 承载 js 的 他可以生成 index.html 模版 并且指定模版
mini-css-extract-plugin 抽离 css 到独立文件中 与 style-loader 2 选一 不能同时存在
webpack-merge --- 合并打包配置文件
env-cmd --- env 文件配置化
css-minimizer-webpack-plugin -- 压缩 css

性能优化:
DLL --- 不常用的模块单独打包避免每次打进去 减少打包时间
CDN --- 远程加载 cdn 库 react 什么的

react Router
