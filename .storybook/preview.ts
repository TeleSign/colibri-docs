import { html } from 'lit';
import type { Preview } from '@storybook/web-components';
import { registerColibriComponents } from '@tls-ds/colibri';
import { ColIcon } from '@tls-ds/colibri-icons';
import '@/assets/styles.css';

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
        order: ['Welcome', 'Components', 'Frameworks Integration', 'Developers'],
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
        <div data-theme=${context.args.mode || 'light'}> ${story()} </div>
      `;
    },
  ],
};

export default preview;
