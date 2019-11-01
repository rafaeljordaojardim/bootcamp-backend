module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins:['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this":"off",// controolers vao estar dentro de uma classe mas nao urilizarão o this
    "no-param-reassign":"off", // permite receber parametro e fazer alteração nos parametros
    "camelcase":"off",
    "no-unused-vars" : ["error", { "argsIgnorePattern": "next" }],// as vezes não usa o next
  },
};
