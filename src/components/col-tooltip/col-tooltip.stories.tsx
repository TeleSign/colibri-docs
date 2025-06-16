import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { TOOLTIP_POSITIONS } from '@telesign/colibri';

type StoryArgs = {
  multiline: Boolean;
  width: Number;
  position: TOOLTIP_POSITIONS;
};

const meta = {
  title: 'Atoms/Tooltip',
  component: 'col-tooltip',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    multiline: {
      control: 'boolean',
      description: 'Determines if the text of the tooltip will fit in one or more lines',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    width: {
      control: 'number',
      description: 'Defines the container width and the multiline text behavior',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
        category: 'Core',
      },
    },
    position: {
      control: 'select',
      options: Object.keys(TOOLTIP_POSITIONS),
      description: 'Determines the position that be displayed the tooltip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'top' },
        category: 'Core',
      },
    },
  },
  args: {
    multiline: true,
    width: 300,
    position: TOOLTIP_POSITIONS.Right,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a default tooltip. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  render: ({ multiline, position, width }) => html`
    <col-tooltip ?multiline=${multiline} width=${width} position=${position}>
      <col-button variant="outlined">
        <col-icon name="trash"></col-icon>
        Delete Item
      </col-button>
      <div slot="tooltip-content">Tooltip message very very large in order to see multiline</div>
    </col-tooltip>
  `,
};

export const SinglelineTooltipHover: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Bottom,
    multiline: false,
  },
  render: args => html`
    <div style="margin-left: 45%;">
      <col-tooltip ?multiline=${args.multiline} width=${args.width} position=${args.position}>
        Hover me
        <div slot="tooltip-content">Tooltip message</div>
      </col-tooltip>
    </div>
  `,
};

export const MultilineTooltipClick: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Right,
    multiline: true,
    width: 200,
  },
  render: args => html`
    <col-tooltip ?multiline=${args.multiline} width=${args.width} position=${args.position}>
      <col-button variant="outlined"> Click Me </col-button>
      <div slot="tooltip-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
    </col-tooltip>
  `,
};

export const SinglelineTooltipKeyboard: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Left,
    multiline: true,
    width: 200,
  },
  render: args => html`
    <div style="margin-left: 45%;">
      <col-tooltip ?multiline=${args.multiline} width=${args.width} position=${args.position}>
        <col-button variant="outlined">
          <col-icon name="info-circle"></col-icon>
        </col-button>
        <div slot="tooltip-content">Tooltip message very very large in order to see multiline</div>
      </col-tooltip>
    </div>
  `,
};

export const MultilineTooltipLargeText: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Top,
    multiline: true,
    width: 500,
  },
  render: args => html`
    <div style="margin: 30px 0 0 40%;">
      <col-tooltip ?multiline=${args.multiline} width=${args.width} position=${args.position}>
        <col-button variant="outlined"> Click or Hover Me </col-button>
        <div slot="tooltip-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </div>
      </col-tooltip>
    </div>
  `,
};
