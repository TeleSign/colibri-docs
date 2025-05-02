import { html } from 'lit';
import { icons } from '@tls-ds/colibri-icons/icons-list';
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

/**
 * Default story showing a button with an icon and text, with controls for variant
 * and isDisabled. Use the controls panel to experiment with different values.
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
      <col-icon name="trash" size="16px"></col-icon>
      Your text
      <col-icon name="chevron-down" size="20px"></col-icon>
    </col-button>
  `,
};
