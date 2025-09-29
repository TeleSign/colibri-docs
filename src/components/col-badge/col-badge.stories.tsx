import { html } from 'lit';
import { icons } from '@telesign/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { BADGE_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  text: string;
  variant: string;
  icon: string;
  disabled: boolean;
};

const meta = {
  title: 'Feedback/Badge',
  component: 'col-badge',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(BADGE_VARIANTS),
      description: "The semantic variant that determines the badge's appearance and color",
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the badge is in a disabled state',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    text: {
      control: 'text',
      description:
        'The text content of the badge. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: 'Text' },
      },
      if: { arg: 'text', neq: '' },
    },
    icon: {
      control: 'select',
      options: icons,
      description:
        'Name of the icon to display in the icon slot. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: 'emoji-circle' },
      },
      if: { arg: 'icon', neq: '' },
    },
  },
  args: {
    variant: BADGE_VARIANTS.DEFAULT,
    disabled: false,
    text: '',
    icon: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderBadge: Story['render'] = args => html`
  <col-badge variant=${args.variant} ?disabled=${args.disabled}>
    ${args.icon && html`<col-icon slot="icon" name=${args.icon} size="12px"></col-icon>`}
    ${args.text}
  </col-badge>
`;

/**
 * Default story showing a badge with an icon and text, with controls for variant
 * and disabled. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  args: {
    text: 'Text',
    icon: 'emoji-circle',
  },
  render: renderBadge,
};

/**
 * This story showcases a badge with success variant and no icon
 */
export const SuccessVariantNoIcon: Story = {
  args: {
    variant: BADGE_VARIANTS.SUCCESS,
    text: 'Success Text',
  },
  render: renderBadge,
};

/**
 * This story showcases a badge with warning variant and only an icon, no text
 */
export const WarningVariantNoText: Story = {
  args: {
    variant: BADGE_VARIANTS.WARNING,
    icon: 'trash',
  },
  render: renderBadge,
};

/**
 * This story showcases a badge with danger variant and icon and text
 */
export const DangerVariantIconText: Story = {
  args: {
    variant: BADGE_VARIANTS.DANGER,
    icon: 'trash',
    text: 'Danger Text',
  },
  render: renderBadge,
};

/**
 * This story showcases a badge with info variant and disabled
 */
export const InfoVariantDisabled: Story = {
  args: {
    variant: BADGE_VARIANTS.INFO,
    icon: 'info-circle',
    text: 'Info Disabled',
    disabled: true,
  },
  render: renderBadge,
};
