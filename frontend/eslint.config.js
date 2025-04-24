import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';
import functional from 'eslint-plugin-functional';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  functional.configs.externalVanillaRecommended,
  functional.configs.recommended,
  functional.configs.stylistic,
  functional.configs.disableTypeChecked,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  globalIgnores(['/node_modules/', 'dist', 'build']),
  js.configs.recommended,
  js.configs.all,
  stylistic.configs.customize({
    semi: true,
    indent: 2,

  }),
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'sort-imports': 'off',
      'sort-keys': 'off',
      'one-var': 'off',
      'capitalized-comments': 'off',
      'no-ternary': 'off',
      'max-lines-per-function': 'off',
      'max-statements': 'off',
      'no-negated-condition': 'off',
      'id-length': 'off',
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/indent': ['error', 2, { MemberExpression: 1 }],
      '@stylistic/brace-style': ['error', '1tbs'],
      'react/react-in-jsx-scope': 'error',
      'react/jsx-uses-react': 'error',
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
