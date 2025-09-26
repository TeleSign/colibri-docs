import { html, css } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  label: string;
  customLabel: boolean;
  default: string;
  icon: string;
  change: () => void;
};

const meta = {
  title: 'Forms/Checkbox Button',
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
    name: {
      control: 'text',
      description: 'Name of the checkbox button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox button',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox button',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    customLabel: {
      name: 'customlabel',
      control: 'boolean',
      description: 'Enables custom label slot',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'customlabel', neq: false },
    },
    default: {
      control: 'text',
      description: 'The default content of the button (typically used for the label)',
      table: {
        category: 'slots',
        defaultValue: { summary: '""' },
      },
      if: { arg: 'default', neq: '' },
    },
    icon: {
      control: 'select',
      options: Object.values(icons),
      description: 'Icon content that appears before the label',
      table: {
        category: 'slots',
        defaultValue: { summary: '""' },
      },
      if: { arg: 'icon', neq: '' },
    },
    label: {
      control: 'text',
      description: 'Custom label content (when customLabel is true)',
      table: {
        category: 'slots',
        defaultValue: { summary: '""' },
      },
      if: { arg: 'label', neq: '' },
    },
    change: {
      action: 'clicked',
      description: 'Fired when the checkbox state changes.',
      table: {
        category: 'Events',
        type: { summary: '{ checked: boolean }' },
      },
      if: { arg: 'change', neq: fn() },
    },
  },
  args: {
    name: 'checkbox button',
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

const styles = css`
  .checkbox-button-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .checkbox-button-group-header {
    margin-bottom: 12px;
  }

  .checkbox-button-group-content {
    display: flex;
    gap: 16px;
  }

  .toggle-button {
    padding: 8px 16px;
    background-color: var(--col-colors-ui-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--col-typography-font-family-primary);
    font-size: 14px;
  }

  .toggle-button:hover {
    background-color: var(--col-colors-ui-primary-dark);
  }

  .toggle-button:active {
    background-color: var(--col-colors-ui-primary-dark);
  }
`;

const renderCheckboxButton: Story['render'] = args => html`
  <col-checkbox-button
    name=${args.name}
    ?checked=${args.checked}
    ?disabled=${args.disabled}
    ?customlabel=${args.customLabel}
  >
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

export const GroupCheckbox: Story = {
  args: {
    icon: 'emoji-circle',
    default: 'With icon',
  },
  render: args => html`
    <col-group label="Checkbox group button horizontal" role="group" withoutGap>
      <col-checkbox-button
        name="checkbox group button"
        ?checked=${args.checked}
        ?disabled=${args.disabled}
      >
        <col-icon name=${args.icon} slot="icon"></col-icon>
        ${args.customLabel ? html`<span slot="label">${args.label}</span>` : args.default}
      </col-checkbox-button>
      <col-checkbox-button>Week</col-checkbox-button>
      <col-checkbox-button>Month</col-checkbox-button>
      <col-checkbox-button>Year</col-checkbox-button>
    </col-group>
  `,
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
      <style>
        ${styles}
      </style>
      <div class="checkbox-button-group">
        <div class="checkbox-button-group-header">
          <strong>Current state: </strong><span id="state-display">Unchecked</span>
        </div>
        <div class="checkbox-button-group-content">
          <col-checkbox-button id="controlled-checkbox-button" @change=${toggleState}>
            <col-icon name="check-circle" slot="icon"></col-icon>
            Click to toggle state
          </col-checkbox-button>
        </div>
        <div>
          <button class="toggle-button" @click=${toggleState}>Toggle state externally</button>
        </div>
      </div>
    `;
  },
};
