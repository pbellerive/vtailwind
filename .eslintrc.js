module.exports = {
    root: true,
    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2022,
        parser: '@babel/eslint-parser',
        requireConfigFile: false
    },
    plugins: [
        'vue'
    ],
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
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                mocha: true
            }
        }
    ]
};
