const { resolve } = require('path');

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  env: {
    browser: true
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',

    '@hjtech/eslint-config/common',
    '@hjtech/eslint-config/file-progress'
  ],
  parserOptions: {
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue']
    // createDefaultProgram: true
  },
  overrides: [
    {
      files: ['*.js'],
      env: {
        node: true,
        es6: true
      }
    },
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx', '*.vue'],
      env: {
        browser: true,
        node: true
      },
      extends: [
        '@hjtech/eslint-config/ts',
        '@hjtech/eslint-config/ts/type-checking',
        '@hjtech/eslint-config/vue/vue3',
        '@hjtech/eslint-config/import'
      ],
      rules: {
        'no-undef': 0,
        'import/no-unresolved': 'off',
        'import/named': 'off',
        'import/order': ['error', {'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object']}]
      }
    }
  ]
}
