import { html } from 'lit';
import type { Preview } from '@storybook/web-components';
import { registerColibriComponents } from '@tls-ds/colibri';
import { ColIcon } from '@tls-ds/colibri-icons';
import '@tls-ds/colibri/styles/global.css';
import '@tls-ds/colibri/styles/theme-default.css';
import '@/styles/globals.css';

registerColibriComponents([ColIcon]);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Welcome', 'Atoms', 'Molecules', 'Organisms', 'Tokens'],
      }
    }
  },
  decorators: [
    (story, context) => {
      // Skip decorator if disableThemeProvider is true
      if (context.parameters.disableThemeProvider) {
        return story();
      }

      return html`
        <div data-theme=${context.args.mode || 'default'}> ${story()} </div>
      `;
    },
  ],
};

export default preview;
