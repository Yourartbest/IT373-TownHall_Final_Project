export default [
  {
    files: ['src/**/*.js', '.eleventy.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'prefer-const': 'warn',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }]
    }
  },
  {
    ignores: ['_site/**', 'node_modules/**', 'townhall/**']
  }
]
