import { html } from 'lit';
import { fn } from '@storybook/test';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  labelLeft: boolean;
  onClick: () => void;
};

const meta = {
  title: 'Atoms/Toggle',
  component: 'col-toggle',
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
      description: 'Name of the toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'disabled', neq: false },
    },
    labelLeft: {
      control: 'boolean',
      description: 'Enables the label to be positioned on the left side of the toggle',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'labelLeft', neq: false },
    },
    onClick: {
      action: 'clicked',
      description: 'Fired when the toggle state changes.',
      table: {
        category: 'Events',
        type: { summary: '{ checked: boolean }' },
      },
    },
  },
  args: {
    name: 'toggle',
    checked: false,
    disabled: false,
    labelLeft: false,
    onClick: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ name, checked, disabled, labelLeft }) => html`
    <col-toggle
      name=${name}
      ?checked=${checked}
      ?disabled=${disabled}
      ?labelLeft=${labelLeft}
    ></col-toggle>
  `,
};

export const WithLabel: Story = {
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Enable Notifications
    </col-toggle>
  `,
};

export const WithLeftLabel: Story = {
  args: {
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Receive Email Updates
    </col-toggle>
  `,
};

export const WithHelpText: Story = {
  args: {
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Show Online Status
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Enable Animations
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Dark Mode
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Two-Factor Authentication
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const InteractiveExample: Story = {
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
      <div class="checkbox-group">
        <div class="checkbox-group-header">
          <strong>Current state: </strong><span id="state-display">Indeterminate</span>
        </div>
        <div>
          <col-checkbox id="controlled-checkbox" indeterminate @change=${toggleState}>
            Click to toggle state
          </col-checkbox>
        </div>
        <div>
          <button class="toggle-button" @click=${toggleState}>Toggle state externally</button>
        </div>
      </div>
    `;
  },
};
