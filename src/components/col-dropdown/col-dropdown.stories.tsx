import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type StoryArgs = {
  open: Boolean;
  disabled: Boolean;
  align: 'start' | 'end';
};

const meta = {
  title: 'Atoms/Dropdown',
  component: 'col-dropdown',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'State declaring if the dropdown is open by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a dropdown is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Determines the aligment of the content displayed inside the dropdown',
      table: {
        type: {
          summary: `'start' | 'end'`,
        },
        defaultValue: { summary: 'end' },
        category: 'Core',
      },
    },
  },
  args: {
    disabled: false,
    open: false,
    align: 'end',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ disabled, open, align }) => html``,
};
