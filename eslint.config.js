import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import vue from 'eslint-plugin-vue';
import * as babelParser from '@babel/eslint-parser';
import * as vueParser from 'vue-eslint-parser';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    resolvePluginsRelativeTo: import.meta.dirname,
    recommendedConfig: js.configs.recommended
});

export default [
    js.configs.recommended,
    ...compat.extends(
        'plugin:vue/vue3-recommended',
        'eslint-config-standard'
    ),
    {
        files: ['**/*.{js,vue}'],
        ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', 'test/unit/*', 'test/*'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: babelParser,
                sourceType: 'module'
            },
            globals: {
                ...globals.node,
                'vue/setup-compiler-macros': true
            }
        },
        plugins: {
            vue
        },
        rules: {
            'semi': ['error', 'always'],
            'vue/multi-word-component-names': 'off',
            'vue/html-indent': ['error', 2],
            'vue/max-attributes-per-line': ['error', {
                'singleline': 3,
                'multiline': 1
            }],
            'vue/no-v-html': 'error',
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
        }
    },
    {
        files: ['**/*.spec.js', '**/*.test.js'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.mocha
            }
        }
    },
    prettier
];
