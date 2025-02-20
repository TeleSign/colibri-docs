import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import { ColLink } from '@tls-ds/colibri';

export default {
  title: 'Components/Inputs/Link',
  tags: ['autodocs'],
  component: 'col-link',
  argTypes: {
    href: {
      control: 'text',
      description: 'Sets the href of the link',
      table: {
        type: { summary: 'string' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Defines the theme of the link',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'light',
        },
      },
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top', '_unfencedTop'],
      description: 'Defines the type of link',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'link',
        },
      },
    },
  },
  args: {
    href: 'https://www.google.com',
    target: '_self',
  },
} as Meta;

const Template: StoryFn<Partial<ColLink>> = ({
  href = 'https://www.google.com',
  target = '_self',
  theme = 'light',
}) => {
  return html` <col-link href=${href} target=${target} theme=${theme}> Google.com </col-link> `;
};

export const Default = Template.bind({});
Default.args = {
  theme: 'light',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  target: '_blank',
};
