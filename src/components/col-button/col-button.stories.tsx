import { html, nothing } from 'lit';
import { fn } from '@storybook/test';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { BUTTON_SIZES, BUTTON_VARIANTS, COLORS } from '@telesign/colibri';

type StoryArgs = {
  ariaLabel: string;
  color: COLORS;
  disabled: boolean;
  name: string;
  size: BUTTON_SIZES;
  type: 'button' | 'submit' | 'reset';
  variant: BUTTON_VARIANTS;
  onClick?: () => void;
};

const meta = {
  title: 'Atoms/Button',
  component: 'col-button',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      control: 'text',
      description: 'The text set as aria-label in the button',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'Text' },
      },
    },
    color: {
      control: 'select',
      options: Object.values(COLORS),
      description: 'The color for the button',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a button is disabled or not',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Normal name attribute for button html elements',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(BUTTON_SIZES),
      description: 'The size for the button',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of button',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    variant: {
      control: 'select',
      options: Object.values(BUTTON_VARIANTS),
      description: 'The variant for the button',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function that is called when the button is clicked.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    color: COLORS.DEFAULT,
    disabled: false,
    name: 'default',
    size: BUTTON_SIZES.MEDIUM,
    type: 'button',
    variant: BUTTON_VARIANTS.DEFAULT,
    ariaLabel: '',
    onClick: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderButton: Story['render'] = ({
  ariaLabel,
  color,
  disabled,
  name,
  size,
  type,
  variant,
  onClick,
}) => html`
  <col-button
    color=${color}
    ?disabled=${disabled}
    name=${name}
    size=${size}
    type=${type}
    variant=${variant}
    aria-label=${ariaLabel || nothing}
    @click=${onClick}
  >
    Your text
  </col-button>
`;

/**
 * Default story showing a default text button. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant, onClick }) => html`
    <col-button
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
      aria-label=${ariaLabel || nothing}
      @click=${onClick}
    >
      Your text
    </col-button>
  `,
};

/**
 * This story showcases a primary button
 */
export const PrimaryButton: Story = {
  args: {
    ariaLabel: 'Primary call-to-action button',
    color: COLORS.PRIMARY,
    name: 'cta',
  },
  render: renderButton,
};

/**
 * This story showcases a large danger outlined button
 */
export const LargeDangerOutlineButton: Story = {
  args: {
    ariaLabel: 'Cancel action',
    color: COLORS.DANGER,
    name: 'cta',
    size: BUTTON_SIZES.LARGE,
    variant: BUTTON_VARIANTS.OUTLINED,
  },
  render: renderButton,
};

/**
 * This story showcases a large danger outlined button
 */
export const SmallSuccessPlainButton: Story = {
  args: {
    ariaLabel: 'Secondary action',
    color: COLORS.SUCCESS,
    name: 'success',
    size: BUTTON_SIZES.SMALL,
    variant: BUTTON_VARIANTS.PLAIN,
  },
  render: renderButton,
};

/**
 * This story showcases an icon button
 */
export const IconButton: Story = {
  args: {
    ariaLabel: 'Delete action',
    color: COLORS.DANGER,
    name: 'delete',
  },
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
      aria-label=${ariaLabel || nothing}
    >
      <col-icon name="trash" size="16px"></col-icon>
    </col-button>
  `,
};

/**
 * This story showcases a button with disclosure
 */
export const ButtonWithDisclosure: Story = {
  args: {
    ariaLabel: 'Dropdown',
    color: COLORS.PRIMARY,
    name: 'dropdown',
  },
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
      aria-label=${ariaLabel || nothing}
    >
      Your text
      <col-icon name="chevron-down" size="16px"></col-icon>
    </col-button>
  `,
};

/**
 * This story showcases a button with badge and disclosure
 */
export const ButtonWithBadge: Story = {
  args: {
    ariaLabel: 'Button with badge',
    color: COLORS.SUCCESS,
    name: 'badge',
    variant: BUTTON_VARIANTS.PLAIN,
  },
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
      aria-label=${ariaLabel || nothing}
    >
      Your text
      <col-badge variant="success">0</col-badge>
    </col-button>
  `,
};

/**
 * This story showcases a button with everything
 */
export const ButtonWithEverything: Story = {
  args: {
    ariaLabel: 'Button with all components',
    color: COLORS.PRIMARY,
    name: 'everything',
  },
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
      aria-label=${ariaLabel || nothing}
    >
      <col-icon name="2way" size="16px"></col-icon>
      Button
      <col-badge>0</col-badge>
      <col-icon name="chevron-down" size="16px"></col-icon>
    </col-button>
  `,
};
