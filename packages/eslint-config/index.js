const rules = require('./rules')

module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: '2018',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true,
    },
  },

  env: {
    node: true,
    browser: true,
    es6: true,
    serviceworker: true,
    phantomjs: false,
    amd: false,
  },

  globals: {
    require: true,
    Promise: true,
    process: true,
  },

  rules: rules,

  plugins: ['markdown'],
}