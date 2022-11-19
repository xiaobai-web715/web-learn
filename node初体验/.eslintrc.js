module.exports = {
    // parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: [
        'standard-with-typescript'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname
    },
    rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off', // 是否禁止在需要布尔值的表达式中使用非布尔类型
        '@typescript-eslint/no-base-to-string': 'off', // 防止你想输出一个对象但是却调用了toString
        '@typescript-eslint/restrict-template-expressions': 'off',
        'no-new': 'off', // 关掉必须用变量承接new 构造函数返回的对象
        'no-case-declarations': 'off', // 允许switch case当中在case下面直接写let, const, function and class（不关闭的话可以使用对象形式的写法https://eslint.org/docs/latest/rules/no-case-declarations）
        'n/handle-callback-err': 'off',
        indent: 'off',
        'no-tabs': 'off',
        '@typescript-eslint/indent': ['error', 4]
    }
}
