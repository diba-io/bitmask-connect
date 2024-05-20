module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".jsx", ".tsx", ".js"],
      },
    ],
    "no-use-before-define": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "no-console": 0,
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/jsx-no-useless-fragment": [2, { allowExpressions: true }],
  },
};
