import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { STATUS_STATES } from '@telesign/colibri';
import { disableControls } from '@/utils';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  dot: boolean;
  status: STATUS_STATES;
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
    dot: {
      control: 'boolean',
      description: 'If the status component should show a dot or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    dot: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderStatus: Story['render'] = ({ dot, status }) => html`
  <col-status ?dot=${dot} status=${status}> Neutral </col-status>
`;

/**
 * Default story showing a Status component without dot or icon
 */
export const Default: Story = {
  render: ({ dot, status }) => html`
    <col-status ?dot=${dot} status=${status}> Neutral </col-status>
  `,
};

/**
 * This story showcases an Neutral Status component with icon
 */
export const StatusNeutral: Story = {
  render: ({ status }) =>
    html` <col-status status=${status}>
      <col-icon name="check-circle-fill"></col-icon>
      In Progress
    </col-status>`,
  argTypes: disableControls('dot'),
  args: {
    status: STATUS_STATES.NEUTRAL,
  },
};

/**
 * This story showcases an Pending Status component with icon
 */
export const StatusPending: Story = {
  render: ({ status }) =>
    html` <col-status status=${status}>
      <col-icon name="three-dots-circle-fill"></col-icon>
      To be approved
    </col-status>`,
  argTypes: disableControls('dot'),
  args: {
    status: STATUS_STATES.PENDING,
  },
};

/**
 * This story showcases an In Progress Status component with icon
 */
export const StatusInProgress: Story = {
  render: ({ status }) =>
    html` <col-status status=${status}>
      <col-icon name="a-third-circle"></col-icon>
      In Progress
    </col-status>`,
  argTypes: disableControls('dot'),
  args: {
    status: STATUS_STATES.INPROGRESS,
  },
};

/**
 * This story showcases an Cancel Status component with icon
 */
export const StatusCancel: Story = {
  render: ({ status }) =>
    html` <col-status status=${status}>
      <col-icon name="close-circle"></col-icon>
      Cancelled
    </col-status>`,
  argTypes: disableControls('dot'),
  args: {
    status: STATUS_STATES.CANCEL,
  },
};

/**
 * This story showcases an Complete Status component with icon
 */
export const StatusComplete: Story = {
  render: ({ status }) =>
    html` <col-status status=${status}>
      <col-icon name="check-circle"></col-icon>
      Finalized
    </col-status>`,
  argTypes: disableControls('dot'),
  args: {
    status: STATUS_STATES.COMPLETE,
  },
};

/**
 * This story showcases a Status component with a dot
 */
export const StatusWithDot: Story = {
  render: renderStatus,
  args: {
    dot: true,
  },
};

/**
 * This story showcases a Status Pending component with a dot
 */
export const StatusPendingWithDot: Story = {
  render: renderStatus,
  args: {
    dot: true,
    status: STATUS_STATES.PENDING,
  },
};

/**
 * This story showcases a Status In Progress component with a dot
 */
export const StatusInProgressWithDot: Story = {
  render: renderStatus,
  args: {
    dot: true,
    status: STATUS_STATES.INPROGRESS,
  },
};

/**
 * This story showcases a Status Complete component with a dot
 */
export const StatusCompleteWithDot: Story = {
  render: renderStatus,
  args: {
    dot: true,
    status: STATUS_STATES.COMPLETE,
  },
};

/**
 * This story showcases a Status component with a dot
 */
export const StatusCancelWithDot: Story = {
  render: renderStatus,
  args: {
    dot: true,
    status: STATUS_STATES.CANCEL,
  },
};
