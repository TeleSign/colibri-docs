import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { STATUS_STATES } from '@telesign/colibri';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  dot: boolean;
  status: string;
  statusText: string;
  iconName: string;
};

const meta = {
  title: 'Atoms/Status',
  component: 'col-status',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: Object.values(STATUS_STATES),
      description: 'The status state of the component',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'neutral' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Whether to display a visual dot indicator',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'dot', neq: false },
    },
    statusText: {
      control: 'text',
      description:
        'The text content to display in the status. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: 'Neutral' },
      },
      if: { arg: 'statusText', neq: '' },
    },
    iconName: {
      control: 'text',
      description:
        'Name of the icon to display in the status. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'iconName', neq: '' },
    },
  },
  args: {
    status: STATUS_STATES.NEUTRAL,
    dot: false,
    statusText: '',
    iconName: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderStatus: Story['render'] = ({ dot, status, statusText, iconName }) => html`
  <col-status status=${status} ?dot=${dot}>
    ${iconName ? html`<col-icon name=${iconName}></col-icon>` : ''} ${statusText}
  </col-status>
`;

/**
 * Default story showing a Status component without dot or icon
 */
export const Default: Story = {
  render: ({ dot, status }) => html`
    <col-status ?dot=${dot} status=${status}>Neutral</col-status>
  `,
};

/**
 * This story showcases an Neutral Status component with icon
 */
export const StatusNeutral: Story = {
  args: {
    status: STATUS_STATES.NEUTRAL,
    statusText: 'Neutral',
    iconName: 'check-circle-fill',
  },
  render: renderStatus,
};

/**
 * This story showcases an Pending Status component with icon
 */
export const StatusPending: Story = {
  args: {
    status: STATUS_STATES.PENDING,
    statusText: 'To be approved',
    iconName: 'three-dots-circle-fill',
  },
  render: renderStatus,
};

/**
 * This story showcases an In Progress Status component with icon
 */
export const StatusInProgress: Story = {
  args: {
    status: STATUS_STATES.INPROGRESS,
    statusText: 'In Progress',
    iconName: 'a-third-circle',
  },
  render: renderStatus,
};

export const StatusCancel: Story = {
  args: {
    status: STATUS_STATES.CANCEL,
    statusText: 'Cancelled',
    iconName: 'close-circle',
  },
  render: renderStatus,
};

/**
 * This story showcases an Complete Status component with icon
 */
export const StatusComplete: Story = {
  args: {
    status: STATUS_STATES.COMPLETE,
    statusText: 'Finalized',
    iconName: 'check-circle',
  },
  render: renderStatus,
};

/**
 * This story showcases a Status component with a dot
 */
export const StatusWithDot: Story = {
  args: {
    dot: true,
    statusText: 'Neutral',
  },
  render: renderStatus,
};

/**
 * This story showcases a Status Pending component with a dot
 */
export const StatusPendingWithDot: Story = {
  args: {
    status: STATUS_STATES.PENDING,
    statusText: 'To be approved',
    dot: true,
  },
  render: renderStatus,
};

/**
 * This story showcases a Status In Progress component with a dot
 */
export const StatusInProgressWithDot: Story = {
  args: {
    status: STATUS_STATES.INPROGRESS,
    statusText: 'In Progress',
    dot: true,
  },
  render: renderStatus,
};

/**
 * This story showcases a Status Complete component with a dot
 */
export const StatusCompleteWithDot: Story = {
  args: {
    status: STATUS_STATES.COMPLETE,
    statusText: 'Finalized',
    dot: true,
  },
  render: renderStatus,
};

/**
 * This story showcases a Status component with a dot
 */
export const StatusCancelWithDot: Story = {
  args: {
    status: STATUS_STATES.CANCEL,
    statusText: 'Cancelled',
    dot: true,
  },
  render: renderStatus,
};
