import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    },
    plugins: {
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  },
];
