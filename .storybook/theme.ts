import { create } from '@storybook/theming';

export const customTheme = create({
  base: 'light',
  brandTitle: 'Colibri',
  brandTarget: '_self',
  brandImage: 'colibri.png',

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',
})
