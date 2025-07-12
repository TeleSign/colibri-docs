import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
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
  validationTiming?: 'blur' | 'change' | 'input' | 'submit';
  name: string;
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
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The main label for the text field.',
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
      description: 'Additional label shown inside the text field as a decorator.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'subLabel', neq: '' },
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
      if: { arg: 'inputType', neq: '' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'placeholder', neq: '' },
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
      if: { arg: 'charCount', neq: 0 },
    },
    inputMode: {
      name: 'input-mode',
      control: 'select',
      options: ['text', 'email', 'numeric', 'tel', 'url'],
      description: 'The input mode for the input field.',
      table: {
        category: 'Core',
        type: { summary: "'text' | 'email' | 'numeric' | 'tel' | 'url'" },
        defaultValue: { summary: 'text' },
      },
      if: { arg: 'inputMode', neq: '' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the text field.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    readOnly: {
      name: 'readonly',
      control: 'boolean',
      description: 'Makes the text field readonly.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'readOnly', neq: false },
    },
    error: {
      control: 'boolean',
      description: 'Puts the text field in an error state.',
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
    pattern: {
      control: 'text',
      description: 'A regex pattern for validation.',
      table: {
        category: 'Validation',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'pattern', neq: '' },
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
      if: { arg: 'minLength', neq: 0 },
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
      if: { arg: 'validationTiming', neq: '' },
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
    change: {
      action: 'change',
      description: 'Fired when the value is committed.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    input: {
      action: 'input',
      description: 'Fired when the value changes.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    focus: {
      action: 'focus',
      description: 'Fired when the component gains focus.',
      table: {
        category: 'Events',
        type: { summary: 'FocusEvent' },
      },
    },
    blur: {
      action: 'blur',
      description: 'Fired when the component loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'FocusEvent' },
      },
    },
    keydown: {
      action: 'keydown',
      description: 'Fired on keydown.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
    keyup: {
      action: 'keyup',
      description: 'Fired on keyup.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
    paste: {
      action: 'paste',
      description: 'Fired on paste.',
      table: {
        category: 'Events',
        type: { summary: 'ClipboardEvent' },
      },
    },
    invalid: {
      action: 'invalid',
      description: 'Fired when the component fails validation.',
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
        category: 'slots',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'iconVisible', neq: false },
    },
    iconName: {
      control: 'select',
      options: icons,
      description:
        'Name of the icon to display in the slot. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: { category: 'slots' },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: { category: 'slots' },
    },
  },
  args: {
    label: '',
    value: '',
    subLabel: '',
    helper: '',
    inputType: 'text',
    placeholder: 'Enter text here...',
    name: '',
    charCount: 0,
    disabled: false,
    readOnly: false,
    error: false,
    required: false,
    errorMessage: '',
    inputMode: '',
    pattern: '',
    minLength: 0,
    validationTiming: 'blur',
    change: action('change'),
    input: action('input'),
    focus: action('focus'),
    blur: action('blur'),
    keydown: action('keydown'),
    keyup: action('keyup'),
    paste: action('paste'),
    invalid: action('invalid'),
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
  },
};

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderTextField: Story['render'] = args => html`
  <col-text-field
    name=${args.name || nothing}
    .value=${args.value}
    label=${args.label || nothing}
    sub-label=${args.subLabel || nothing}
    helper=${args.helper || nothing}
    input-type=${args.inputType}
    placeholder=${args.placeholder || nothing}
    char-count=${args.charCount || nothing}
    pattern=${args.pattern || nothing}
    min-length=${args.minLength || nothing}
    input-mode=${args.inputMode || nothing}
    error-message=${args.errorMessage || nothing}
    validation-timing=${args.validationTiming || nothing}
    ?disabled=${args.disabled}
    ?readonly=${args.readOnly}
    ?error=${args.error}
    ?required=${args.required}
    @change=${args.change}
    @input=${args.input}
    @focus=${args.focus}
    @blur=${args.blur}
    @keydown=${args.keydown}
    @keyup=${args.keyup}
    @paste=${args.paste}
    @invalid=${args.invalid}
  >
    ${args.iconVisible
      ? html`<col-icon slot="icon" name=${args.iconName} size=${args.iconSize}></col-icon>`
      : nothing}
  </col-text-field>
`;

export const Default: Story = {
  args: {
    name: 'text-field-name',
    label: 'Label Text',
    subLabel: 'Sub Label',
    helper: 'Helper Text',
    required: true,
    charCount: 20,
    inputType: 'text',
    inputMode: 'text',
    iconVisible: true,
    iconName: 'emoji-circle',
    iconSize: '16px',
    validationTiming: 'input',
  },
  render: renderTextField,
};

export const WithLabel: Story = {
  args: {
    label: 'With Label',
  },
  render: renderTextField,
};

export const WithSubLabel: Story = {
  args: {
    subLabel: 'Sub Label',
    placeholder: 'Enter your first name here',
  },
  render: renderTextField,
};

export const WithHelper: Story = {
  args: {
    helper: 'We will never share your email.',
    placeholder: 'Enter your email here',
  },
  render: renderTextField,
};

export const WithIcon: Story = {
  args: {
    iconVisible: true,
    iconName: 'search',
    iconSize: '16px',
  },
  render: renderTextField,
};

export const WithCharacterCount: Story = {
  args: {
    charCount: 20,
    placeholder: 'Enter your email here no longer than 20 characters',
  },
  render: renderTextField,
};

export const Password: Story = {
  args: {
    inputType: 'password',
    value: 'secret-password',
    placeholder: '',
  },
  render: renderTextField,
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
  },
  render: renderTextField,
};

export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    disabled: true,
  },
  render: renderTextField,
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'This field is read-only',
    readOnly: true,
  },
  render: renderTextField,
};

export const Error: Story = {
  args: {
    placeholder: 'This field has an error',
    error: true,
  },
  render: renderTextField,
};

export const WithMinLength: Story = {
  args: {
    label: 'Min Length Validation',
    minLength: 5,
    placeholder: 'Enter text here no shorter than 5 characters',
    helper: 'The value must be at least 5 characters long.',
    validationTiming: 'input',
  },
  render: renderTextField,
};

export const WithPattern: Story = {
  args: {
    label: 'Email Pattern Validation',
    pattern: '[^@]+@[^@]+\\.[a-zA-Z]{2,}',
    placeholder: 'Enter a valid email address',
    helper: 'The value must be a valid email address.',
    validationTiming: 'input',
  },
  render: renderTextField,
};

export const WithCustomValidationMessage: Story = {
  args: {
    label: 'Custom Validation Message',
    required: true,
    errorMessage: 'This is a custom error message for a required field.',
    helper: 'This field is required. Click on the field and then blur it to see the validation.',
  },
  render: renderTextField,
};

export const WithCustomValidationTiming: Story = {
  args: {
    label: 'Custom Validation Timing',
    minLength: 5,
    validationTiming: 'input',
    placeholder: 'Enter text here no shorter than 5 characters',
    helper:
      'Validation triggers on every input. Try changing the validation timing to `blur`  in the controls to see the difference.',
    errorMessage: 'The value must be at least 5 characters long.',
  },
  render: renderTextField,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const formId = 'interactive-form-example';
    const outputId = 'form-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const script = `
      const form = document.getElementById('${formId}');
      const output = document.getElementById('${outputId}');
      const isInDocs = ${isInDocs};

      if (!isInDocs) {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          output.textContent = JSON.stringify(data, null, 2);
          output.style.display = 'block';
        });

        form.addEventListener('reset', () => {
          output.textContent = '';
          output.style.display = 'none';
        });
      }
    `;

    return html`
      <style>
        #${outputId} {
          display: none;
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          white-space: pre-wrap;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
      </style>
      <form id="${formId}" class="form-container">
        <col-text-field
          name="username"
          label="Username"
          helper="Your public display name."
          required
          min-length="3"
        ></col-text-field>
        <col-text-field
          name="password"
          label="Password"
          input-type="password"
          required
          min-length="8"
          helper="Must be at least 8 characters long."
        ></col-text-field>
        <col-text-field
          name="email"
          label="Email (Optional)"
          input-type="text"
          pattern="^\\S+@\\S+\\.\\S+$"
          error-message="Please enter a valid email address."
          validation-timing="input"
          helper="We will use this to contact you."
        ></col-text-field>
        <col-group>
          <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
          <col-button type="reset" variant="secondary" ?disabled=${isInDocs}>Reset</col-button>
        </col-group>
      </form>
      ${isInDocs
        ? nothing
        : html`
            <pre id="${outputId}"></pre>
            <script>
              ${script};
            </script>
          `}
    `;
  },
};
