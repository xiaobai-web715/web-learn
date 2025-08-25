import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    turbopack: {
        rules: {
            '*.less': {
                loaders: ['less-loader'],
                as: '*.css'
            }
        }
    },
};

export default nextConfig;
