const { defineConfig } = require('@vue/cli-service');
// import { defineConfig } from "@vue/cli-service";
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: { extensions: ['.ts', '.tsx'] },
        module: {
            rules: [
                { test: /\.ts$/, loader: 'ts-loader' },
            ]
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api': {
                target: "http://localhost:3001",
                changeOrigin: true, //换源,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
});
