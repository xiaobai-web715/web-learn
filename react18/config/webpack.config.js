const path = require('path');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
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
const environment = process.argv[3] || 'production';
const baseConfig = {
    mode: environment,
    entry: modules.reduce((entry, module) => {
        entry[module] = path.resolve(__dirname, '..', `src/entry/${module}.js`);
        return entry;
    }, {}),
    devtool: 'source-map', // 控制是否开启source-map  https://www.webpackjs.com/configuration/devtool/#root
    output: {
        publicPath: '/',
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name]-[contenthash].js',
        chunkFilename: '[name]-[contenthash].js',
        library: `${name}-[name]`, // 打包暴露库的方法
        libraryTarget: 'umd',
        chunkLoadingGlobal: `webpackJsonp_${name}`,
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
};

const config = {
    ...baseConfig,
    ...(environment === 'development' ? devConfig : prodConfig),
};
const compiler = webpack(config);
if (environment === 'development') {
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
} else {
    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            console.error(
                '构建出错：',
                err ||
                    stats.toString({
                        chunks: false,
                        colors: true,
                    }),
            );
            process.exit(1);
        }
        console.log(
            '构建完成！',
            stats.toString({
                chunks: false,
                colors: true,
            }),
        );
    });
}

