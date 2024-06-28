// 1. ES导出的模块当中不能直接使用CommonJS模块当中的常量
// 2. 在use数组中，最后一个loader首先被应用于文件 （sass-loader写在了css-loader的后面）
import path from "path"
import url from "url"
import * as webpack from "webpack"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const __filename = url.fileURLToPath(import.meta.url) // 获取当前文件的路径
const __dirname = path.dirname(__filename) // 获取当前文件所在的目录
const config = {
    entry: __dirname + '/view/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/view'),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // 对以ts和tsx结尾的文件进行babel
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env', // 转译ES6+
                                '@babel/preset-react', // 转译jsx
                                '@babel/preset-typescript', // 支持Typescript
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    // 'style-loader', // 将JS字符串生成为style节点(将生成的CSS通过<style>标签的形式添加到HTML文档的<head>部分)  => 使用 style-loader不会生成独立的css文件
                    MiniCssExtractPlugin.loader,
                    'css-loader', // 将CSS转化成CommonJS模块(解析其中的@import和url()等，并将CSS转化成JavaScript模块。)
                    'sass-loader' // 将Sass编译成CSS
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'view/public/app.html'), filename: "view.html"}),
        new MiniCssExtractPlugin({
            filename: '[name].css', // 输出的CSS文件名
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // 添加webpack在解析模块的时候应该匹配的文件后缀
        alias: {
            '@': __dirname
        }
    }
}

export default config