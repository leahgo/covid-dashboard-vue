module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    // "plugin:vue/essential",
    'plugin:vue/strongly-recommended',
    // '@vue/standard',
    // "eslint:recommended",
    // "plugin:prettier/recommended"
  ],
  parserOptions: {
    "parser": "babel-eslint"
  },
  rules: {
    "no-new": 0,
    "no-extend-native": 0,
    "no-undef": 0,
    "no-useless-escape": 0
  }
}