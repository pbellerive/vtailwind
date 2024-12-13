import process from 'node:process';
import pluginVue from 'eslint-plugin-vue';
import * as parserVue from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
    languageOptions: {
      globals: {
        process: true
      },
      parser: parserVue,
      parserOptions: {
        ecmaVersion: 'latest',
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
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      eqeqeq: ['error', 'always']
    }
  },
  {
    files: ['**/*.vue'],
    plugins: {
      vue: pluginVue
    },
    rules: {
      ...pluginVue.configs['flat/recommended'].rules,
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-tags-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineProps', 'defineEmits']
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          }
        }
      ],
      'vue/no-unused-refs': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/html-indent': ['error', 2],
      'vue/script-indent': ['error', 2],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3
          },
          multiline: {
            max: 1
          }
        }
      ]
    }
  }
];
