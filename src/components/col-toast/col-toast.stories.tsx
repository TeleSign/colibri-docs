import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { html, nothing } from 'lit';
import { formatCodeString } from '@/utils';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ColToast } from '@telesign/colibri';

type ColToastArgs = {
  variant: 'information' | 'success' | 'warning' | 'danger';
  type: 'informative' | 'action-close';
  duration: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  open: boolean;
};

type SlotArgs = {
  title?: string;
  default?: string;
  icon?: string;
};

type StorybookOnlyArgs = ColToastArgs & SlotArgs;

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
    title: {
      control: { type: 'text' },
      description: 'Slot `title`: Text shown as the toast title.',
      table: {
        category: 'Slots',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    default: {
      control: { type: 'text' },
      description: '`Default slot`: Main body content of the toast.',
      table: {
        category: 'Slots',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
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
} satisfies ColibriStoryMeta<StorybookOnlyArgs>;

export default meta;
type Story = ColibriStory<StorybookOnlyArgs>;

const renderToast: Story['render'] = args => html`
  <col-toast
    variant=${args.variant}
    type=${args.type}
    duration=${ifDefined(args.duration)}
    position=${ifDefined(args.position)}
    ?open=${args.open}
  >
    ${args.icon ? html`<col-icon slot="icon" name=${args.icon}></col-icon>` : nothing}
    ${args.title
      ? html`<col-typography variant="subheading" slot="title">${args.title}</col-typography>`
      : nothing}
    ${args.default ?? nothing}
  </col-toast>
`;

export const Default: Story = {
  render: renderToast,
  args: {
    variant: 'information',
    type: 'action-close',
    open: true,
    title: 'Information',
    default: 'This is an informational message with default duration.',
  },
};

export const ActionClose: Story = {
  render: args => html`
    <col-button
      color="primary"
      style="padding-bottom:10px;"
      @click=${() => {
        const toast = document.getElementById('action-close') as ColToast;
        if (toast) {
          toast.open = true;
        }
      }}
    >
      Show Toast
    </col-button>
    <col-toast id="action-close" variant=${args.variant} type=${args.type}>
      <col-typography variant="subheading" slot="title">${args.title}</col-typography>
      ${args.default}
    </col-toast>
  `,
  args: {
    variant: 'information',
    type: 'action-close',
    title: 'Information',
    default: 'This message requires manual dismissal using the close button.',
  },
};

export const Autoclose: Story = {
  render: args => html`
    <col-button
      color="primary"
      style="padding-bottom:10px;"
      @click=${() => {
        const toast = document.getElementById('autoclose') as ColToast;
        if (toast) {
          toast.open = true;
        }
      }}
    >
      Show Toast
    </col-button>
    <col-toast
      id="autoclose"
      variant=${args.variant}
      type=${args.type}
      duration=${ifDefined(args.duration)}
    >
      <col-typography variant="subheading" slot="title">${args.title}</col-typography>
      ${args.default}
    </col-toast>
  `,
  args: {
    variant: 'information',
    type: 'informative',
    title: 'Information',
    default: 'This is an informational message with default duration.',
  },
  parameters: {
    docs: {
      source: {
        code: `
<col-button
  color="primary"
  style="padding-bottom:10px;"
  @click={handleClick}
/>
<col-toast
  id="autoclose"
  variant="information"
  type="informative"
>
<col-typography slot="title" variant="subheading">Information</col-typography>
  This is an informational message with default duration.
</col-toast>
<script>
  function handleClick() {
    const toast = document.getElementById('autoclose');
    if (toast) toast.open = true;
  }
</script>
      `.trim(),
        language: 'html',
      },
    },
  },
};

export const InformationCustomDuration: Story = {
  render: args => html`
    <col-button
      color="primary"
      style="padding-bottom:10px;"
      @click=${() => {
        const toast = document.getElementById('customDuration') as ColToast;
        if (toast) {
          toast.open = true;
        }
      }}
    >
      Show Toast
    </col-button>
    <col-toast
      id="customDuration"
      variant=${args.variant}
      type=${args.type}
      duration=${ifDefined(args.duration)}
    >
      <col-typography variant="subheading" slot="title">${args.title}</col-typography>
      ${args.default}
    </col-toast>
  `,
  args: {
    variant: 'information',
    type: 'informative',
    duration: 10,
    title: 'Information',
    default: 'This message will stay visible for 10 seconds.',
  },
  parameters: {
    docs: {
      source: {
        code: `
<col-button
  color="primary"
  style="padding-bottom:10px;"
  @click={handleClick}
/>
<col-toast
  id="customDuration"
  variant="information"
  type="informative"
  duration="10"
>
<col-typography slot="title" variant="subheading">Information</col-typography>
 This message will stay visible for 10 seconds.
</col-toast>
<script>
  function handleClick() {
    const toast = document.getElementById('customDuration');
    if (toast) toast.open = true;
  }
</script>
      `.trim(),
        language: 'html',
      },
    },
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
      <col-icon slot="icon" name="info-circle"></col-icon>
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

export const InteractiveToastExample: Story = {
  name: 'Interactive Toast Example',
  args: {
    variant: 'information',
    type: 'action-close',
    duration: 4,
    position: 'bottom-right',
    open: false,
    title: 'Interactive Toast',
    default: 'You can control this toast using the controls and open it manually.',
  },
  render: args => {
    const toastId = 'interactive-toast-example';

    return html`
      <col-button
        color="primary"
        style="padding-bottom:10px;"
        @click=${() => {
          const toast = document.getElementById(toastId) as ColToast;
          if (toast) {
            toast.open = true;
          }
        }}
      >
        Show Toast
      </col-button>

      <col-toast
        id=${toastId}
        variant=${args.variant}
        type=${args.type}
        duration=${args.type === 'informative' ? args.duration : undefined}
        position=${args.position}
        ?open=${args.open}
      >
        <col-typography slot="title" variant="subheading">${args.title}</col-typography>
        ${args.default}
      </col-toast>
    `;
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['information', 'success', 'warning', 'danger'],
    },
    type: {
      control: { type: 'select' },
      options: ['informative', 'action-close'],
    },
    duration: {
      control: { type: 'number', min: 3, max: 10 },
      if: { arg: 'type', eq: 'informative' },
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    open: {
      control: false,
    },
    title: {
      control: { type: 'text' },
    },
    default: {
      control: { type: 'text' },
      name: 'Content',
    },
  },
};
