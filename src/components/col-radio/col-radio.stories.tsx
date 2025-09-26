import { html, css } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  value: string;
  customLabel: boolean;
  group: string;
};

const meta = {
  title: 'Forms/Radio',
  component: 'col-radio',
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
    value: {
      control: 'text',
      description: 'Value of the radio button when selected',
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
    value: '',
    customLabel: false,
    group: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const styles = css`
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .radio-group-header {
    margin-bottom: 12px;
  }

  .radio-group-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const Default: Story = {
  args: {
    value: 'default',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio value=${value} ?checked=${checked} ?disabled=${disabled}></col-radio>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
    value: 'checked',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio value=${value} ?checked=${checked} ?disabled=${disabled}>Checked radio</col-radio>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio value=${value} ?checked=${checked} ?disabled=${disabled}>Disabled radio</col-radio>
  `,
};

export const WithLabel: Story = {
  args: {
    value: 'with-label',
  },
  render: ({ checked, disabled, value }) => html`
    <col-radio value=${value} ?checked=${checked} ?disabled=${disabled}>Standard label</col-radio>
  `,
};

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
    value: 'custom-label',
  },
  render: ({ checked, disabled, value, customLabel }) => html`
    <col-radio value=${value} ?checked=${checked} ?disabled=${disabled} ?customLabel=${customLabel}>
      <div slot="label" style="display: flex; align-items: center; gap: 4px;">
        <col-icon name="info-circle"></col-icon>
        Custom formatted label
      </div>
    </col-radio>
  `,
};

export const RadioGroup: Story = {
  parameters: {
    __sb: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
  },
  render: () => html`
    <col-radio group="fruits" value="apple" checked>Apple</col-radio>
    <col-radio group="fruits" value="banana">Banana</col-radio>
    <col-radio group="fruits" value="cherry">Cherry</col-radio>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    const updateSelection = (e: Event) => {
      const selectedRadio = e.target as HTMLElement;
      const valueDisplay = document.querySelector('#selected-value');
      const selectedValue = selectedRadio.getAttribute('value');
      if (valueDisplay) {
        valueDisplay.textContent = selectedValue || 'none';
      }
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="radio-group">
        <div class="radio-group-header">
          <strong>Selected value: </strong><span id="selected-value">option1</span>
        </div>
        <div class="radio-group-content">
          <col-radio group="demo" value="option1" checked @change=${updateSelection}
            >Option 1</col-radio
          >
          <col-radio group="demo" value="option2" @change=${updateSelection}>Option 2</col-radio>
          <col-radio group="demo" value="option3" @change=${updateSelection}>Option 3</col-radio>
        </div>
      </div>
    `;
  },
};
