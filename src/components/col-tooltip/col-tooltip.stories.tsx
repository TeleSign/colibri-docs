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
      if: { arg: 'multiline', neq: false },
    },
    width: {
      control: 'number',
      description: 'If **multiline** property is true, defines the container width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
        category: 'Core',
      },
    },
    position: {
      control: 'select',
      options: Object.values(TOOLTIP_POSITIONS),
      description: 'Determines the position where the tooltip would be displayed',
      table: {
        type: {
          summary: Object.values(TOOLTIP_POSITIONS).join(' | '),
        },
        defaultValue: { summary: 'top' },
        category: 'Core',
      },
    },
  },
  args: {
    multiline: true,
    width: 200,
    position: TOOLTIP_POSITIONS.Top,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a default tooltip. Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  parameters: {
    __sb: {
      margin: '50px 0 0 400px',
    },
  },
  render: ({ multiline, position, width }) => html`
    <col-tooltip width=${width} position=${position} ?multiline=${multiline}>
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
  parameters: {
    __sb: {
      margin: '0 0 0 45%',
    },
  },
  render: args => html`
    <col-tooltip width=${args.width} position=${args.position} ?multiline=${args.multiline}>
      Hover me
      <div slot="tooltip-content">Tooltip message</div>
    </col-tooltip>
  `,
};

export const MultilineTooltipClick: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Right,
    multiline: true,
    width: 200,
  },
  parameters: {
    __sb: {
      margin: '0 0 0 45%',
    },
  },
  render: args => html`
    <col-tooltip width=${args.width} position=${args.position} ?multiline=${args.multiline}>
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
  parameters: {
    __sb: {
      margin: '0 0 0 45%',
    },
  },
  render: args => html`
    <col-tooltip width=${args.width} position=${args.position} ?multiline=${args.multiline}>
      <col-button variant="outlined">
        <col-icon name="info-circle"></col-icon>
      </col-button>
      <div slot="tooltip-content">Tooltip message very very large in order to see multiline</div>
    </col-tooltip>
  `,
};

export const MultilineTooltipLargeText: Story = {
  args: {
    position: TOOLTIP_POSITIONS.Top,
    multiline: true,
    width: 500,
  },
  parameters: {
    __sb: {
      margin: '30px 0 0 40%',
    },
  },
  render: args => html`
    <col-tooltip width=${args.width} position=${args.position} ?multiline=${args.multiline}>
      <col-button variant="outlined"> Click or Hover Me </col-button>
      <div slot="tooltip-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
    </col-tooltip>
  `,
};
