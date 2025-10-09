import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    /* config options here */
    turbopack: {
        rules: {
            '*.less': {
                loaders: ['less-loader'],
                as: '*.css'
            },
        },
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8201/:path*'
            }
        ]
    }
};

export default nextConfig;
