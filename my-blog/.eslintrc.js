module.exports = {
  globals: {
    __dirname: true,
    process: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  // extends: ["alloy", "alloy/react", "alloy/typescript"],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "@typescript-eslint/no-var-requires": 0,
  },
};
