// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import eslintPluginTs from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      typescript: tsPlugin,
      '@typescript-eslint': eslintPluginTs,
    },
    rules: {
      // Core
      ...js.configs.recommended.rules,

      // TypeScript
      ...tseslint.configs.recommended[1].rules,

      // React
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // We're using TS

      // React Hooks
      ...reactHooks.configs.recommended.rules,

      // Accessibility
      ...jsxA11y.configs.recommended.rules,

      // React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Import order
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // TypeScript tweaks
      '@typescript-eslint/no-unused-vars': 'off', // Turn off the TypeScript rule
      'no-unused-vars': 'off', // Turn off the base rule

      // Create a custom version of the rule with correct configuration
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none', // This will ignore all function arguments
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],

      'semi': ['error', 'always'],
    },
  },
  // Special rule configuration for enum files to prevent false positives
  {
    files: ['**/*.types.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off', // Turn off for .types.ts files
    },
  },
  // Special rule config for type definitions in component files
  {
    files: ['**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'none', // This will ignore all function arguments
          ignoreRestSiblings: true,
        },
      ],
    },
  },
)
