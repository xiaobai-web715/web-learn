import typescript from '@rollup/plugin-typescript'; // ts编译
import resolve from "@rollup/plugin-node-resolve"; // 裸模块打包
import commonjs from '@rollup/plugin-commonjs'; // commonjs转esm
export default {
    input: {
        tapable: 'tapable.ts',
        enhancedResolve: 'enhancedResolve.ts'
    },
    output: {
        dir: 'lib',
        entryFileNames: '[name]-[hash].js',
        sourcemap: true
    },
    plugins: [resolve(), commonjs(), typescript()],
};
