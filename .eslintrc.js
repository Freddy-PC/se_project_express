module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-underscore-dangler": ["error", { allow: ["_id"] }],
  },
};

// rule 1: disallow dangling underscores in identifiers
