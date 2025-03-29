/**
 * This is an example story for Storybook documentation.
 * It demonstrates the usage patterns and documentation structure
 * that should be followed in the actual stories.
 *
 * @important
 * This is a temporary implementation for documentation purposes.
 * TODO: Delete this file once the real TextField component implementation begins.
 */

import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import '@/common/ExampleTextField';

export default {
  title: 'Molecules/Example/TextField',
  tags: ['autodocs'],
  component: 'example-text-field',
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Input type',
      table: {
        defaultValue: {
          summary: 'text',
        },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    chartCount: {
      control: 'number',
      description: 'Maximum number of characters allowed',
    },
    tokens: {
      control: 'object',
      description: 'Custom tokens for styling the component',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'An example implementation of a text field component. This demonstrates the expected API, styling capabilities, and behavior patterns.<br/> **To be deleted once the real TextField component implementation begins.**',
      },
    },
  },
} as Meta;

const Template: StoryFn = args => html`
  <example-text-field
    type=${args.type}
    label=${args.label}
    .chartCount=${args.chartCount}
    mode=${args.theme}
    .tokens=${args.tokens}
  >
    ${args.showIcons
      ? html`
          <span slot="icon-left" class="icon-left">👈</span>
          <span slot="icon-right" class="icon-right">👉</span>
        `
      : ''}
    ${args.showHelperText ? html` <span slot="helper-text">Helper text</span> ` : ''}
  </example-text-field>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  label: 'Default Input',
  theme: 'light',
  showIcons: false,
  showHelperText: false,
};

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = {
  ...Default.args,
  chartCount: 100,
  showHelperText: false,
};

export const Password = Template.bind({});
Password.args = {
  ...Default.args,
  type: 'password',
  showHelperText: false,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...Default.args,
  showIcons: true,
  showHelperText: false,
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  ...Default.args,
  showIcons: false,
  showHelperText: true,
};

export const WithCustomTokens = Template.bind({});
WithCustomTokens.args = {
  ...Default.args,
  showIcons: false,
  showHelperText: false,
  tokens: {
    colors: {
      border: {
        default: '#ff69b4', // Hot pink
      },
      background: {
        default: '#fff0f5', // Light pink
      },
      text: {
        default: '#c71585', // Medium violet red
      },
      icon: {
        default: '#db7093', // Pale violet red
      },
      helper: {
        default: '#ff69b4', // Hot pink
      },
      label: {
        default: '#c71585', // Medium violet red
      },
    },
  },
};
