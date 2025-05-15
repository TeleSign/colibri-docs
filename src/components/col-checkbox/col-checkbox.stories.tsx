import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  indeterminate: boolean;
  customLabel: boolean;
}

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
    argTypes: {
      checked: {
        control: 'boolean',
        description: 'Controls the checked state of the checkbox',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: 'boolean',
        description: 'Disables the checkbox',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      indeterminate: {
        control: 'boolean',
        description: 'Sets the checkbox to an indeterminate state',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      customLabel: {
        control: 'boolean',
        description: 'Enables custom label slot',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
    }
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    customLabel: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ disabled }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled}>Default checkbox</col-checkbox>
      </div>
    `
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled }) =>
    html`
      <div>
        <col-checkbox ?checked=${checked} ?disabled=${disabled}>Checked state</col-checkbox>
      </div>
    `
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  render: ({ indeterminate, disabled }) =>
    html`
      <div>
        <col-checkbox ?indeterminate=${indeterminate} ?disabled=${disabled}>Indeterminate state</col-checkbox>
      </div>
    `
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ disabled }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled}>Disabled checkbox</col-checkbox>
      </div>
    `
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: ({ disabled, checked }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?checked=${checked}>Disabled and checked</col-checkbox>
      </div>
    `
}

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    indeterminate: true,
  },
  render: ({ disabled, indeterminate }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?indeterminate=${indeterminate}>Disabled and indeterminate</col-checkbox>
      </div>
    `
}

export const Label: Story = {
  render: ({ disabled, checked, indeterminate }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?checked=${checked} ?indeterminate=${indeterminate}>With standard label</col-checkbox>
      </div>
    `
}

export const CustomLabel: Story = {
  args: {
    customLabel: true,
  },
  render: ({ customLabel, disabled, checked, indeterminate }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?checked=${checked} ?indeterminate=${indeterminate} ?customLabel=${customLabel}>
          <div slot="label">With custom label formatting</div>
        </col-checkbox>
      </div>
    `
}

export const WithIcon: Story = {
  args: {
    customLabel: true,
  },
  render: ({ customLabel, disabled, checked, indeterminate }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?checked=${checked} ?indeterminate=${indeterminate} ?customLabel=${customLabel}>
          <div slot="label">
            <col-icon name="emoji-circle"></col-icon>
            With icon
          </div>
        </col-checkbox>
      </div>
    `
}

export const WithMultipleIcons: Story = {
  args: {
    customLabel: true,
  },
  render: ({ customLabel, disabled, checked, indeterminate }) =>
    html`
      <div>
        <col-checkbox ?disabled=${disabled} ?checked=${checked} ?indeterminate=${indeterminate} ?customLabel=${customLabel}>
          <div slot="label" style="display: flex; align-items: center; gap: 4px;">
            <col-icon name="check-circle"></col-icon>
            With multiple icons
            <col-icon name="info-circle"></col-icon>
          </div>
        </col-checkbox>
      </div>
    `
}

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
      document.querySelector('#controlled-checkbox').checked = checked;
      document.querySelector('#controlled-checkbox').indeterminate = indeterminate;
      document.querySelector('#state-display').textContent =
        indeterminate ? 'Indeterminate' : (checked ? 'Checked' : 'Unchecked');
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
  }
}
