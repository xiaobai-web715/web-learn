const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appSrc = path.resolve(__dirname, '..', 'src');
const setting = require('../src/setting');
const name = setting.name;
const modules = ['app', 'test'];
const appHtml = modules.reduce((pv, cv) => {
    const options = {
        template: `./public/${cv}.html`,
        chunks: [cv],
        filename: `${cv}.html`,
    };
    pv.push(new HtmlWebpackPlugin(options));
    return pv;
}, []);
const rewrites = [
    ...modules.map((item) => ({
        from: new RegExp(`^/app-react/${item}`),
        to: `/${item}.html`,
    })),
    {
        from: /./,
        to: '/app.html',
    },
];
console.log('====开始打包====', 1234);
const config = {
    mode: 'development',
    entry: modules.reduce((entry, module) => {
        entry[module] = path.resolve(__dirname, '..', `src/entry/${module}.js`);
        return entry;
    }, {}),
    devtool: 'eval-source-map',
    output: {
        publicPath: '/',
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].js',
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    optimization: {
        moduleIds: 'named',
        chunkIds: 'named',
    },
    stats: {
        loggingDebug: ['webpack-dev-server'],
        errorDetails: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: [/\.tsx$/, /\.ts$/],
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '..', 'postcss.config.js'),
                            },
                        },
                    },
                ],
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
                    'sass-loader',
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
                use: ['url-loader'],
            },
        ],
    },
    plugins: appHtml,
    resolve: {
        alias: {
            '@': appSrc,
            src: appSrc,
        },
        extensions: ['.js', '.json', '.ts', '.tsx', '.jsx'],
    },
    devServer: {
        historyApiFallback: {
            rewrites,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: { '^/api': '' },
            },
        },
        hot: true,
        port: 3025,
        static: {
            // 监听静态文件目录
            directory: path.join(__dirname, '..', 'public'),
            watch: true,
        },
        liveReload: false,
        allowedHosts: 'all', // 允许所有主机访问
        compress: true,
    },
};
const compiler = webpack(config);
const devServerOptions = config.devServer || {};
const server = new WebpackDevServer(devServerOptions, compiler);
server
    .start()
    .then(() => {
        console.log('Dev server is running...');
    })
    .catch((err) => {
        console.error(err);
    });

// debugger;
// compiler.run((err, stats) => {
//     if (err || stats.hasErrors()) {
//         console.error(
//             '构建出错：',
//             err ||
//                 stats.toString({
//                     chunks: false,
//                     colors: true,
//                 }),
//         );
//         process.exit(1);
//     }
//     console.log(
//         '构建完成！',
//         stats.toString({
//             chunks: false,
//             colors: true,
//         }),
//     );
// });
