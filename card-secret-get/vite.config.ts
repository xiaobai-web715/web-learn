import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@tailwind": path.resolve(__dirname, "./public/tailwind.css"),
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api' : {
                target: "http://104.143.32.25:80",
                changeOrigin: true,              // 修改请求头中的 host
                // rewrite: (path) => path.replace(/^\/api/, ''), // 可选：去掉 /api 前缀
            }
        }
    }
});
