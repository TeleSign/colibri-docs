import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
    '!../src/blocks/*.mdx',
    '!../src/blocks/**/*.mdx'
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../src'),
        }
      },
      build: {
        rollupOptions: {
          input: {
            assets: resolve(__dirname, '../src/assets')
          },
          output: {
            assetFileNames: (assetInfo) => {
              const extType = assetInfo.name.split('.').at(1);
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                return `assets/[name][extname]`;
              }
              return `assets/[name][extname]`;
            }
          },
        }
      }
    });
  }
};
export default config;
