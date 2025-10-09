import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { html } from 'lit';
import { formatCodeString } from '@/utils';
import { ifDefined } from 'lit-html/directives/if-defined.js';

type ColToastArgs = {
  variant: 'information' | 'success' | 'warning' | 'danger';
  type: 'informative' | 'action-close';
  duration: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  open: boolean;
  title?: string;
  default?: string;
};

const meta = {
  title: 'Feedback/Toast',
  component: 'col-toast',
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
      control: { type: 'select' },
      options: ['information', 'success', 'warning', 'danger'],
      description: 'Visual style of the toast, indicating its type or severity.',
      table: {
        category: 'Core',
        type: { summary: `'information' | 'success' | 'warning' | 'danger'` },
        defaultValue: { summary: 'information' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['informative', 'action-close'],
      description: 'Defines toast behavior: either auto-dismissed or requires manual close.',
      table: {
        category: 'Core',
        type: { summary: `'informative' | 'action-close'` },
        defaultValue: { summary: 'action-close' },
      },
    },
    duration: {
      control: { type: 'number', min: 3, max: 10, step: 1 },
      description:
        'Time in seconds before the toast auto-dismisses. Ignored when type is `action-close`.',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Where the toast appears on the screen.',
      table: {
        category: 'Layout',
        type: {
          summary: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
        },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Controls whether the toast is visible.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    variant: 'information',
    type: 'action-close',
    open: true,
    title: 'Information',
    default: 'This is an informational message with default duration.',
  },
} satisfies ColibriStoryMeta<ColToastArgs>;

export default meta;
type Story = ColibriStory<ColToastArgs>;

const renderToast: Story['render'] = args => html`
  <col-toast
    variant=${args.variant}
    type=${args.type}
    duration=${ifDefined(args.duration)}
    position=${ifDefined(args.position)}
    ?open=${args.open}
  >
    <col-typography variant="subheading" slot="title">${args.title}</col-typography>
    ${args.default}
  </col-toast>
`;

export const InformationDefaultDuration: Story = {
  render: renderToast,
  args: {
    variant: 'information',
    type: 'action-close',
    open: true,
    title: 'Information',
    default: 'This is an informational message with default duration.',
  },
};

export const Autoclose: Story = {
  render: renderToast,
  args: {
    variant: 'information',
    type: 'informative',
    open: true,
    title: 'Information',
    default: 'This is an informational message with default duration.',
  },
};

export const InformationCustomDuration: Story = {
  render: renderToast,
  args: {
    variant: 'information',
    type: 'informative',
    duration: 10,
    open: true,
    title: 'Information',
    default: 'This message will stay visible for 10 seconds.',
  },
};

export const Success: Story = {
  render: renderToast,
  args: {
    variant: 'success',
    type: 'action-close',
    open: true,
    title: 'Success',
    default: 'Your operation was successful.',
  },
};

export const Warning: Story = {
  render: renderToast,
  args: {
    variant: 'warning',
    type: 'action-close',
    open: true,
    title: 'Warning',
    default: 'Please check your input.',
  },
};

export const Danger: Story = {
  render: renderToast,
  args: {
    variant: 'danger',
    type: 'action-close',
    open: true,
    title: 'Error',
    default: 'An error has occurred.',
  },
};

export const SlotsExample: Story = {
  render: args => html`
    <col-toast variant=${args.variant} type=${args.type} ?open=${args.open}>
      <col-icon slot="icon" name="check-circle-fill"></col-icon>
      <col-typography slot="title" variant="subheading">${args.title}</col-typography>
      ${args.default}
    </col-toast>
  `,
  args: {
    variant: 'success',
    type: 'action-close',
    open: true,
    title: 'Custom Icon & Title',
    default: 'This toast uses all named slots plus default content.',
  },
};
