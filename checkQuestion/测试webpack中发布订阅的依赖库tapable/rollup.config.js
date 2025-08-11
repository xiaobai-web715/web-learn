import typescript from '@rollup/plugin-typescript'; // ts编译
import resolve from "@rollup/plugin-node-resolve"; // 裸模块打包
import commonjs from '@rollup/plugin-commonjs'; // commonjs转esm
export default {
    input: 'index.ts',
    output: {
        file: 'lib/index.js',
        assetFileNames: 'hash',
    },
    plugins: [resolve(), commonjs(), typescript()],
};
