module.exports = {
  root: true,
  extends: [
    "@react-native-community"
  ],
  env: {
    'jest/globals': true,
  },
  plugins: [
    "react",
    "jest"
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "flushPromises": true
  },
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  rules: {
    "react/jsx-filename-extension": "off",
    "comma-dangle": ["error", "never"],
    "no-underscore-dangle": "off",
    "import/no-extraneous-dependencies": "off"
  },
  parser: "babel-eslint"
};
