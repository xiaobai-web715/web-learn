/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,tsx}"],
    theme: {
        extend: {
            screens: {
                // 添加自定义高度媒体查询
                "h-sm": { raw: "(max-height: 600px)" },
            },
        },
    },
    plugins: [require("@tailwindcss/container-queries")],
};
