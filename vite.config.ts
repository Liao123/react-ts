import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs' //解决报错"require is not defined" React项目中使用了CommonJS语法
import { createHtmlPlugin } from 'vite-plugin-html' //同构webpac  index.html
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    createHtmlPlugin({
      minify: true,//是否压缩html
      /**
       * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: 'src/index.tsx',
      /**
       * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      template: 'public/index.html',
      /**
       * 需要注入 index.html ejs 模版的数据
       */
      inject: {
        data: {
          title: 'index',
          // injectScript: `<script src="/src/index.tsx"></script>`,
          htmlWebpackPlugin: { options: { title: 1 } }
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src', // 这里设置了一个别名 '@'，它指向项目根目录下的 'src' 目录
    }
  },
  css: {
    postcss: {
      plugins: [ // 主要 webpack 有这个postcss.config.js文件 不装插件要报错 其实vite内部已经实现了
        require('autoprefixer')(),
        require('postcss-preset-env')(),
      ],
    },
  },
  build: {
    target: 'es6',// comm 转es

  },
})
