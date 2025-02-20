import { html } from 'lit';
import type { Preview } from '@storybook/web-components';
import { registerColibriComponents, ColCard, ColButton, ColLink, ColTextField, ColPill } from '@tls-ds/colibri';
import { ColIcon } from '@tls-ds/colibri-icons';
import '@tls-ds/colibri/styles/global.css';
import '@tls-ds/colibri/styles/themes/light.css';
import '@/assets/styles.css';

registerColibriComponents([ColIcon, ColCard, ColButton, ColLink, ColTextField, ColPill]);

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
