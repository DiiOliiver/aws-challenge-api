import eslintPluginTs from "@typescript-eslint/eslint-plugin";
import eslintParserTs from "@typescript-eslint/parser";
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: eslintParserTs,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTs,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "prettier/prettier": "error",
    },
  },
];
