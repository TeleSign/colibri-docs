import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  id: string;
  value: string;
  selectedText: string;
  placeholder: string;
  name: string;
  variant: 'outline' | 'plain';
  align: 'start' | 'end';
  loading: boolean;
  disabled: boolean;
  error: boolean;
  valid: boolean;
  touched: boolean;
  dirty: boolean;
  focused: boolean;
  required: boolean;
  badge: boolean;
  counter: boolean;
  label: string;
  subLabel: string;
  helper: string;
  errorMessage: string;
  iconVisible: boolean;
  iconName: string;
  iconSize: string;
  optionType: 'col-list-menu' | 'custom-data';
  showOptions: boolean;
  input: () => void;
  change: () => void;
  focus: () => void;
  blur: () => void;
  selectOptionSelected: () => void;
  selectCleared: () => void;
  selectOpened: () => void;
  selectClosed: () => void;
  invalid: () => void;
};

const meta = {
  title: 'Molecules/Select',
  component: 'col-select',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description:
        'Unique identifier for the select field. Used for accessibility, form association, and testing. If not provided, a unique ID will be automatically generated.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' },
      },
      if: { arg: 'id', neq: '' },
    },
    label: {
      control: 'text',
      description: 'The main label for the select field.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'label', neq: '' },
    },
    subLabel: {
      name: 'sub-label',
      control: 'text',
      description: 'Additional label shown inside the select field as a decorator.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'subLabel', neq: '' },
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the select.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'helper', neq: '' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the select input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'placeholder', neq: '' },
    },
    name: {
      control: 'text',
      description: 'The name of the form field, used for form submission.',
      table: {
        category: 'Form',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'name', neq: '' },
    },
    value: {
      control: 'text',
      description: 'The current selected value.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    selectedText: {
      name: 'selected-text',
      control: 'text',
      description: 'The text to display for the selected option.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    variant: {
      control: 'select',
      options: ['outline', 'plain'],
      description: 'The visual variant of the select field.',
      table: {
        category: 'Core',
        type: { summary: "'outline' | 'plain'" },
        defaultValue: { summary: 'outline' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'The alignment of the dropdown.',
      table: {
        category: 'Core',
        type: { summary: "'start' | 'end'" },
        defaultValue: { summary: 'start' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the select is in a loading state.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'loading', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the select field.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    error: {
      control: 'boolean',
      description: 'Puts the select field in an error state.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'error', neq: false },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required.',
      table: {
        category: 'Validation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'required', neq: false },
    },
    badge: {
      control: 'boolean',
      description: 'Whether to display a badge with the selected count.',
      table: {
        category: 'Features',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'badge', neq: false },
    },
    counter: {
      control: 'boolean',
      description: 'Whether to display a selection counter.',
      table: {
        category: 'Features',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'counter', neq: false },
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
      if: { arg: 'errorMessage', neq: '' },
    },
    input: {
      action: 'input',
      description: 'Fired when the select value changes.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    change: {
      action: 'change',
      description: 'Fired when the select value is committed.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    focus: {
      action: 'focus',
      description: 'Fired when the select receives focus.',
      table: {
        category: 'Events',
        type: { summary: 'FocusEvent' },
      },
    },
    blur: {
      action: 'blur',
      description: 'Fired when the select loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'FocusEvent' },
      },
    },
    selectOptionSelected: {
      name: 'select-option-selected',
      action: 'select-option-selected',
      description: 'Fired when an option is selected.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string, selectedOption: SelectOption }>' },
      },
    },
    selectCleared: {
      name: 'select-cleared',
      action: 'select-cleared',
      description: 'Fired when the select value is cleared.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ previousOption: SelectOption }>' },
      },
    },
    selectOpened: {
      name: 'select-opened',
      action: 'select-opened',
      description: 'Fired when the dropdown opens.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ open: boolean }>' },
      },
    },
    selectClosed: {
      name: 'select-closed',
      action: 'select-closed',
      description: 'Fired when the dropdown closes.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ open: boolean }>' },
      },
    },
    invalid: {
      action: 'invalid',
      description: 'Fired when the select fails validation.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<ValidityState>' },
      },
    },
    iconVisible: {
      control: 'boolean',
      description:
        'Toggles the visibility of the icon slot. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        defaultValue: { summary: 'false' },
        disable: true,
      },
      if: { arg: 'iconVisible', neq: false },
    },
    iconName: {
      control: 'select',
      options: icons,
      description:
        'Name of the icon to display in the slot. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: {
        category: 'Storybook',
        disable: true,
      },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: {
        category: 'Storybook',
        disable: true,
      },
    },
    optionType: {
      control: 'select',
      options: ['col-list-menu', 'custom-data'],
      description:
        'Type of options to display in the select. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        disable: true,
      },
    },
    showOptions: {
      control: 'boolean',
      description:
        'Whether to show options in the select. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        disable: true,
      },
    },
  },
  args: {
    label: '',
    value: '',
    subLabel: '',
    helper: '',
    variant: 'outline',
    placeholder: 'Enter text here...',
    name: '',
    id: '',
    selectedText: '',
    align: 'start',
    loading: false,
    disabled: false,
    error: false,
    required: false,
    badge: false,
    counter: false,
    errorMessage: '',
    input: action('input'),
    change: action('change'),
    focus: action('focus'),
    blur: action('blur'),
    selectOptionSelected: action('select-option-selected'),
    selectCleared: action('select-cleared'),
    selectOpened: action('select-opened'),
    selectClosed: action('select-closed'),
    invalid: action('invalid'),
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
    optionType: 'col-list-menu',
    showOptions: true,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderColSelect: Story['render'] = args => {
  const renderOptions = () => {
    if (!args.showOptions) return nothing;

    if (args.optionType === 'col-list-menu') {
      return html`
        <col-list-menu role="menuitem">
          <col-list-menu-item value="option1" variant="button">Option 1</col-list-menu-item>
          <col-list-menu-item value="option2" variant="button">Option 2</col-list-menu-item>
          <col-list-menu-item value="option3" variant="button">Option 3</col-list-menu-item>
          <col-list-menu-item value="option4" variant="button">Option 4</col-list-menu-item>
          <col-list-menu-item value="option5" variant="button" disabled
            >Option 5 (Disabled)</col-list-menu-item
          >
        </col-list-menu>
      `;
    }

    return html`
      <div class="custom-options" role="menuitem">
        <div data-value="custom1" data-text="Custom Option 1">Custom Option 1</div>
        <div data-value="custom2" data-text="Custom Option 2">Custom Option 2</div>
        <div data-value="custom3" data-text="Custom Option 3">Custom Option 3</div>
        <div data-value="custom4" data-text="Custom Option 4" data-disabled="true">
          Custom Option 4 (Disabled)
        </div>
      </div>
    `;
  };

  return html`
    <col-select
      id=${args.id || nothing}
      name=${args.name || nothing}
      .value=${args.value}
      selected-text=${args.selectedText || nothing}
      label=${args.label || nothing}
      sub-label=${args.subLabel || nothing}
      helper=${args.helper || nothing}
      placeholder=${args.placeholder || nothing}
      variant=${args.variant}
      align=${args.align}
      error-message=${args.errorMessage || nothing}
      ?loading=${args.loading}
      ?disabled=${args.disabled}
      ?error=${args.error}
      ?required=${args.required}
      ?badge=${args.badge}
      ?counter=${args.counter}
      @input=${args.input}
      @change=${args.change}
      @focus=${args.focus}
      @blur=${args.blur}
      @select-option-selected=${args.selectOptionSelected}
      @select-cleared=${args.selectCleared}
      @select-opened=${args.selectOpened}
      @select-closed=${args.selectClosed}
      @invalid=${args.invalid}
    >
      ${args.iconVisible
        ? html`<col-icon slot="icon" name=${args.iconName} size=${args.iconSize}></col-icon>`
        : nothing}
      ${renderOptions()}
    </col-select>
  `;
};
