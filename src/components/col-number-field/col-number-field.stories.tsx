import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  name: string;
  value: string;
  variant: 'outline' | 'plain';
  label: string;
  helper: string;
  required: boolean;
  disabled: boolean;
  error: boolean;
  errorMessage?: string;
  validationTiming: 'blur' | 'change' | 'input' | 'submit';
  placeholder: string;
  readOnly: boolean;
  size: 'large' | 'small';
  min?: number;
  max?: number;
  step: number;
  inactive: boolean;
  defaultValue?: number;
  precision?: number;
  format: 'number' | 'currency' | 'percentage';
  currencyCode?: string;
  displayType: 'placeholder' | 'text';
  change: () => void;
  input: () => void;
  focus: () => void;
  blur: () => void;
  invalid: () => void;
  validationChange: () => void;
  iconVisible: boolean;
  iconName: string;
  iconSize: string;
};

const meta: ColibriStoryMeta<StoryArgs> = {
  title: 'Molecules/Number Field',
  component: 'col-number-field',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    // Core Properties
    name: {
      control: 'text',
      description: 'The name attribute for form field identification.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    label: {
      control: 'text',
      description: 'The main label for the number field.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'label', neq: '' },
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'helper', neq: '' },
    },
    value: {
      control: 'text',
      description: 'The current value of the input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the input is empty.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'placeholder', neq: '' },
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'small'],
      description: 'The size variant of the number field.',
      table: {
        category: 'Core',
        type: { summary: "'large' | 'small'" },
        defaultValue: { summary: 'large' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['outline', 'plain'],
      description: 'The visual variant of the input field.',
      table: {
        category: 'Core',
        type: { summary: "'outline' | 'plain'" },
        defaultValue: { summary: 'outline' },
      },
    },

    // Constraints and Validation
    min: {
      control: 'number',
      description: 'The minimum allowed numeric value.',
      table: {
        category: 'Constraints',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'min', exists: true },
    },
    max: {
      control: 'number',
      description: 'The maximum allowed numeric value.',
      table: {
        category: 'Constraints',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'max', exists: true },
    },
    step: {
      control: 'number',
      description: 'The increment/decrement step value.',
      table: {
        category: 'Constraints',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    precision: {
      control: 'number',
      description: 'Number of decimal places to display.',
      table: {
        category: 'Constraints',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'precision', exists: true },
    },
    format: {
      control: { type: 'select' },
      options: ['number', 'currency', 'percentage'],
      description: 'The format type for the input.',
      table: {
        category: 'Constraints',
        type: { summary: "'number' | 'currency' | 'percentage'" },
        defaultValue: { summary: 'number' },
      },
    },
    currencyCode: {
      control: 'text',
      description: 'The currency code for currency format (e.g., USD, EUR).',
      table: {
        category: 'Constraints',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'format', eq: 'currency' },
    },
    displayType: {
      control: { type: 'select' },
      options: ['placeholder', 'text'],
      description: 'The display mode for the input field.',
      table: {
        category: 'Constraints',
        type: { summary: "'placeholder' | 'text'" },
        defaultValue: { summary: 'text' },
      },
    },

    // State Properties
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled and cannot be interacted with.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in an error state.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'error', neq: false },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required for form submission.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'required', neq: false },
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only and cannot be modified.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'readOnly', neq: false },
    },
    inactive: {
      control: 'boolean',
      description: 'Whether the component is inactive (can only change value using the buttons).',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'inactive', neq: false },
    },

    // Content Properties
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when the input is in an error state.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'error', eq: true },
    },
    validationTiming: {
      control: { type: 'select' },
      options: ['blur', 'change', 'input', 'submit'],
      description: 'When to trigger validation.',
      table: {
        category: 'Content',
        type: { summary: "'blur' | 'change' | 'input' | 'submit'" },
        defaultValue: { summary: 'blur' },
      },
    },
    defaultValue: {
      control: 'number',
      description: 'The default value for the field on reset.',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'defaultValue', exists: true },
    },

    // Events
    change: {
      action: 'change',
      description: 'Fired when the input value is committed (blur or Enter key).',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },
    input: {
      action: 'input',
      description: 'Fired when the input value changes during user interaction.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },
    focus: {
      action: 'focus',
      description: 'Fired when the input receives focus.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },
    blur: {
      action: 'blur',
      description: 'Fired when the input loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },
    invalid: {
      action: 'invalid',
      description: 'Fired when validation fails with detailed validation information.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },
    validationChange: {
      action: 'validation-change',
      description: 'Fired when validation state changes with comprehensive validation details.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent' },
      },
    },

    // Storybook-Only Controls
    iconVisible: {
      control: 'boolean',
      description:
        'Toggles the visibility of the icon slot. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook Controls',
        disable: true,
      },
    },
    iconName: {
      control: { type: 'select' },
      options: icons,
      description:
        'Name of the icon to display in the slot. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: {
        category: 'Storybook Controls',
        disable: true,
      },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: {
        category: 'Storybook Controls',
        disable: true,
      },
    },
  },
  args: {
    name: 'number-field',
    label: '',
    helper: '',
    value: '',
    placeholder: '',
    size: 'large',
    variant: 'outline',
    step: 1,
    format: 'number',
    displayType: 'text',
    disabled: false,
    error: false,
    required: false,
    readOnly: false,
    inactive: false,
    validationTiming: 'blur',
    change: action('change'),
    input: action('input'),
    focus: action('focus'),
    blur: action('blur'),
    invalid: action('invalid'),
    validationChange: action('validation-change'),
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
  },
};

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderNumberField: Story['render'] = args => html`
  <col-number-field
    name=${args.name}
    label=${args.label || nothing}
    helper=${args.helper || nothing}
    value=${args.value || nothing}
    placeholder=${args.placeholder || nothing}
    size=${args.size}
    variant=${args.variant}
    ?disabled=${args.disabled}
    ?error=${args.error}
    ?required=${args.required}
    ?readonly=${args.readOnly}
    ?inactive=${args.inactive}
    error-message=${args.errorMessage || nothing}
    validation-timing=${args.validationTiming}
    min=${args.min || nothing}
    max=${args.max || nothing}
    step=${args.step}
    precision=${args.precision || nothing}
    format=${args.format}
    currency-code=${args.currencyCode || nothing}
    display-type=${args.displayType}
    default-value=${args.defaultValue || nothing}
    @change=${args.change}
    @input=${args.input}
    @focus=${args.focus}
    @blur=${args.blur}
    @invalid=${args.invalid}
    @validation-change=${args.validationChange}
  >
    ${args.iconVisible && args.size === 'small'
      ? html`<col-icon slot="icon" name=${args.iconName} size=${args.iconSize}></col-icon>`
      : ''}
  </col-number-field>
`;

/**
 * Basic number field with default configuration
 */
export const Default: Story = {
  args: {
    label: 'Quantity',
    value: '5',
    helper: 'Enter a quantity between 1 and 100',
    min: 1,
    max: 100,
  },
  render: renderNumberField,
};
