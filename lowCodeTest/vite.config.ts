import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from "unocss/vite"
import { fileURLToPath, URL } from "url";
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), UnoCSS()],
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
  }
})
