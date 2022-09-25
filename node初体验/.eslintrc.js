module.exports = {
  // parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off' // 是否禁止在需要布尔值的表达式中使用非布尔类型
  }
}
