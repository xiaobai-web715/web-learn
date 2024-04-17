import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import html from '@rollup/plugin-html';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import fs from 'fs';
import url from 'url';
import * as sass from 'sass'
// 当使用rollup命令 带有-w参数启动命令的时候,rollup会监听input的文件改动进行重新编译
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV === 'development'
const createHotUpdate = () => {
  return [
    isDevelopment && serve({
      open: true,
      contentBase: 'dist',
      host: 'localhost',
      port: 3000
    }),
    isDevelopment && livereload('dist'), //监听dist文件的改动
    !isDevelopment && terser(),
  ]
}
const background = {
  input: 'background/service-worker.ts',
  output: {
    file: 'dist/background/background.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    ...createHotUpdate()
  ],
  watch: {
    clearScreen: false
  }
};

const content_2 = {
  input: 'content/content-course4.ts',
  output: {
    file: 'dist/content/content-2.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    ...createHotUpdate()
  ],
  watch: {
    clearScreen: false
  }
}

const content_1 = {
  input: 'content/content.ts',
  output: {
    file: 'dist/content/content-1.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    ...createHotUpdate()
  ],
  watch: {
    clearScreen: false
  }
}

const popup = {
  input: 'popup/src/index.tsx',
  output: {
    file: 'dist/panel/entry.js',
    format: 'esm'
  },
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**', // 排除 node_modules 目录
      presets: ['@babel/preset-react'], // 使用 React 预设
    }),
    ...createHotUpdate(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true, // 阻止替换变量后的赋值操作
    }),
    resolve(), // 解析 node_modules 中的模块
    commonjs(), // 转换 CommonJS 模块为 ES6
    image(), // 处理图片文件
    copy({
      targets: [
        { src: 'manifest.json', dest: 'dist' },
        { src: 'images/**/*', dest: 'dist/images' },
      ],
    }),
    scss({
      fileName: 'entry.css',
      sass,
    }),
    html({
      publicPath:'./',
      template: ({ attributes, files, meta, publicPath, title }) => {
        // 读取现有的 HTML 文件内容
        const htmlPath = path.resolve(__dirname, 'popup/public', 'popup.html');
        // console.log("文件路径", htmlPath, publicPath)
        let htmlTemplate = fs.readFileSync(htmlPath, { encoding: 'utf8' });
        // console.log("我是script的值", htmlTemplate)
        // 生成 script 标签
        const scripts = (files.js || [])
          .map(({ fileName }) => {
            // console.log("我是文件名称", fileName)
            return `<script src="${publicPath}${fileName}"></script>`
          })
          .join('\n');
        const cssLinks = (files.css || [])
          .map(file => `<link rel="stylesheet" href="${publicPath}${file.fileName}">`)
          .join('\n');


        // 将 script 标签插入到现有的 HTML 中
        // 假设你的 HTML 中有一个特殊的占位符，比如 <!-- inject:js -->
        htmlTemplate = htmlTemplate.replace('<!-- inject:js -->', scripts);
        htmlTemplate = htmlTemplate.replace('<!-- inject:css -->', cssLinks)
        return htmlTemplate;
      },
      // 自定义输出的 HTML 文件名，如果需要的话
      fileName: 'popup.html'
    }),
  ],
  watch: {
    clearScreen: false
  }
}

export default [background, content_1, content_2, popup]