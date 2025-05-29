import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  label: string;
  customLabel: boolean;
  value: string;
  group: string;
};

const meta = {
  title: 'Atoms/Radio Button',
  component: 'col-radio-button',
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
      description: 'Controls the checked state of the radio button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    label: {
      control: 'text',
      description: 'Text label for the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    customLabel: {
      control: 'boolean',
      description: 'Enables custom label slot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    value: {
      control: 'text',
      description: 'Value of the radio button when selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    group: {
      control: 'text',
      description: 'Group name for related radio buttons',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    label: '',
    customLabel: false,
    value: '',
    group: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      Default Radio Button
    </col-radio-button>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      <col-icon name="check-circle" slot="icon"></col-icon>
      Checked state
    </col-radio-button>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      Disabled state
    </col-radio-button>
  `,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      <col-icon name="check-circle" slot="icon"></col-icon>
      Disabled and checked
    </col-radio-button>
  `,
};

export const WithStringLabel: Story = {
  args: {
    label: 'String label property',
  },
  render: ({ checked, disabled, label, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} label=${label} value=${value}>
    </col-radio-button>
  `,
};

export const WithDefaultSlot: Story = {
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      Default slot label
    </col-radio-button>
  `,
};

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
  },
  render: ({ checked, disabled, customLabel, value }) => html`
    <col-radio-button
      ?checked=${checked}
      ?disabled=${disabled}
      ?customLabel=${customLabel}
      value=${value}
    >
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      <span slot="label">Custom <strong>formatted</strong> label</span>
    </col-radio-button>
  `,
};

export const OnlyIcon: Story = {
  render: ({ checked, disabled, value }) => html`
    <col-radio-button ?checked=${checked} ?disabled=${disabled} value=${value}>
      <col-icon name="person" slot="icon"></col-icon>
    </col-radio-button>
  `,
};

export const RadioButtonGroup: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <col-radio-button group="options" value="option1" checked>
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        Option 1
      </col-radio-button>
      <col-radio-button group="options" value="option2">
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        Option 2
      </col-radio-button>
      <col-radio-button group="options" value="option3">
        <col-icon name="emoji-circle" slot="icon"></col-icon>
        Option 3
      </col-radio-button>
    </div>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    const updateSelection = (e: Event) => {
      const selectedRadio = e.target as HTMLElement;
      const valueDisplay = document.querySelector('#selection-value');
      const selectedValue = selectedRadio.getAttribute('value');
      if (valueDisplay) {
        valueDisplay.textContent = selectedValue || 'none';
      }
    };

    return html`
      <div>
        <div style="margin-bottom: 12px;">
          <strong>Selected value: </strong><span id="selection-value">color1</span>
        </div>
        <div style="display: flex; gap: 16px;">
          <col-radio-button group="colors" value="color1" checked @change=${updateSelection}>
            <col-icon name="square-fill" style="color: #ff6b6b;" slot="icon"></col-icon>
            Red
          </col-radio-button>
          <col-radio-button group="colors" value="color2" @change=${updateSelection}>
            <col-icon name="square-fill" style="color: #4ecdc4;" slot="icon"></col-icon>
            Teal
          </col-radio-button>
          <col-radio-button group="colors" value="color3" @change=${updateSelection}>
            <col-icon name="square-fill" style="color: #ffd166;" slot="icon"></col-icon>
            Yellow
          </col-radio-button>
        </div>
      </div>
    `;
  },
};
