import { Meta, StoryFn } from '@storybook/web-components';
import { icons } from '@tls-ds/colibri-icons/icons-list';
import { html, css } from 'lit';

interface StoryArgs {
  name: string;
  color: string;
  size: string;
}

export default {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  component: 'ColIcon',
  argTypes: {
    name: {
      control: 'select',
      options: icons,
      description: 'The name of the icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lock' },
      },
    },
    color: {
      control: 'color',
      description: 'The color of the icon. Can be any valid CSS color value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
      },
    },
    size: {
      control: 'text',
      description: 'The size of the icon. Can be specified in px, rem, or em',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '24px' },
      },
    },
  },
  args: {
    name: 'home',
    color: 'currentColor',
    size: '24px',
  },
  parameters: {
    docs: {
      description: {
        component: `
## Quick Start

Install the package:

\`\`\`bash
npm install @tls-ds/colibri-icons
\`\`\`

\`\`\`typescript
// Import libraries
import { registerColibriComponents } from '@tls-ds/colibri';
import { ColIcon } from '@tls-ds/colibri-icons';

// Register component only one time
registerColibriComponents([ColIcon]);

<col-icon name="home"></col-icon>
\`\`\`

## Icons library

Below you can find all available icons in the library.
        `,
      },
    },
    __sb: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '16px',
    },
  },
} as Meta<StoryArgs>;

/**
 * Styles for the icon stories using Lit's css template literal.
 * These styles are scoped to the stories and won't affect other components.
 */
const styles = css`
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .icon-name {
    font-size: 12px;
    text-align: center;
  }
`;

/**
 * Default story showing a single icon with controls for name, color, and size.
 * Use the controls panel to experiment with different values.
 */
const Template: StoryFn<StoryArgs> = args => html`
  <style>
    ${styles}
  </style>
  <col-icon name=${args.name} color=${args.color} size=${args.size}></col-icon>
`;

export const Default = Template.bind({});

/**
 * This story showcases all available icons in the library.
 * Icons are displayed in a responsive grid layout with names underneath.
 * The layout is controlled by the __sb parameter in the default export.
 */
export const AllIcons = () => html`
  <style>
    ${styles}
  </style>
  ${icons.map(
    (icon: string) => html`
      <div class="icon-item">
        <col-icon name=${icon} size="32px"></col-icon>
        <span class="icon-name">${icon}</span>
      </div>
    `
  )}
`;
