import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  label: string;
  customLabel: boolean;
  default: string;
  icon: string;
  change: () => void;
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
    change: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderCheckboxButton: Story['render'] = args => html`
  <col-checkbox-button ?checked=${args.checked} ?disabled=${args.disabled}>
    <col-icon name=${args.icon} slot="icon"></col-icon>
    ${args.customLabel ? html`<span slot="label">${args.label}</span>` : args.default}
  </col-checkbox-button>
`;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Checkbox button',
    icon: 'emoji-circle',
  },
  render: renderCheckboxButton,
};

export const Checked: Story = {
  args: {
    checked: true,
    icon: 'check-circle',
    default: 'Checked state',
  },
  render: renderCheckboxButton,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled state',
    icon: 'emoji-circle',
  },
  render: renderCheckboxButton,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    default: 'Disabled and checked',
    icon: 'check-circle',
  },
  render: renderCheckboxButton,
};

export const WithStringLabel: Story = {
  args: {
    label: 'String label property',
  },
  render: renderCheckboxButton,
};

export const WithDefaultSlot: Story = {
  args: {
    default: 'Default slot label',
  },
  render: renderCheckboxButton,
};

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
    label: 'Custom formatted label',
  },
  render: renderCheckboxButton,
};

export const OnlyIcon: Story = {
  args: {
    icon: 'emoji-circle',
  },
  render: renderCheckboxButton,
};

export const WithIcon: Story = {
  args: {
    icon: 'emoji-circle',
    default: 'With icon',
  },
  render: renderCheckboxButton,
};

export const InteractiveExample: Story = {
  render: () => {
    let checked = false;

    const toggleState = () => {
      checked = !checked;
      const checkbox = document.querySelector('#controlled-checkbox-button') as HTMLInputElement;
      checkbox.checked = checked;
      const stateDisplay = document.querySelector('#state-display') as HTMLInputElement;
      stateDisplay.textContent = checked ? 'Checked' : 'Unchecked';
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
