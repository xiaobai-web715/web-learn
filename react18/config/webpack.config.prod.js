const proConfig = {
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    minSize: 10
                }
            }
        }
    },
};

module.exports = proConfig;