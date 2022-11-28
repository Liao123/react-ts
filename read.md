  了解有哪些插件及loader配合babel官网 react主要由babel-loader提供编译：
  官网地址：https://webpack.docschina.org/loaders/#files

used-loader:
    css-loader          --- 编译css
    style-loader        --- 移动css-loader编译好的到html的style里面
    @babel/preset-react --- babel 预设一系列列 jsx编译 用到的组合  //https://www.babeljs.cn/docs/
    @babel/preset-env   --- es5+ 转 es5
    @babel/core         --- 编译js用的 比如把ast类型的js转成能运行的js //@babel/core 是babel对core-js的高级封装 webpack内部用的 不装会提示你
    core-js             --- 代替polyfill

used-plugin:
    html-webpack-plugin --- 默认打包是没有html承载js的  他可以生成index.html模版 并且指定模版
    mini-css-extract-plugin 抽离css 到独立文件中  与style-loader 2选一 不能同时存在
    webpack-merge       --- 合并打包配置文件
    env-cmd             --- env 文件配置化
    css-minimizer-webpack-plugin -- 压缩css
    
性能优化:
    DLL                 --- 不常用的模块单独打包避免每次打进去 减少打包时间
