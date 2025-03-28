import { Meta, StoryFn } from '@storybook/web-components';
import { iconList } from '@/constants/icons';
import { html } from 'lit';

export default {
  title: 'Atoms/Icons',
  tags: ['autodocs'],
  component: 'ColIcon',
  argTypes: {
    name: {
      control: 'select',
      options: iconList,
      description: 'The name of the icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lock' },
      },
    },
    color: {
      control: 'color',
      description: 'The color of the icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
      },
    },
    size: {
      control: 'text',
      description: 'The size of the icon (can be in px, rem, or em)',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '24px' },
      },
    },
  },
  args: {
    name: 'lock',
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
  },
} as Meta;

const Template: StoryFn = args => html`
  <col-icon name=${args.name} color=${args.color} size=${args.size}></col-icon>
`;

export const Default = Template.bind({});

export const AllIcons = () => html`
  <div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px; padding: 20px;"
  >
    ${iconList.map(
      icon => html`
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <col-icon name=${icon} size="32px"></col-icon>
          <span style="font-size: 12px; text-align: center;">${icon}</span>
        </div>
      `
    )}
  </div>
`;
