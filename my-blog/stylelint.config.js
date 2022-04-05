module.exports = {
  processors: [],
  extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
  plugins: ["stylelint-order"],
  rules: {
    "selector-max-id": null,
    "max-nesting-depth": 8,
    "value-keyword-case": null,
  },
  ignoreFiles: ["build/**/*"],
};
