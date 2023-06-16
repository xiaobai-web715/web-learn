module.exports = {
    root: true,
    parser:  'vue-eslint-parser', //解析vue
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:vue/vue3-recommended',
        // 'plugin:vue/recommended',
    ],
    parserOptions: {
        "parser": "@typescript-eslint/parser", // 解析ts
        "ecmaVersion": 2018, //代表兼容的es语法
        "sourceType": "module",
        "project": ['tsconfig.json'], // eslint规则
        "extraFileExtensions": ['.vue'], //解决Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.The file does not match your project config: src\components\assembly\tableAssembly\Table.vue.The extension for the file (.vue) is non-standard. You should add "parserOptions.extraFileExtensions" to your config.
        "tsconfigRootDir": __dirname
    },
    rules:  {
        "vue/singleline-html-element-content-newline": ["error", {
            "ignoreWhenNoAttributes": true, //当元素没有属性的时候允许其在一行展示
        }],
        "semi": 2,
        "vue/html-indent": ["warn", 4], //html缩进的规则 默认2个空格
        "vue/multi-word-component-names": 'off',
        'vue/no-template-shadow':'off',
    },
};