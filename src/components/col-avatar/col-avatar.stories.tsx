import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  variant: 'icon' | 'name' | 'full';
  name: string;
};

const meta = {
  title: 'Atoms/Avatar',
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
      options: ['icon', 'name', 'full'],
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
    variant: 'full',
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
    variant: 'full',
  },
  render: renderAvatar,
};

/**
 * Story showing an avatar with initials icon only
 */
export const IconOnly: Story = {
  args: {
    variant: 'icon',
    name: 'Jane Doe',
  },
  render: renderAvatar,
};

/**
 * Story showing an avatar with name only
 */
export const NameOnly: Story = {
  args: {
    variant: 'name',
    name: 'John Doe',
  },
  render: renderAvatar,
};
