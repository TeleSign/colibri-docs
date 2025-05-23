import { html, nothing } from 'lit';
import { fn } from '@storybook/test';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
  customLabel: boolean;
  label: string;
  default: string;
  change: () => void;
};

const meta = {
  title: 'Atoms/Checkbox',
  component: 'col-checkbox',
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
      description: 'Controls the checked state of the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Sets the checkbox to an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
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
        type: { summary: '{ checked: boolean, indeterminate: boolean }' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    customLabel: false,
    label: '',
    default: 'Default checkbox',
    change: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderCheckbox: Story['render'] = args => html`
  <col-checkbox
    ?disabled=${args.disabled}
    ?checked=${args.checked}
    ?indeterminate=${args.indeterminate}
    ?customLabel=${args.customLabel}
  >
    ${args.customLabel
      ? html`<div slot="label">${args.label || nothing}</div>`
      : args.default || nothing}
  </col-checkbox>
`;

export const Default: Story = {
  render: renderCheckbox,
};

export const Checked: Story = {
  args: {
    checked: true,
    default: 'Checked state',
  },
  render: renderCheckbox,
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    default: 'Indeterminate state',
  },
  render: renderCheckbox,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled checkbox',
  },
  render: renderCheckbox,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    default: 'Disabled and checked',
  },
  render: renderCheckbox,
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    indeterminate: true,
    default: 'Disabled and indeterminate',
  },
  render: renderCheckbox,
};

export const Label: Story = {
  args: {
    default: 'Standard label',
  },
  render: renderCheckbox,
};

export const CustomLabel: Story = {
  args: {
    customLabel: true,
    label: 'With custom label formatting',
  },
  render: renderCheckbox,
};

export const WithIcon: Story = {
  args: {
    customLabel: true,
  },
  render: ({ customLabel, disabled, checked, indeterminate }) => html`
    <col-checkbox
      ?disabled=${disabled}
      ?checked=${checked}
      ?indeterminate=${indeterminate}
      ?customLabel=${customLabel}
    >
      <div slot="label">
        <col-icon name="emoji-circle"></col-icon>
        With icon
      </div>
    </col-checkbox>
  `,
};

export const WithMultipleIcons: Story = {
  args: {
    customLabel: true,
  },
  render: ({ customLabel, disabled, checked, indeterminate }) => html`
    <col-checkbox
      ?disabled=${disabled}
      ?checked=${checked}
      ?indeterminate=${indeterminate}
      ?customLabel=${customLabel}
    >
      <div slot="label" style="display: flex; align-items: center; gap: 4px;">
        <col-icon name="check-circle"></col-icon>
        With multiple icons
        <col-icon name="info-circle"></col-icon>
      </div>
    </col-checkbox>
  `,
};

export const InteractiveControlledExample: Story = {
  render: () => {
    let checked = false;
    let indeterminate = true;

    const toggleState = () => {
      if (indeterminate) {
        indeterminate = false;
        checked = true;
      } else {
        checked = !checked;
      }
      const checkbox = document.querySelector('#controlled-checkbox') as HTMLInputElement;
      checkbox.checked = checked;
      checkbox.indeterminate = indeterminate;
      const stateDisplay = document.querySelector('#state-display') as HTMLInputElement;
      stateDisplay.textContent = indeterminate
        ? 'Indeterminate'
        : checked
          ? 'Checked'
          : 'Unchecked';
    };

    return html`
      <div>
        <div style="margin-bottom: 12px;">
          <strong>Current state: </strong><span id="state-display">Indeterminate</span>
        </div>
        <col-checkbox id="controlled-checkbox" indeterminate @change=${toggleState}>
          Click to toggle state
        </col-checkbox>
        <div style="margin-top: 12px;">
          <button @click=${toggleState}>Toggle state externally</button>
        </div>
      </div>
    `;
  },
};
