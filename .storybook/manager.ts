import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const customTheme = create({
  base: 'dark',
  brandTitle: 'Colibri',
  brandTarget: '_self',
  brandImage: '/assets/colibri.png',
  appBg: '#1b3e5a',
  textColor: '#fff'
})

addons.setConfig({
  theme: customTheme,
});