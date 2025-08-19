const path = require('path');
const modules = ['app', 'test'];
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
const devConfig = {
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
    }
};

module.exports = devConfig;