import globals from 'globals';
import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

import EslintConfigPrettier from 'eslint-config-prettier';
import EslintPluginReactConfig from 'eslint-plugin-react';
import EslintPluginReactHooks from 'eslint-plugin-react-hooks';
import EslintPluginReactRefresh from 'eslint-plugin-react-refresh';

/**
 * Eslint Rules, plugins, and configurations follow the upward merge rules
 */

/** @type {import('eslint').Linter.Config} */
export default [
  {
    ignores: ['node_modules/**', 'build', 'src/components/VisualEffect']
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.serviceworker, ...globals.browser, Buffer: true, process: true },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    }
  },
  {
    plugins: {
      react: EslintPluginReactConfig,
      'react-hooks': EslintPluginReactHooks,
      'react-refresh': EslintPluginReactRefresh
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }]
    }
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  EslintConfigPrettier
];
