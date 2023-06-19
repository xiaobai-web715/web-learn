module.exports = {
    root: true,
    parser:  'vue-eslint-parser',
    plugins: ['@typescript-eslint'], //配置插件
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": 2018, //代表兼容的es语法
        "sourceType": "module",
        "project": ['tsconfig.json'],
        "extraFileExtensions": ['.vue'],
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
        '@typescript-eslint/indent': ['error', 4],
    },
};