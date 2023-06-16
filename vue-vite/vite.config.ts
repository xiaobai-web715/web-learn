import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({}), vueJsx({})],
  resolve: {
    alias:{
      "@" : resolve(__dirname, 'src')
      // "@/*" : resolve(__dirname, 'src/*')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3001",
        changeOrigin: true, //换源,
        rewrite: (path) => path.replace(/^\/api/,''),
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 引入多个scss文件
        additionalData: '@use "@/components/scss/position.scss" as *; @use "@/components/scss/color.scss" as *;'
      }
    }
  },
});
