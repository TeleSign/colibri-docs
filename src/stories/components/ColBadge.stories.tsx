import { html } from 'lit';
import { icons } from '@tls-ds/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';

type StoryArgs = {
  badgeText: string;
  variant: string;
  badgeIconName: string;
  isDisabled: boolean;
};

const meta = {
    title: 'Atoms/Badges',
    component: 'col-badge',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
  ## Quick Start

  \`\`\`typescript
  // Import libraries
  import { registerColibriComponents, ColBadge } from '@tls-ds/colibri';

  // Register component only one time
  registerColibriComponents([ColBadge]);

  <col-badge></col-badge>
  \`\`\`
`
            }
        }
    },
    argTypes: {
        badgeText: {
            control: 'text',
            description: 'The text of the badge',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Text' },
            }
        },
        variant: {
            control: 'select',
            options: ['info', 'warning', 'danger', 'success', 'default'],
            description: 'The variant of the badge',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            }
        },
        badgeIconName: {
            control: 'select',
            options: icons,
            description: 'If there is an icon, the name of the icon to display',
            table: {
              type: { summary: 'string' },
              defaultValue: { summary: 'lock' },
            },
          },
        isDisabled: {
            control: 'boolean',
            description: 'If the badge is disabled or not',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            }
        }
    },
    args: {
        badgeText: 'Text',
        variant: 'default',
        badgeIconName: 'home',
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
        <col-icon slot="icon" name=${args.badgeIconName}></col-icon>
        ${args.badgeText}
    </col-badge>
    `,
};

/**
 * This story showcases a badge with no icon
 */
export const NoIcon: Story = {
    render: args => html`
    <col-badge .variant=${args.variant} ?isDisabled=${args.isDisabled}> 
        ${args.badgeText}
    </col-badge>
    `,
};

/**
 * This story showcases a badge with only an icon and no text
 */
export const NoText: Story = {
    render: args => html`
    <col-badge .variant=${args.variant} ?isDisabled=${args.isDisabled}> 
        <col-icon slot="icon" name=${args.badgeIconName}></col-icon>
    </col-badge>
    `,
};