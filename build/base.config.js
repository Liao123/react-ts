const path = require('path');
const devMode = process.env.NODE_ENV !== "production";
const  HtmlWebpackPlugin= require('html-webpack-plugin');
//css抽离于独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: path.resolve(__dirname,'../src/index.tsx'),
  output: {
    path: path.resolve(__dirname,'../dist'),
    filename: 'js/[name]_[fullhash:8].js', //webpack5 用fullhash了
    chunkFilename: 'js/[name]_[fullhash:8].js',
    clean: true, //webpack5 输出前清除不需要插件了
  },
  resolve: {//解析器
    extensions: ['.ts', '.tsx', '.js', '.json', '.less', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        // exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, '../src'), //编译范围缩小到src
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
         'css-loader'
        ],
      },
      {
        test: /\.less$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', //asset/resource（对应file-loader）、asset/inline（对应url-loader）、asset/source（对应raw-loader）、asset。
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:  path.resolve(__dirname, path.resolve(__dirname, '../public/index.html'),), //'index.html'
      title:'2',
      hash:true,//清缓存
      inject:'body',//选择打包的js插入的标签
    }),
    new MiniCssExtractPlugin({//抽离css
      filename: 'index.bundle.css' // 输出的 css 文件名为 index.css
    }),
  ]
};