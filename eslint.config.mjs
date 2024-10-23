/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  // 不包含以下目录
  {ignores: ['demo/**/*', '**/dist']}
];
