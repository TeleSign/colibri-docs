import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import { ColPill, COLORS, SIZES } from '@tls-ds/colibri';

export default {
  title: 'Components/Misc/Pill',
  tags: ['autodocs'],
  component: 'col-pill',
  argTypes: {
    color: {
      control: 'select',
      options: Object.values(COLORS),
      description: 'Defines the color scheme of the pill',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    shape: {
      control: 'select',
      options: ['circle', 'rectangle'],
      description: 'Defines the shape of the pill',
      table: {
        defaultValue: {
          summary: 'circle',
        },
      },
    },
    size: {
      control: 'select',
      options: Object.values(SIZES),
      description: 'Defines the size of the pill',
      table: {
        defaultValue: {
          summary: 'sm',
        },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Theme mode for the pill',
    },
    tokens: {
      control: 'object',
    },
  },
} as Meta;

const Template: StoryFn<Partial<ColPill>> = ({
  color = COLORS.PRIMARY,
  shape = 'circle',
  size = SIZES.SM,
  theme = 'light',
  tokens,
}) => html`
  <col-pill color=${color} shape=${shape} size=${size} mode=${theme} .tokens=${tokens}>
    PP
  </col-pill>
`;

export const Default = Template.bind({});
Default.args = {
  color: COLORS.PRIMARY,
  shape: 'circle',
  size: SIZES.SM,
  theme: 'light',
};

export const WithCustomSizeOverrideTokens = Template.bind({});
WithCustomSizeOverrideTokens.args = {
  ...Default.args,
  tokens: {
    circle: {
      sm: '100px',
    },
  },
};
