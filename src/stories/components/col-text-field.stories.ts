import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';
import { ColTextField } from '@tls-ds/colibri';

export default {
  title: 'Components/Inputs/TextField',
  tags: ['autodocs'],
  component: 'col-text-field',
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
    },
  },
} as Meta;

const Template: StoryFn<Partial<ColTextField>> = ({
  type = 'text',
  label = 'Label',
  chartCount,
  theme = 'light',
  tokens,
}) => html`
  <col-text-field
    type=${type}
    label=${label}
    .chartCount=${chartCount}
    mode=${theme}
    .tokens=${tokens}
  >
    <span slot="description-text">Optional description text</span>
    <span slot="helper-text">Helper text</span>
    <span slot="icon-left">👈</span>
    <span slot="icon-right">👉</span>
  </col-text-field>
`;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  label: 'Default Input',
  theme: 'light',
};

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = {
  ...Default.args,
  label: 'Input with Character Count',
  chartCount: 100,
};

export const Password = Template.bind({});
Password.args = {
  ...Default.args,
  type: 'password',
  label: 'Password Input',
};

export const WithoutIcons = Template.bind({});
WithoutIcons.args = {
  ...Default.args,
  label: 'Input without Icons',
};
WithoutIcons.decorators = [
  story => html`
    <style>
      [slot^='icon-'] {
        display: none;
      }
    </style>
    ${story()}
  `,
];

export const WithoutHelperText = Template.bind({});
WithoutHelperText.args = {
  ...Default.args,
  label: 'Input without Helper Text',
};
WithoutHelperText.decorators = [
  story => html`
    <style>
      [slot='helper-text'] {
        display: none;
      }
    </style>
    ${story()}
  `,
];

export const WithCustomTokens = Template.bind({});
WithCustomTokens.args = {
  ...Default.args,
  label: 'Custom Styled Input',
  tokens: {
    colors: {
      border: {
        default: 'pink',
      },
    },
  },
};
