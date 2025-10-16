import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // output: 'standalone',
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
                destination: 'http://bi-admin/:path*'
            }
        ]
    }
};

export default nextConfig;
