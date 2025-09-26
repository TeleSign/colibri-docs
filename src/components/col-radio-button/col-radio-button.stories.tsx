import { html, css } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  label: string;
  customLabel: boolean;
  value: string;
  group: string;
};

const meta = {
  title: 'Forms/Radio Button',
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
    name: {
      control: 'text',
      description: 'Name of the radio button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the radio button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'disabled', neq: false },
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
      name: 'customlabel',
      control: 'boolean',
      description: 'Enables custom label slot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'customLabel', neq: false },
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
      if: { arg: 'group', neq: '' },
    },
  },
  args: {
    name: '',
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

const styles = css`
  .radio-button-group {
    display: flex;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .radio-button-group-vertical {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .radio-button-group-header {
    margin-bottom: 12px;
  }

  .radio-button-group-content {
    display: flex;
    gap: 16px;
  }
`;

export const Default: Story = {
  args: {
    value: 'default',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      Default Radio Button
    </col-radio-button>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
    value: 'checked',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      <col-icon name="check-circle" slot="icon"></col-icon>
      Checked state
    </col-radio-button>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      Disabled state
    </col-radio-button>
  `,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    value: 'disabled-checked',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      <col-icon name="check-circle" slot="icon"></col-icon>
      Disabled and checked
    </col-radio-button>
  `,
};

export const WithStringLabel: Story = {
  args: {
    label: 'String label property',
    value: 'with-string-label',
  },
  render: ({ checked, disabled, label, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled} label=${label}>
    </col-radio-button>
  `,
};

export const WithDefaultSlot: Story = {
  args: {
    value: 'with-default-slot',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      Default slot label
    </col-radio-button>
  `,
};

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
    value: 'with-custom-label',
  },
  render: ({ checked, disabled, customLabel, value }) => html`
    <col-radio-button
      value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      ?customlabel=${customLabel}
    >
      <col-icon name="emoji-circle" slot="icon"></col-icon>
      <span slot="label">Custom <strong>formatted</strong> label</span>
    </col-radio-button>
  `,
};

export const OnlyIcon: Story = {
  args: {
    value: 'only-icon',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio-button value=${value} ?checked=${checked} ?disabled=${disabled}>
      <col-icon name="person" slot="icon"></col-icon>
    </col-radio-button>
  `,
};

export const RadioButtonGroup: Story = {
  parameters: {
    __sb: {
      display: 'flex',
      gap: '16px',
    },
  },
  render: () => html`
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
  `,
};

export const GroupRadioWithColGroup: Story = {
  render: () => html`
    <col-group label="Radio button group horizontal" role="group" withoutGap>
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
    </col-group>
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
      <style>
        ${styles}
      </style>
      <div class="radio-button-group-vertical">
        <div class="radio-button-group-header">
          <strong>Selected value: </strong><span id="selection-value">color1</span>
        </div>
        <div class="radio-button-group-content">
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
