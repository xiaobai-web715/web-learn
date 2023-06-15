const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {extensions: ['.ts', '.tsx']},
    module: {
      rules: [
        {test: /\.ts$/, loader: 'ts-loader'}
      ]
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // disableHostCheck: true,
    // compress: true,
  }
});
