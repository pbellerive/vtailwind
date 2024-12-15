const process = require('node:process');
const pluginVue = require('eslint-plugin-vue');
const parserVue = require('vue-eslint-parser');

module.exports = [
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
    plugins: {
      vue: pluginVue
    },
    languageOptions: {
      globals: {
        process: true
      },
      parser: parserVue,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        },
        parser: {
          js: 'espree',
          jsx: 'espree',
          ts: '@typescript-eslint/parser',
          tsx: '@typescript-eslint/parser'
        },
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      eqeqeq: ['error', 'always'],
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      ...require('eslint-config-prettier').rules
    }
  }
];
