import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import typescript from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescript,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        HTMLElement: 'readonly',
        HTMLStyleElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLPreElement: 'readonly',
        FormData: 'readonly',
        MediaQueryList: 'readonly',
        MediaQueryListEvent: 'readonly',
        CSSStyleSheet: 'readonly',
        FocusOptions: 'readonly',
        EventListener: 'readonly',
        ElementInternals: 'readonly',
        requestAnimationFrame: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-unused-vars': 'off',
    },
  },
];
