module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    // "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/coverage/**/*",
    "jest.config.ts",
    ".eslintrc.js",
    "tsconfig.json",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "semi": [1, "never"],
    "indent": ["error", 2, {
      SwitchCase: 1,
      // https://stackoverflow.com/questions/43301014/eslint-expected-indentation-of-1-tab-but-found-4-spaces-error
      ignoredNodes: ["ConditionalExpression"],
    }],
    "import/no-unresolved": 0,
    "camelcase": 0,
    "max-len": 0,
    "comma-style": ["error", "last"],
  },
}
