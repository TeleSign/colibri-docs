import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { disableControls, formatCodeString, getDisabledControls } from '@/utils';
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

const storyControls: (keyof StoryArgs)[] = [
  'value',
  'label',
  'subLabel',
  'helper',
  'inputType',
  'required',
  'placeholder',
  'charCount',
  'disabled',
  'readOnly',
  'error',
  'pattern',
  'minLength',
  'inputMode',
  'errorMessage',
  'validationTiming',
  'name',
  'iconVisible',
  'iconName',
  'iconSize',
  'inputMode',
];

const enabledControlsMap: Record<string, (keyof StoryArgs)[]> = {
  WithLabel: ['label', 'value', 'placeholder'],
  WithSubLabel: ['label', 'subLabel', 'value', 'placeholder'],
  WithHelper: ['label', 'helper', 'value', 'placeholder'],
  WithIcon: ['label', 'helper', 'value', 'placeholder', 'iconVisible', 'iconName', 'iconSize'],
  WithCharacterCount: ['label', 'helper', 'value', 'placeholder', 'charCount'],
  Password: ['label', 'helper', 'value', 'placeholder', 'inputType'],
  Required: ['label', 'placeholder', 'value', 'required'],
  Disabled: ['label', 'placeholder', 'value', 'disabled'],
  ReadOnly: ['label', 'placeholder', 'readOnly'],
  Error: ['label', 'placeholder', 'error'],
  WithMinLength: ['label', 'helper', 'placeholder', 'value', 'minLength', 'validationTiming'],
  WithPattern: ['label', 'helper', 'placeholder', 'value', 'pattern'],
  WithCustomValidationMessage: ['label', 'helper', 'placeholder', 'required', 'errorMessage'],
  WithCustomValidationTiming: [
    'label',
    'helper',
    'placeholder',
    'value',
    'minLength',
    'validationTiming',
    'errorMessage',
  ],
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
    name: {
      control: 'text',
      description: 'The name of the form field, used for form submission.',
      table: {
        category: 'Form',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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
    inputMode: {
      name: 'input-mode',
      control: 'select',
      options: ['text', 'email', 'numeric', 'tel', 'url'],
      description: 'The input mode for the input field.',
      table: { category: 'Core' },
    },
  },
  args: {
    label: 'Label',
    value: '',
    subLabel: '',
    helper: '',
    inputType: 'text',
    placeholder: 'Enter text here...',
    disabled: false,
    readOnly: false,
    error: false,
    required: false,
    inputMode: 'text',
    validationTiming: 'blur',
    name: 'col-text-field',
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
  },
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
    name=${args.name || nothing}
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
    subLabel: '',
    iconVisible: true,
    iconName: 'emoji-circle',
    required: true,
    inputType: 'password',
  },
  render: renderTextField,
};

export const WithLabel: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithLabel)
  ),
  args: {
    label: 'With Label',
  },
  render: renderTextField,
};

export const WithSubLabel: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithSubLabel)
  ),
  args: {
    label: 'First Name',
    subLabel: 'ES',
    placeholder: 'Enter your first name here',
  },
  render: renderTextField,
};

export const WithHelper: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithHelper)
  ),
  args: {
    label: 'Email',
    helper: 'We will never share your email.',
    placeholder: 'Enter your email here',
  },
  render: renderTextField,
};

export const WithIcon: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithIcon)
  ),
  args: {
    label: 'Search',
    helper: 'This field has an icon.',
    iconVisible: true,
    iconName: 'search',
  },
  render: renderTextField,
};

export const WithCharacterCount: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithCharacterCount)
  ),
  args: {
    label: 'Email',
    charCount: 20,
    placeholder: 'Enter your email here no longer than 20 characters',
  },
  render: renderTextField,
};

export const Password: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.Password)
  ),
  args: {
    label: 'Password',
    inputType: 'password',
    value: 'secret-password',
    helper: 'This is a password field.',
  },
  render: renderTextField,
};

export const Required: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.Required)
  ),
  args: {
    label: 'Required Field',
    required: true,
  },
  render: renderTextField,
};

export const Disabled: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.Disabled)
  ),
  args: {
    label: 'Disabled',
    placeholder: 'This field is disabled',
    disabled: true,
  },
  render: renderTextField,
};

export const ReadOnly: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.ReadOnly)
  ),
  args: {
    label: 'Read Only',
    placeholder: 'This field is read-only',
    readOnly: true,
  },
  render: renderTextField,
};

export const Error: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.Error)
  ),
  args: {
    label: 'Error',
    placeholder: 'This field has an error',
    error: true,
  },
  render: renderTextField,
};

export const WithMinLength: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithMinLength)
  ),
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
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithPattern)
  ),
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
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithCustomValidationMessage)
  ),
  args: {
    label: 'Custom Validation Message',
    required: true,
    errorMessage: 'This is a custom error message for a required field.',
    helper: 'This field is required. Click on the field and then blur it to see the validation.',
  },
  render: renderTextField,
};

export const WithCustomValidationTiming: Story = {
  argTypes: disableControls(
    meta.argTypes || {},
    ...getDisabledControls(storyControls, enabledControlsMap.WithCustomValidationTiming)
  ),
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

    const script = `
      const form = document.getElementById('${formId}');
      const output = document.getElementById('${outputId}');

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
          <col-button type="submit">Submit</col-button>
          <col-button type="reset" variant="secondary">Reset</col-button>
        </col-group>
      </form>
      <pre id="${outputId}"></pre>
      <script>
        ${script};
      </script>
    `;
  },
};
