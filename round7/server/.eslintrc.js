module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: 'off',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'no-console': 'off'
  }
};
