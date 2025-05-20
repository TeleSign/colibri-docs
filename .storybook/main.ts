import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  staticDirs: ['./static', './styles'],
  docs: {
    defaultName: 'Overview',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  managerHead: head => `
    ${head}
    <link rel="stylesheet" type="text/css" href="globals.css" />
  `,
  previewHead: head => `
    ${head}
    <link rel="stylesheet" type="text/css" href="preview.css" />
    <script type="text/javascript">
      window.global = window;
    </script>
  `,
  viteFinal: config => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
          '@root': resolve(__dirname, '..'),
        },
      },
      build: {
        rollupOptions: {
          input: {
            assets: resolve(__dirname, '../src/assets'),
          },
          output: {
            assetFileNames: assetInfo => {
              const extType = assetInfo.name.split('.').at(1);
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                return `assets/[name][extname]`;
              }
              return `assets/[name][extname]`;
            },
          },
        },
      },
    });
  },
};
export default config;
