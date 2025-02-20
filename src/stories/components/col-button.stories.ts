import { Meta, StoryFn } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';

import { ColButton, getThemeVar, BUTTON_VARIANTS, COLORS } from '@tls-ds/colibri';

export default {
  title: 'Components/Inputs/Button',
  tags: ['autodocs'],
  component: 'col-button',
  argTypes: {
    ariaLabel: {
      control: 'text',
      description:
        'ARIA Attribute which must be used when text is not set in the button, like for buttons that only contain icons',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      options: Object.values(COLORS),
      description: 'Defines the color style of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: COLORS.PRIMARY,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Defines the disabled state for the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    name: {
      control: 'text',
      description: 'Sets the name of the button',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'large'],
      description: 'Defines the size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'large',
        },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'system'],
      description: 'Defines the theme of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'light',
        },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Defines the type of button',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'button',
        },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(BUTTON_VARIANTS),
      description: 'Defines the variant style to apply to the button',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: BUTTON_VARIANTS.CONTAINED,
        },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        type: { summary: 'function' },
        defaultValue: { summary: '() => void' },
      },
      description: 'Callback function triggered when the button is clicked.',
    },
  },
  args: {
    color: COLORS.PRIMARY,
    disabled: false,
    size: 'large',
    variant: BUTTON_VARIANTS.CONTAINED,
  },
} as Meta;

const Template: StoryFn<Partial<ColButton>> = ({
  ariaLabel = '',
  color = COLORS.PRIMARY,
  disabled = false,
  name = '',
  size = 'large',
  theme = 'light',
  type = 'button',
  variant = BUTTON_VARIANTS.CONTAINED,
}) => {
  const handleClick = action('button clicked');

  return html`
    <col-button
      color=${color}
      size=${size}
      theme=${theme}
      type=${type}
      variant=${variant}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      ${name ? `name="${name}"` : ''}
      ?disabled=${disabled}
      @click=${handleClick}
    >
      Button Text
    </col-button>
  `;
};

export const PrimeryContained = Template.bind({});
PrimeryContained.args = {
  color: COLORS.PRIMARY,
};

export const DangerOutlined = Template.bind({});
DangerOutlined.args = {
  color: COLORS.DANGER,
  variant: BUTTON_VARIANTS.OUTLINED,
};

export const SuccessText = Template.bind({});
SuccessText.args = {
  color: COLORS.SUCCESS,
  variant: BUTTON_VARIANTS.TEXT,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const LogClickEvent = Template.bind({});
LogClickEvent.args = {
  handleClick: () => {
    window.console.log('Clicked button');
  },
};

export const ButtonWithAriaLabel: StoryFn<Partial<ColButton>> = () => html`
  <col-button color="primary" theme="light" variant="text" ariaLabel="Home" name="home">
    <col-icon name="lock" color="${getThemeVar('components.links.secondary.color')}"></col-icon>
  </col-button>
`;
