import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { STATUS_STATES } from '@telesign/colibri';

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
  args: {
    status: STATUS_STATES.NEUTRAL,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-status><col-icon name="a-third-circle"></col-icon>Neutral</col-status>`
        ),
      },
    },
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
  args: {
    status: STATUS_STATES.PENDING,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-status status="pending"><col-icon name="three-dots-circle-fill"></col-icon>To be approved</col-status>`
        ),
      },
    },
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
  args: {
    status: STATUS_STATES.INPROGRESS,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-status status="inprogress"><col-icon name="a-third-circle"></col-icon>In Progress</col-status>`
        ),
      },
    },
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
  args: {
    status: STATUS_STATES.CANCEL,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-status status="cancel"><col-icon name="close-circle"></col-icon>Cancelled</col-status>`
        ),
      },
    },
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
  args: {
    status: STATUS_STATES.COMPLETE,
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-status status="inprogress"><col-icon name="check-circle"></col-icon>Finalized</col-status>`
        ),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-status dot>Neutral</col-status>`),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-status dot status="pending">To be approved</col-status>`),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-status dot status="inprogress">In progress</col-status>`),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-status dot status="complete">Finalized</col-status>`),
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<col-status dot status="cancel">Cancelled</col-status>`),
      },
    },
  },
};
