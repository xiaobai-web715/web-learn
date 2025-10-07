import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },
    {
        rules: {
            // 将错误降级为警告
            'react/display-name': 'warn',
            'react-hooks/rules-of-hooks': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'react/jsx-key': 'warn',
            '@typescript-eslint/no-wrapper-object-types': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
];

export default eslintConfig;
