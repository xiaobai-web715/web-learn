import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from "url";
import { resolve, join } from 'path';
import qiankun from 'vite-plugin-qiankun';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({}), 
    vueJsx({}), 
    qiankun('vueApp', {useDevMode: true})
  ],
  // 静态资源服务文件夹
  publicDir: 'public',
  base: './',
  resolve: {
    alias:{
      // "@" : resolve(__dirname, 'src')
      // "@/*" : resolve(__dirname, 'src/*')
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3001",
        changeOrigin: true, //换源,
        rewrite: (path) => path.replace(/^\/api/,''),
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
  },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 引入多个scss文件
        additionalData: '@use "@/components/scss/position.scss" as *; @use "@/components/scss/color.scss" as *;'
      }
    }
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,
  }
});
