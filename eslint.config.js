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
        window: true,
        document: true,
        setTimeout: true,
        Event: true,
        CustomEvent: true,
        Blob: true,
        URL: true,
        HTMLElement: true,
        HTMLStyleElement: true,
        HTMLInputElement: true,
        HTMLFormElement: true,
        HTMLPreElement: true,
        FormData: true,
        MediaQueryList: true,
        MediaQueryListEvent: true,
        CSSStyleSheet: true,
        requestAnimationFrame: true,
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
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
