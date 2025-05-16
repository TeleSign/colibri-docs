import { html } from 'lit';
import { icons } from '@telesign/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  badgeText: string;
  variant: string;
  badgeIconName: string;
  disabled: boolean;
};

const meta = {
  title: 'Atoms/Badge',
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
    disabled: {
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
    disabled: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderBadge: Story['render'] = args => html`
  <col-badge .variant=${args.variant} ?disabled=${args.disabled}>
    ${args.badgeIconName &&
    html`<col-icon slot="icon" name=${args.badgeIconName} size="12px"></col-icon>`}
    ${args.badgeText}
  </col-badge>
`;

/**
 * Default story showing a badge with an icon and text, with controls for variant
 * and disabled. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  render: args => html`
    <col-badge .variant=${args.variant} ?disabled=${args.disabled}>
      <col-icon slot="icon" name=${args.badgeIconName} size="12px"></col-icon>
      ${args.badgeText}
    </col-badge>
  `,
};

/**
 * This story showcases a badge with success variant and no icon
 */
export const SuccessVariantAndNoIcon: Story = {
  render: renderBadge,
  args: {
    variant: 'success',
    badgeText: 'Success Text',
    badgeIconName: '',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-badge variant="success">Success Text</col-badge>`),
      },
    },
  },
};

/**
 * This story showcases a badge with warning variant and only an icon, no text
 */
export const WarningVariantAndNoText: Story = {
  render: renderBadge,
  args: {
    variant: 'warning',
    badgeText: '',
    badgeIconName: 'trash',
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-badge variant="warning">
            <col-icon slot="icon" name="trash" size="12px"></col-icon>
          </col-badge>`
        ),
      },
    },
  },
};

/**
 * This story showcases a badge with info variant and disabled
 */
export const InfoVariantAndDisabled: Story = {
  render: renderBadge,
  args: {
    variant: 'info',
    badgeText: 'Info Disabled',
    badgeIconName: 'info-circle',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-badge variant="info" disabled>
            <col-icon slot="icon" name="info-circle" size="12px"></col-icon>
              Info Disabled
          </col-badge>`
        ),
      },
    },
  },
};
