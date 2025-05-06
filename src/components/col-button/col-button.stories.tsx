import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { BUTTON_SIZES, BUTTON_VARIANTS, COLORS } from '@tls-ds/colibri';

type StoryArgs = {
  ariaLabel: string;
  color: COLORS;
  disabled: Boolean;
  name: string;
  size: BUTTON_SIZES;
  type: 'button' | 'submit' | 'reset';
  variant: BUTTON_VARIANTS;
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
      control: 'text',
      description: 'The text set as aria-label in the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Text' },
      },
    },
    color: {
      control: 'select',
      options: Object.keys(COLORS),
      description: 'The color for the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'DEFAULT' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a button is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    name: {
      control: 'text',
      description: 'Normal name attribute for button html elements',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: 'select',
      options: Object.keys(BUTTON_SIZES),
      description: 'The size for the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'MEDIUM' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
      },
    },
    variant: {
      control: 'select',
      options: Object.keys(BUTTON_VARIANTS),
      description: 'The variant for the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'DEFAULT' },
      },
    },
  },
  args: {
    ariaLabel: 'Default button for storybook',
    color: COLORS.DEFAULT,
    disabled: false,
    name: 'default',
    size: BUTTON_SIZES.MEDIUM,
    type: 'button',
    variant: BUTTON_VARIANTS.DEFAULT,
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
}) => html`
  <col-button
    ariaLabel=${ariaLabel}
    color=${color}
    ?disabled=${disabled}
    name=${name}
    size=${size}
    type=${type}
    variant=${variant}
  >
    Your text
  </col-button>
`;

/**
 * Default story showing a default text button. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      ariaLabel=${ariaLabel}
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
    >
      Your text
    </col-button>
  `,
};

/**
 * This story showcases a primary button
 */
export const PrimaryButton: Story = {
  render: renderButton,
  args: {
    ariaLabel: 'Primary call-to-action button',
    color: COLORS.PRIMARY,
    name: 'cta',
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Primary call-to-action button" color="primary" name="cta">Your text</col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases a large danger outlined button
 */
export const LargeDangerOutlineButton: Story = {
  render: renderButton,
  args: {
    ariaLabel: 'Cancel action',
    color: COLORS.DANGER,
    name: 'cta',
    size: BUTTON_SIZES.LARGE,
    variant: BUTTON_VARIANTS.OUTLINED,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Cancel action" color="danger" name="cancel" size="large" variant="outlined">Your text</col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases a large danger outlined button
 */
export const SmallSuccessPlainButton: Story = {
  render: renderButton,
  args: {
    ariaLabel: 'Secondary action',
    color: COLORS.SUCCESS,
    name: 'success',
    size: BUTTON_SIZES.SMALL,
    variant: BUTTON_VARIANTS.PLAIN,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Secondary action" color="success" name="success" size="small" variant="plain">Your text</col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases an icon button
 */
export const IconButton: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      ariaLabel=${ariaLabel}
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
    >
      <col-icon name="trash" size="16px"></col-icon>
    </col-button>
  `,
  args: {
    ariaLabel: 'Delete action',
    color: COLORS.DANGER,
    name: 'delete',
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Delete action" color="danger" name="delete" ><col-icon name="trash" size="16px"></col-icon></col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases a button with disclosure
 */
export const ButtonWithDisclosure: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      ariaLabel=${ariaLabel}
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
    >
      Your text
      <col-icon name="chevron-down" size="16px"></col-icon>
    </col-button>
  `,
  args: {
    ariaLabel: 'Dropdown',
    color: COLORS.PRIMARY,
    name: 'dropdown',
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Dropdown" color="primary" name="dropdown">Your text<col-icon name="chevron-down" size="16px"></col-icon></col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases a button with badge and disclosure
 */
export const ButtonWithBadge: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      ariaLabel=${ariaLabel}
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
    >
      Your text
      <col-badge variant="success">0</col-badge>
    </col-button>
  `,
  args: {
    ariaLabel: 'Button with badge',
    color: COLORS.SUCCESS,
    name: 'badge',
    variant: BUTTON_VARIANTS.PLAIN,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Button with badge" color="success" name="badge" variant="plain">Your text<col-badge variant="success">0</col-badge></col-button>`
        ),
      },
    },
  },
};

/**
 * This story showcases a button with everything
 */
export const ButtonWithEverything: Story = {
  render: ({ ariaLabel, color, disabled, name, size, type, variant }) => html`
    <col-button
      ariaLabel=${ariaLabel}
      color=${color}
      ?disabled=${disabled}
      name=${name}
      size=${size}
      type=${type}
      variant=${variant}
    >
      <col-icon name="2way" size="16px"></col-icon>
      Button
      <col-badge>0</col-badge>
      <col-icon name="chevron-down" size="16px"></col-icon>
    </col-button>
  `,
  args: {
    ariaLabel: 'Button with all components',
    color: COLORS.PRIMARY,
    name: 'everything',
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-button ariaLabel="Button with all components" color="primary" name="everything"><col-icon name="2way" size="16px"></col-icon>Button<col-badge>0</col-badge><col-icon name="chevron-down" size="16px"></col-icon></col-button>`
        ),
      },
    },
  },
};
