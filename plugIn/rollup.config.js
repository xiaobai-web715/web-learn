import typescript from "@rollup/plugin-typescript";
import scss from "rollup-plugin-scss";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve"; // roolup在打包的时候默认与ES原生比较像，不能支持裸模块的导入。需要借助这个插件实现对于裸模块的打包构建
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import html from "@rollup/plugin-html";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from "@rollup/plugin-terser";
import alias from "@rollup/plugin-alias";
import path from "path";
import fs from "fs";
import url from "url";
import * as sass from "sass";
import { promisify } from 'util'
// 当使用rollup命令 带有-w参数启动命令的时候,rollup会监听input的文件改动进行重新编译
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const isDevelopment = process.env.NODE_ENV === "development";
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)
const createHotUpdate = () => {
  return [
    isDevelopment &&
      serve({
        open: true,
        contentBase: "dist",
        host: "localhost",
        port: 3000,
      }),
    isDevelopment && livereload("dist"), //监听dist文件的改动
    !isDevelopment && terser(),
  ].filter(Boolean);
};

const mainfestChange = () => {
  return {
    async buildStart() {
      const version = await readFile('version.txt', {encoding: 'utf8'})
      // __dirname 是当前文件所在目录的路径
      const manifestPath = path.resolve(__dirname, 'manifest.json')
      const manifestContent = await readFile(manifestPath, {encoding: 'utf8'})
      // console.log("我是获取的版本信息", version)
      try {
        const parserManifestContent = JSON.parse(manifestContent)
        parserManifestContent.description = version || ''
        // JSON.stringify 第二个参数是替换的功能（数组或者函数）第三个参数是每个级别缩进的空格（美化功能）
        await writeFile(manifestPath, JSON.stringify(parserManifestContent, null, 2), {encoding: 'utf8'})
      } catch (err) {
        console.log("解析mainfest.json中的json串配置失败")
        await Promise.resolve()
      }
    }
  }
}
const manifest = {
  input: 'manifest/index.ts',
  output: {
    file: "dist/manifest/index.js",
    format: "esm",
    sourcemap: "inline", // 可选，如果你想生成source map
  },
  plugins: [
    mainfestChange()
  ]
}

const background = {
  input: "background/service-worker.ts",
  output: {
    file: "dist/background/background.js",
    format: "esm",
    sourcemap: "inline", // 可选，如果你想生成source map
  },
  plugins: [
    typescript(),
    resolve({
      browser: true, // 告诉插件需要适配浏览器环境
    }),
    commonjs(),
    alias({
      entries: [
        { find: "@", replacement: "." }, // 与tsconfig.json中的配置相匹配
      ],
    }),
  ],
  watch: {
    clearScreen: false,
  },
};

const content_2 = {
  input: "content/content-course4.ts",
  output: {
    file: "dist/content/content-2.js",
    format: "esm",
  },
  plugins: [typescript()],
  watch: {
    clearScreen: false,
  },
};

const content_1 = {
  input: "content/content.ts",
  output: {
    file: "dist/content/content-1.js",
    format: "esm",
  },
  plugins: [typescript()],
  watch: {
    clearScreen: false,
  },
};

const content_3 = {
  input: "content/getPageDomPath/index.ts",
  output: {
    file: "dist/content/getPageDomPath.js",
    format: "esm",
  },
  plugins: [
    typescript(),
    resolve(
      {
        browser: true, // 告诉插件需要适配浏览器环境
        alias: {
          // 映射node:crypto 这个依赖到我们自己的一个模块当中
          "node:crypto": "./resolveAlias.ts"
        }
      }
    ), // 解析 node_modules 中的裸模块
    commonjs(), // 转换 CommonJS 模块为 ES6
  ],
  watch: {
    clearScreen: false,
  },
};

const assemblyTem = (target, htmlName) => {
  return ({ attributes, files, meta, publicPath, title }) => {
    // 读取现有的 HTML 文件内容
    const htmlPath = path.resolve(__dirname, `${target}/public`, `${htmlName}.html`);
    // console.log("文件路径", htmlPath, publicPath)
    let htmlTemplate = fs.readFileSync(htmlPath, { encoding: "utf8" });
    // console.log("我是script的值", htmlTemplate)
    // 生成 script 标签
    const scripts = (files.js || [])
      .map(({ fileName }) => {
        // console.log("我是文件名称", fileName)
        return `<script src="${publicPath}${fileName}"></script>`;
      })
      .join("\n");
    const cssLinks = (files.css || [])
      .map(
        (file) =>
          `<link rel="stylesheet" href="${publicPath}${file.fileName}">`
      )
      .join("\n");

    // 将 script 标签插入到现有的 HTML 中
    // 假设你的 HTML 中有一个特殊的占位符，比如 <!-- inject:js -->
    htmlTemplate = htmlTemplate.replace("<!-- inject:js -->", scripts);
    htmlTemplate = htmlTemplate.replace("<!-- inject:css -->", cssLinks);
    return htmlTemplate;
  }
}

const popup = {
  input: "popup/src/index.tsx",
  output: {
    file: "dist/panel/entry.js",
    format: "esm",
  },
  plugins: [
    typescript(),
    babel({
      exclude: "node_modules/**", // 排除 node_modules 目录
      babelHelpers: 'bundled', // 使用 'bundled' 模式
      // presets: ["@babel/preset-react"], // 使用 React 预设 => 可以在这里写转译所需要的预设，也可以使用,babelrc文件进行配置
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      preventAssignment: true, // 插件会避免替换看起来像是赋值操作的代码片段。
    }),
    resolve(), // 解析 node_modules 中的模块
    commonjs(), // 转换 CommonJS 模块为 ES6
    image(), // 处理图片文件
    copy({
      targets: [
        { src: "manifest.json", dest: "dist" },
        { src: "images/**/*", dest: "dist/images" },
      ],
    }),
    scss({
      fileName: "entry.css",
      sass,
    }),
    html({
      publicPath: "./",
      template: assemblyTem('popup', 'popup'),
      // 自定义输出的 HTML 文件名，如果需要的话
      fileName: "popup.html",
    }),
  ],
  watch: {
    clearScreen: false,
  },
};

const view = {
  input: 'view/main.tsx',
  output: {
    file: 'dist/view/index.js',
    format: 'iife',
    // globals: {
    //   react: "React",
    //   'react-dom': "ReactDOM"
    // }
  },
  plugins: [
    peerDepsExternal(), // 说是防止重复引入不同版本的库
    resolve({
      browser: true, // 告诉插件需要适配浏览器环境
    }), // 处理裸模块
    commonjs(),
    typescript(),
    scss({
      fileName: "index.css",
      sass,
    }),
    html({ 
      publicPath: "./",
      template: assemblyTem('view', 'app'),
      // 自定义输出的 HTML 文件名，如果需要的话
      fileName: "view.html",
    }),
    babel({
      exclude: 'node_modules/**', // 排除 node_modules 下的文件
      babelHelpers: 'bundled' // 使用 'bundled' 模式
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    terser(), // 压缩代码
    alias({
      entries: [
        { find: "@", replacement: "." }, // 与tsconfig.json中的配置相匹配
      ],
    }),
  ],
  onwarn: function (warning, warn) {
    // 检查警告信息，忽略特定警告
    if (warning.message && (warning.message.includes('"use client"') || warning.message.includes('this'))) {
      return;
    }
    warn(warning)
  },
  // external: ['react', 'react-dom'] // 避免将 React 和 ReactDOM 打包进来(这里加上之后 运行编译后的文件会报错react这个库不存在)
}

export default [manifest, background, content_1, content_2, content_3, popup, view];
