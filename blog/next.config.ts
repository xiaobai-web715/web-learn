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
    images: {
        // domains: ['lxh-doc-test.oss-cn-beijing.aliyuncs.com'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'lxh-doc-test.oss-cn-beijing.aliyuncs.com',
                pathname: '/**',
            }
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://bi-admin:8201/:path*'
            }
        ]
    }
};

export default nextConfig;
