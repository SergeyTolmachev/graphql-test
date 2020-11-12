module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  env: {
    node: true
  },
  extends: [
    "airbnb-typescript/base",
  ],
  // add your custom rules here
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["error", 4],
    "max-len": "warn",
    "newline-before-return": "error",
    "import/no-cycle": "off",
    "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
    "no-undef": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/member-delimiter-style": "error",
    "@typescript-eslint/member-ordering": "error",
    "no-restricted-globals": "off",
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }]
  },
  overrides: [
    // to allow methods overload in typescript
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "no-dupe-class-members": "off"
      }
    }
  ]
};
