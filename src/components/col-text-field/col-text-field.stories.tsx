import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  value: string;
  label: string;
  subLabel: string;
  helper: string;
  inputType: 'text' | 'password';
  required: boolean;
  placeholder: string;
  charCount?: number;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  pattern?: string;
  minLength?: number;
  inputMode?: string;
  errorMessage?: string;
  validationTiming: 'blur' | 'change' | 'input' | 'submit';
  iconVisible: boolean;
  iconName: string;
  iconSize: string;
  change: () => void;
  input: () => void;
  focus: () => void;
  blur: () => void;
  keydown: () => void;
  keyup: () => void;
  paste: () => void;
  invalid: () => void;
};

const meta: ColibriStoryMeta<StoryArgs> = {
  title: 'Molecules/Text Field',
  component: 'col-text-field',
  argTypes: {
    label: {
      control: 'text',
      description: 'The main label for the text field.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    subLabel: {
      name: 'sub-label',
      control: 'text',
      description: 'Additional label shown inside the text field as a decorator.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
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
    inputType: {
      name: 'input-type',
      control: 'select',
      options: ['text', 'password'],
      description: 'The type of the input field.',
      table: {
        category: 'Core',
        type: { summary: "'text' | 'password'" },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    charCount: {
      name: 'char-count',
      control: 'number',
      description: 'If set, enables a character counter and limit.',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the text field.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      name: 'read-only',
      control: 'boolean',
      description: 'Makes the text field read-only.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Puts the text field in an error state.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: {
        category: 'Validation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pattern: {
      control: 'text',
      description: 'A regex pattern for validation.',
      table: {
        category: 'Validation',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    minLength: {
      name: 'min-length',
      control: 'number',
      description: 'Minimum required length of the value.',
      table: {
        category: 'Validation',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    errorMessage: {
      name: 'error-message',
      control: 'text',
      description: 'Custom error message to display when validation fails.',
      table: {
        category: 'Validation',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    validationTiming: {
      name: 'validation-timing',
      control: 'select',
      options: ['blur', 'change', 'input', 'submit'],
      description: 'Controls when validation is triggered.',
      table: {
        category: 'Validation',
        type: { summary: "'blur' | 'change' | 'input' | 'submit'" },
        defaultValue: { summary: 'blur' },
      },
    },
    iconVisible: {
      control: 'boolean',
      description: 'Toggles the visibility of the icon slot.',
      table: { category: 'Slots' },
    },
    iconName: {
      control: 'select',
      options: icons,
      description: 'Name of the icon to display in the slot.',
      if: { arg: 'iconVisible' },
      table: { category: 'Slots' },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon.',
      if: { arg: 'iconVisible' },
      table: { category: 'Slots' },
    },
    change: {
      action: 'change',
      description: 'Fired when the value is committed.',
      table: { category: 'Events' },
    },
    input: {
      action: 'input',
      description: 'Fired when the value changes.',
      table: { category: 'Events' },
    },
    focus: {
      action: 'focus',
      description: 'Fired when the component gains focus.',
      table: { category: 'Events' },
    },
    blur: {
      action: 'blur',
      description: 'Fired when the component loses focus.',
      table: { category: 'Events' },
    },
    keydown: {
      action: 'keydown',
      description: 'Fired on keydown.',
      table: { category: 'Events' },
    },
    keyup: {
      action: 'keyup',
      description: 'Fired on keyup.',
      table: { category: 'Events' },
    },
    paste: {
      action: 'paste',
      description: 'Fired on paste.',
      table: { category: 'Events' },
    },
    invalid: {
      action: 'invalid',
      description: 'Fired when the component fails validation.',
      table: { category: 'Events' },
    },
  },
  args: {
    label: 'Label',
    value: '',
    subLabel: '',
    helper: 'This is a helper text.',
    inputType: 'text',
    placeholder: 'Enter text here...',
    disabled: false,
    readOnly: false,
    error: false,
    required: false,
    validationTiming: 'blur',
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
  },
  parameters: {},
};

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderTextField: Story['render'] = args => html`
  <col-text-field
    .value=${args.value}
    label=${args.label || nothing}
    sub-label=${args.subLabel || nothing}
    helper=${args.helper || nothing}
    input-type=${args.inputType}
    ?required=${args.required}
    placeholder=${args.placeholder || nothing}
    .charCount=${args.charCount || nothing}
    ?disabled=${args.disabled}
    ?read-only=${args.readOnly}
    ?error=${args.error}
    pattern=${args.pattern || nothing}
    min-length=${args.minLength || nothing}
    input-mode=${args.inputMode || nothing}
    error-message=${args.errorMessage || nothing}
    validation-timing=${args.validationTiming}
    @change=${action('change')}
    @input=${action('input')}
    @focus=${action('focus')}
    @blur=${action('blur')}
    @keydown=${action('keydown')}
    @keyup=${action('keyup')}
    @paste=${action('paste')}
    @invalid=${action('invalid')}
  >
    ${args.iconVisible
      ? html`<col-icon slot="icon" name=${args.iconName} size=${args.iconSize}></col-icon>`
      : nothing}
  </col-text-field>
`;

export const Default: Story = {
  args: {
    label: 'Default Label Text',
    subLabel: 'Label',
    iconVisible: true,
    iconName: 'emoji-circle',
    required: true,
    inputType: 'password',
  },
  render: renderTextField,
};
