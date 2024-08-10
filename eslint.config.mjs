import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    env: {
      node: true,
      browser: true
    },
    globals: globals.browser,
    extends: pluginJs.configs.recommended,
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-process-env": "off"
    }
  }
];
