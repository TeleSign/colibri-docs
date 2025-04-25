import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  orientation: string;
};

const meta = {
  title: 'Atoms/Divider',
  component: 'col-divider',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the divider',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a divider with horizontal orientation
 * Use the controls panel to see a divider with vertical orientation
 */
export const Default: Story = {
  render: args =>
    html`<div style="height: 200px;">
      <col-divider .orientation=${args.orientation}></col-divider>
    </div>`,
};

/**
 * Story showing a divider with a vertical orientation
 */
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: args => html`
    <div style="height: 200px; width: 400px;">
      <col-divider .orientation=${args.orientation}></col-divider>
    </div>
  `,
};
