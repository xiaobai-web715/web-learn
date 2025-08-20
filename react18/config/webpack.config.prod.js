const proConfig = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    minSize: 20000, // 大致超过20kb的chunk文件才会被单独打包
                }
            }
        }
    },
};

module.exports = proConfig;