import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { DIVIDER_ORIENTATIONS } from '@telesign/colibri';

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
      options: Object.values(DIVIDER_ORIENTATIONS),
      description: 'The orientation of the divider (horizontal or vertical)',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
  args: {
    orientation: DIVIDER_ORIENTATIONS.HORIZONTAL,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a divider with horizontal orientation
 * Use the controls panel to see a divider with vertical orientation
 */
export const Default: Story = {
  render: args => html` <col-divider orientation=${args.orientation}></col-divider> `,
};

/**
 * Story showing a divider with a vertical orientation
 */
export const Vertical: Story = {
  args: {
    orientation: DIVIDER_ORIENTATIONS.VERTICAL,
  },
  parameters: {
    __sb: {
      display: 'flex',
      justifyContent: 'center',
      height: '400px',
      width: '100%',
    },
  },
  render: args => html` <col-divider orientation=${args.orientation}></col-divider> `,
};
