import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@tailwind": path.resolve(__dirname, "./public/tailwind.css"),
            "@": path.resolve(__dirname, "./src")
        },
    },
});
