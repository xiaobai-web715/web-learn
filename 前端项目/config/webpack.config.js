const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appSrc = path.resolve(process.cwd(), 'src');
module.exports = {
    mode : 'development',
    entry : {
        app : './src/index.js',
    },
    output : {
        path : path.join(__dirname , '..' , 'dist'), //这里要使用绝对路径
        filename : '[name].js'
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : [
                    {
                        loader : 'babel-loader',
                        options : {
                            presets : ['@babel/preset-react']
                        },
                    },
                ]
            },
            {
                test : /\.css$/,
                exclude : /node_modules/,
                use : ['style-loader' , 'css-loader'],
            },
            {
                test :/\.s[ac]ss$/i,
                exclude : /node_modules/,
                use : [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader', //目前的这里的配置可以实现对sass编译成css文件(这时css文件的内容时在html页面的head标签下的<style>标签中，如果还想在打包时将css文件单独打包出来，需要以下操作npm install --save-dev mini-css-extract-plugin)
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(appSrc , 'public/scss/public.scss'),
                        }
                    }
                ]
            },
            {
                test :[/\.png$/],
                exclude : /node_modules/,
                use : ['url-loader']
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({template : './public/index.html'})
    ],
    devServer : {
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                pathRewrite: {'^/api': ''},
            }
        },
        contentBase : './index.html', //这里路径为啥这样写也不太清楚
        hot : true,
        port : 3000,
    }
}