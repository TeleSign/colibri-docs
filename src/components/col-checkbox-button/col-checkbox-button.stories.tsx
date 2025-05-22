import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  label: string;
  customLabel: boolean;
  default: string;
  icon: string;
  label: string;
};

const meta = {
  title: 'Atoms/Checkbox Button',
  component: 'col-checkbox-button',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox button',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox button',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Text label for the checkbox button',
      table: {
        type: { summary: 'string' },
        category: 'core',
        defaultValue: { summary: '""' },
      },
    },
    customLabel: {
      control: 'boolean',
      description: 'Enables custom label slot',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
    },
    default: {
      control: 'text',
      description: 'The default content of the button (typically used for the label)',
      table: {
        category: 'slots',
      },
    },
    icon: {
      control: 'text',
      description: 'Icon content that appears before the label',
      table: {
        category: 'slots',
      },
    },
    label: {
      control: 'text',
      description: 'Custom label content (when customLabel is true)',
      table: {
        category: 'slots',
      },
    },
    change: {
      action: 'clicked',
      description: 'Fired when the checkbox state changes.',
      table: {
        category: 'Events',
        type: { summary: '{ checked: boolean }' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    label: '',
    customLabel: false,
    default: '',
    icon: '',
    label: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        Checkbox button
      </col-checkbox-button>
    </div>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="check-circle" slot="icon"></col-icon>
        Checked state
      </col-checkbox-button>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        Disabled state
      </col-checkbox-button>
    </div>
  `,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="check-circle" slot="icon"></col-icon>
        Disabled and checked
      </col-checkbox-button>
    </div>
  `,
};

export const WithStringLabel: Story = {
  args: {
    label: 'String label property',
  },
  render: ({ checked, disabled, label }) => html`
    <div>
      <col-checkbox-button
        ?checked=${checked}
        ?disabled=${disabled}
        label=${label}
      ></col-checkbox-button>
    </div>
  `,
};

export const WithDefaultSlot: Story = {
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}
        >Default slot label</col-checkbox-button
      >
    </div>
  `,
};

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
  },
  render: ({ checked, disabled, customLabel }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled} ?customLabel=${customLabel}>
        <span slot="label">Custom <strong>formatted</strong> label</span>
      </col-checkbox-button>
    </div>
  `,
};

export const OnlyIcon: Story = {
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="emoji-circle" slot="icon"></col-icon>
      </col-checkbox-button>
    </div>
  `,
};

export const WithIcon: Story = {
  render: ({ checked, disabled }) => html`
    <div>
      <col-checkbox-button ?checked=${checked} ?disabled=${disabled}>
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        With icon
      </col-checkbox-button>
    </div>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    let checked = false;

    const toggleState = () => {
      checked = !checked;
      document.querySelector('#controlled-checkbox-button').checked = checked;
      document.querySelector('#state-display').textContent = checked ? 'Checked' : 'Unchecked';
    };

    return html`
      <div>
        <div style="margin-bottom: 12px;">
          <strong>Current state: </strong><span id="state-display">Unchecked</span>
        </div>
        <col-checkbox-button id="controlled-checkbox-button" @change=${toggleState}>
          <col-icon name="check-circle" slot="icon"></col-icon>
          Click to toggle state
        </col-checkbox-button>
        <div style="margin-top: 12px;">
          <button @click=${toggleState}>Toggle state externally</button>
        </div>
      </div>
    `;
  },
};
