module.exports = {
    root: true,
    parser:  'vue-eslint-parser',
    extends: [
        'plugin:vue/vue3-recommended',
        // 'plugin:vue/recommended',
    ],
    parserOptions: {
        "parser": "@typescript-eslint/parser",
        "ecmaVersion": 2018, //代表兼容的es语法
        "sourceType": "module",
        // "project": 'tsconfig.json',
        // "tsconfigRootDir": __dirname
    },
    rules:  {
        // 'vue/no-v-for-template-key-on-child': 'off',
        // 'vue/no-v-for-template-key': 'off',
        // vue/singleline-html-element-content-newline当dom内部有子元素的时候提示换行
        "vue/singleline-html-element-content-newline": ["error", {
            "ignoreWhenNoAttributes": true, //当元素没有属性的时候允许其在一行展示
        }],
        "semi": 2,
        "vue/html-indent": ["warn", 4], //html缩进的规则 默认2个空格
        "vue/multi-word-component-names": 'off',
    },
};