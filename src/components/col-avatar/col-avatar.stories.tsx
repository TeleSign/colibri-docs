import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { AVATAR_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  variant: AVATAR_VARIANTS;
  name: string;
};

const meta = {
  title: 'Images & Icons/Avatar',
  component: 'col-avatar',
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
      options: Object.values(AVATAR_VARIANTS),
      description: 'The display variant: icon only, name only, or both',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'full' },
      },
    },
    name: {
      control: 'text',
      description:
        'The name for the avatar, this is also used to get the initials for the avatar icon',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'John Doe' },
      },
    },
  },
  args: {
    variant: AVATAR_VARIANTS.FULL,
    name: 'John Doe',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderAvatar: Story['render'] = ({ variant, name }) => html`
  <col-avatar name=${name} variant=${variant}></col-avatar>
`;

/**
 * Default story showing an avatar with both initials icon and name
 */
export const Default: Story = {
  args: {
    name: 'John Doe',
    variant: AVATAR_VARIANTS.FULL,
  },
  render: renderAvatar,
};

/**
 * Story showing an avatar with initials icon only
 */
export const IconOnly: Story = {
  args: {
    variant: AVATAR_VARIANTS.ICON,
    name: 'Jane Doe',
  },
  render: renderAvatar,
};

/**
 * Story showing an avatar with name only
 */
export const NameOnly: Story = {
  args: {
    variant: AVATAR_VARIANTS.NAME,
    name: 'John Doe',
  },
  render: renderAvatar,
};
