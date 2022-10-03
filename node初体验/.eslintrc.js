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
    'no-new': 'off' // 关掉必须用变量承接new 构造函数返回的对象
  }
}
