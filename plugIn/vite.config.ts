import path from 'node:path'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc';
import { ConfigEnv, defineConfig } from 'vite'
import zip from 'vite-plugin-zip-pack'
import manifest from './manifest.config'
import { name, version } from './package.json'

enum BuildType {
  PLUGIN = 'plugin',
  PROXY = 'proxy'
}
// @ts-ignore
export default defineConfig((env: ConfigEnv) => {
  if (env.mode === BuildType.PLUGIN) {
    return {
      resolve: {
        alias: {
          '@': `${path.resolve(__dirname, 'src')}`,
          'root': `${path.resolve(__dirname)}`
        },
      },
      plugins: [
        // @ts-ignore
        react(),
        // @ts-ignore
        crx({ manifest }),
        // @ts-ignore
        zip({ outDir: 'release', outFileName: `crx-${name}-${version}.zip` }),
      ],
      server: {
        cors: {
          origin: [
            /chrome-extension:\/\//,
          ],
        },
      },
      build: {
        emptyOutDir: false, // 不要删除现有的dist文件
      },
    }
  } else {
    // 仅打包ts资源，使用库模式
    return {
      resolve: {
        alias: {
          '@': `${path.resolve(__dirname, 'proxy')}`,
          'root': `${path.resolve(__dirname)}`
        },
      },
      build: {
        target: 'es2015', // 转换语法
        emptyOutDir: true,
        lib: {
          entry: path.resolve(__dirname, 'proxy/index.ts'),
          outDir: 'dist',
          name: "ProxyRequest",
          formats: ['iife'],
          fileName: 'proxyRequest'
        },
        rollupOptions: {
          output: {
            manualChunks: undefined,
            inlineDynamicImports: true, // 内联动态导入，确保单一文件的输出
          }
        },
        sourcemap: true
      }
    }
  }
})