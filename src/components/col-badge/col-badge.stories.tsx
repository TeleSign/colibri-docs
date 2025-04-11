import { html } from 'lit';
import { icons } from '@tls-ds/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  badgeText: string;
  variant: string;
  badgeIconName: string;
  isDisabled: boolean;
};

const meta = {
  title: 'Atoms/Badges',
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
    badgeText: {
      control: 'text',
      description: 'The text of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Text' },
      },
    },
    variant: {
      control: 'select',
      options: ['info', 'warning', 'danger', 'success', 'default'],
      description: 'The variant of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    badgeIconName: {
      control: 'select',
      options: icons,
      description: 'If there is an icon, the name of the icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'emoji-circle' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'If the badge is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    badgeText: 'Text',
    variant: 'default',
    badgeIconName: 'emoji-circle',
    isDisabled: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a badge with an icon and text, with controls for variant
 * and isDisabled. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  render: args => html`
    <col-badge .variant=${args.variant} ?isDisabled=${args.isDisabled}>
      <col-icon slot="icon" name=${args.badgeIconName} size="20px"></col-icon>
      ${args.badgeText}
    </col-badge>
  `,
};

/**
 * This story showcases a badge with success variant and no icon
 */
export const SuccessVariantAndNoIcon: Story = {
  render: () => html` <col-badge variant="success"> Success Text </col-badge> `,
};

/**
 * This story showcases a badge with warning variant and only an icon, no text
 */
export const WarningVariantAndNoText: Story = {
  render: () => html`
    <col-badge variant="warning">
      <col-icon slot="icon" name="trash" size="20px"></col-icon>
    </col-badge>
  `,
};

/**
 * This story showcases a badge with info variant and disabled
 */
export const InfoVariantAndDisabled: Story = {
  render: () => html`
    <col-badge variant="info" isDisabled>
      <col-icon slot="icon" name="info-circle" size="20px"></col-icon>
      Info disabled
    </col-badge>
  `,
};
