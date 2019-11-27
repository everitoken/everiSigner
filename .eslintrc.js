module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'standard',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tslint.json',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'comma-dangle': 'off',
  },
}
