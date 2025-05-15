import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  value: string;
  customLabel: boolean;
  group: string;
}

const meta = {
  title: 'Atoms/Radio',
  component: 'col-radio',
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
        description: 'Controls the checked state of the radio button',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: 'boolean',
        description: 'Disables the radio button',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      value: {
        control: 'text',
        description: 'Value of the radio button when selected',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '""' },
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
      group: {
        control: 'text',
        description: 'Group name for related radio buttons',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '""' },
        },
      },
    }
  },
  args: {
    checked: false,
    disabled: false,
    value: '',
    customLabel: false,
    group: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ checked, disabled, value }) =>
    html`
      <div>
        <col-radio ?checked=${checked} ?disabled=${disabled} value=${value}></col-radio>
      </div>
    `
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled, value }) =>
    html`
      <div>
        <col-radio ?checked=${checked} ?disabled=${disabled} value=${value}>Checked radio</col-radio>
      </div>
    `
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ checked, disabled, value }) =>
    html`
      <div>
        <col-radio ?checked=${checked} ?disabled=${disabled} value=${value}>Disabled radio</col-radio>
      </div>
    `
}

export const WithLabel: Story = {
  render: ({ checked, disabled, value }) =>
    html`
      <div>
        <col-radio ?checked=${checked} ?disabled=${disabled} value=${value}>Standard label</col-radio>
      </div>
    `
}

export const WithCustomLabel: Story = {
  args: {
    customLabel: true,
  },
  render: ({ checked, disabled, value, customLabel }) =>
    html`
      <div>
        <col-radio ?checked=${checked} ?disabled=${disabled} value=${value} ?customLabel=${customLabel}>
          <div slot="label" style="display: flex; align-items: center; gap: 4px;">
            <col-icon name="info-circle"></col-icon>
            Custom formatted label
          </div>
        </col-radio>
      </div>
    `
}

export const RadioGroup: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <col-radio group="fruits" value="apple" checked>Apple</col-radio>
      <col-radio group="fruits" value="banana">Banana</col-radio>
      <col-radio group="fruits" value="cherry">Cherry</col-radio>
    </div>
  `
}

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
      <div>
        <div style="margin-bottom: 12px;">
          <strong>Selected value: </strong><span id="selected-value">option1</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <col-radio group="demo" value="option1" checked @change=${updateSelection}>Option 1</col-radio>
          <col-radio group="demo" value="option2" @change=${updateSelection}>Option 2</col-radio>
          <col-radio group="demo" value="option3" @change=${updateSelection}>Option 3</col-radio>
        </div>
      </div>
    `;
  }
}
