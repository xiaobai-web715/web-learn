module.exports = {
    parser: '@typescript-eslint/parser', // 指定ESLint解析器 （好像和17行加18行具有同样的作用）
    extends: [
        'plugin:react/recommended', // 使用来自 @eslint-plugin-react 的推荐规则
        'plugin:@typescript-eslint/recommended', // 使用来自@typescript-eslint/eslint-plugin的推荐规则
        // 下面这一行加上会报错 好像是prettier/@typescript-eslint被高版本的prettier啥的兼容了
        //'prettier/@typescript-eslint',  // 使用 ESLint -config-prettier 禁用来自@typescript-eslint/ ESLint 与 prettier 冲突的 ESLint 规则
        //'plugin:prettier/recommended', => 这里是prettier的相关配置，目前没办法实现保存按照prettier的规则来自动格式化
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        // parser: '',
        ecmaVersion: 2018, // 允许解析最新的 ECMAScript 特性
        sourceType: 'module', // 允许使用 import
        ecmaFeatures: {
            jsx: true, // 允许对JSX进行解析
        },
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    rules: {
        // 自定义规则
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        semi: 2,
        '@typescript-eslint/no-var-requires': 'off', //允许通过require进行导入
        'react/display-name': 'off', //高级组件返回的的不需要重新定义组件名字
        indent: ['error', 4, { SwitchCase: 1 }],
        // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // 这样 ESLint 会把未使用的变量、import 标记为 error，并且在保存时自动删除。
    },
    settings: {
        react: {
            version: 'detect', // 告诉 eslint-plugin-react 自动检测 React 的版本
        },
    },
};
