import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      semi: ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];