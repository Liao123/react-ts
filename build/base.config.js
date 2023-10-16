const path = require("path");
// const isDev = process.env.NODE_ENV !== "production";
const isDev = true//process.env.NODE_ENV === "development"; // 是否是开发模式
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log(process.env.NODE_ENV, "ev");
//css抽离于独立文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]_[fullhash:8].js", //构建过程中的任何更改时都会发生变化
    chunkFilename: "js/[name]_[chunkhash:8].js", //在其内容发生变化时发生变化，而不会影响主要文件的名称
    clean: true, //webpack5 输出前清除不需要插件了
  },
  resolve: {
    //解析器
    extensions: [".jsx", ".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        // exclude: /(node_modules|bower_components)/,
        include: [path.resolve(__dirname, "../src")], //编译范围缩小到src
        use: ["thread-loader", "babel-loader"],
      },
      {
        test: /.(css|less)$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", //asset/resource（对应file-loader）、asset/inline（对应url-loader）、asset/source（对应raw-loader）、asset。
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 加上[contenthash:8]
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), //'index.html'
      title: "2",
      hash: true, //清缓存
      inject: "body", //选择打包的js插入的标签
      inject: true, //自动注入静态资源
    }),
    // new MiniCssExtractPlugin({
    //   //抽离css
    //   filename: "index.bundle.css", // 输出的 css 文件名为 index.css
    // }),
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};
