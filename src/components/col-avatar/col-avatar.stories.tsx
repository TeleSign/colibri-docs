import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  hideAvatarIcon: boolean;
  hideAvatarName: boolean;
  avatarName: string;
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
    hideAvatarIcon: {
      control: 'boolean',
      description: 'Hides the avatar initials icon if true',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideAvatarName: {
      control: 'boolean',
      description: 'Hides the avatar name label if true',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    avatarName: {
      control: 'text',
      description:
        'The name for the avatar, this is also used to get the initials for the avatar icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'John Doe' },
      },
    },
  },
  args: {
    hideAvatarIcon: false,
    hideAvatarName: false,
    avatarName: 'John Doe',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing an avatar initials icon and the avatar name
 */
export const Default: Story = {
  args: {
    avatarName: 'John Doe',
  },
  render: args => html`
    <col-avatar
      .hideAvatarIcon=${args.hideAvatarIcon}
      .hideAvatarName=${args.hideAvatarName}
      .avatarName=${args.avatarName}
    ></col-avatar>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-avatar avatarName="John Doe"></col-avatar>`,
      },
    },
  },
};

/**
 * Story showing an avatar with initials icon, hiding the avatar name
 */
export const HideAvatarName: Story = {
  args: {
    hideAvatarName: true,
    avatarName: 'Jane Doe',
  },
  render: args => html`
    <col-avatar
      .hideAvatarIcon=${args.hideAvatarIcon}
      .hideAvatarName=${args.hideAvatarName}
      .avatarName=${args.avatarName}
    ></col-avatar>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-avatar hideAvatarName avatarName="Jane Doe"></col-avatar>`,
      },
    },
  },
};

/**
 * Story showing an avatar name, hiding the avatar initials icon
 */
export const HideAvatarIcon: Story = {
  args: {
    hideAvatarIcon: true,
    avatarName: 'John Doe',
  },
  render: args => html`
    <col-avatar
      .hideAvatarIcon=${args.hideAvatarIcon}
      .hideAvatarName=${args.hideAvatarName}
      .avatarName=${args.avatarName}
    ></col-avatar>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-avatar hideAvatarIcon avatarName="John Doe"></col-avatar>`,
      },
    },
  },
};
