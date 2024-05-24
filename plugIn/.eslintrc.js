module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ['tsconfig.json'], // eslint规则
        //"extraFileExtensions": ['.vue'], //解决Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser.The file does not match your project config: src\components\assembly\tableAssembly\Table.vue.The extension for the file (.vue) is non-standard. You should add "parserOptions.extraFileExtensions" to your config.
        "tsconfigRootDir": __dirname,
        "ecmaFeatures": {
            "jsx": true
        },
        "settings": {
            "react": {
              "version": "detect" // 自动检测React版本
            }
        },
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
    }
}
