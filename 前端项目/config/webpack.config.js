const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appSrc = path.resolve(process.cwd(), 'src');
// console.log(path.resolve(__dirname, '..' , 'src'));
module.exports = {
    // mode : 'production', webpack如何打包生产环境下的
    mode: 'development',
    entry: {
        app: './src/index.js',
        //app : path.resolve(__dirname, '..' ,'./src/index.js'), //这里改成绝对路径也没有用在处理history二级路由请求资源的时候
    },
    devtool: 'inline-source-map', //好像这个可以解决debugger的时候报一个奇怪的错误
    output: {
        publicPath: '/', //这样绝对路径的写法不知道会不会对打包后的引用资源造成错误(这个还有HtmlWebpackPlugin的public的引用资源加前缀的)
        path: path.join(__dirname, '..', 'dist'), //这里要使用绝对路径
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options : {
                        //     presets : ['@babel/preset-react']
                        // },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'sass-loader', //目前的这里的配置可以实现对sass编译成css文件(这时css文件的内容时在html页面的head标签下的<style>标签中，如果还想在打包时将css文件单独打包出来，需要以下操作npm install --save-dev mini-css-extract-plugin)
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(appSrc, 'public/scss/public.scss'),
                        },
                    },
                ],
            },
            {
                test: [/\.png$/, /\.jpeg$/, /\.jpg$/],
                exclude: /node_modules/,
                use: ['url-loader'], //, 'file-loader'这个加上之后好像css当中引入的图片加载不出来了
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '..', 'src'), //获取绝对路径下的src文件夹,在后面的引入中就可以通过@来开始
        },
        extensions: ['.js', '.json', '.ts', '.tsx'], //告诉webpack你引入的文件要寻找哪些后缀的。
    },
    devServer: {
        //historyApiFallback: true, //因为刷新页面的情况下会向服务器发送请求(因为hash模式下#后面的不会作为参数去请求，但history模式下后面的会成为请求的样式但是服务器又没有这个响应所以会报错，这里是一种方式来解决 =》但是否是最好的办法目前不清楚)
        // historyApiFallback: {
        //     rewrites: [
        //         {
        //             from : /^\/rn\/.*$/,
        //             to : '/index.html'
        //         }
        //     ]
        // },
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: { '^/api': '' },
            },
        },
        contentBase: './index.html',
        //contentBase: "./", //本地服务器所加载的页面所在的目录
        hot: true,
        port: 3000,
    },
};
