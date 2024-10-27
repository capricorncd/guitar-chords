/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 */
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  eslintPluginPrettier,
  eslintConfigPrettier,
  // 不包含以下目录或文件
  {
    ignores: [
      'playground',
      '**/dist/',
      'web',
      'build',
      'node_modules',
      '*.md',
      '*.json',
    ],
  },
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'off',
      // 'import/no-nodejs-modules': ['error', { allow: ['fs'] }],
      // '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/no-non-null-assertion': 'off',
      // node.js require('some-lib')
      // '@typescript-eslint/no-var-requires': 'off',
      // 可以使用@ts-ignore
      // '@typescript-eslint/ban-ts-comment': 'off',
    },

    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
  },
]
