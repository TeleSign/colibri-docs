import { html, nothing } from 'lit-html';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import hljs from 'highlight.js/lib/core';
import '@/_storybook/templates/InteractiveFormTemplate';

type StoryArgs = {
  id: string;
  value: string;
  label: string;
  subLabel: string;
  helper: string;
  required: boolean;
  placeholder: string;
  charCount?: number;
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  minLength?: number;
  errorMessage?: string;
  validationTiming?: 'blur' | 'change' | 'input' | 'submit';
  name: string;
  change: () => void;
  input: () => void;
  focus: () => void;
  blur: () => void;
  keydown: () => void;
  keyup: () => void;
  paste: () => void;
  invalid: () => void;
  validationChange: () => void;
};

const meta: ColibriStoryMeta<StoryArgs> = {
  title: 'Molecules/Text Area',
  component: 'col-text-area',
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
        'Unique identifier for the text area. Used for accessibility, form association, and testing. If not provided, a unique ID will be automatically generated.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' },
      },
    },
    label: {
      control: 'text',
      description: 'The main label for the text area.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    subLabel: {
      name: 'sub-label',
      control: 'text',
      description: 'Additional label shown inside the text area as a decorator.',
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
      description: 'Disables the text area.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      name: 'readonly',
      control: 'boolean',
      description: 'Makes the text area readonly.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Puts the text area in an error state.',
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
    validationChange: {
      action: 'validation-change',
      description: 'Fired when validation state changes.',
      table: { category: 'Events' },
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
    helper: '',
    placeholder: 'Enter text here...',
    name: 'text-area-name',
    id: '',
    charCount: 0,
    disabled: false,
    readOnly: false,
    error: false,
    required: false,
    errorMessage: '',
    minLength: 0,
    validationTiming: 'blur',
    validationChange: action('validation-change'),
    change: action('change'),
    input: action('input'),
    focus: action('focus'),
    blur: action('blur'),
    keydown: action('keydown'),
    keyup: action('keyup'),
    paste: action('paste'),
    invalid: action('invalid'),
  },
};

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderTextArea: Story['render'] = args => {
  const {
    id,
    name,
    value,
    label,
    subLabel,
    helper,
    placeholder,
    charCount,
    minLength,
    errorMessage,
    validationTiming,
    disabled,
    readOnly,
    error,
    required,
    change,
    input,
    focus,
    blur,
    keydown,
    keyup,
    paste,
    invalid,
    validationChange,
  } = args;

  return html`
    <col-text-area
      id=${id || nothing}
      name=${name || nothing}
      .value=${value}
      label=${label || nothing}
      sub-label=${subLabel || nothing}
      helper=${helper || nothing}
      placeholder=${placeholder || nothing}
      char-count=${charCount || nothing}
      min-length=${minLength || nothing}
      error-message=${errorMessage || nothing}
      validation-timing=${validationTiming || nothing}
      ?disabled=${disabled}
      ?readonly=${readOnly}
      ?error=${error}
      ?required=${required}
      @change=${change}
      @input=${input}
      @focus=${focus}
      @blur=${blur}
      @keydown=${keydown}
      @keyup=${keyup}
      @paste=${paste}
      @invalid=${invalid}
      @validation-change=${validationChange}
    ></col-text-area>
  `;
};

export const Default: Story = {
  args: {
    label: 'Your Comment',
    placeholder: 'Enter your comment',
  },
  render: renderTextArea,
};

export const WithSubLabel: Story = {
  args: {
    label: 'Feedback',
    subLabel: '(Optional)',
  },
  render: renderTextArea,
};

export const WithHelper: Story = {
  args: {
    label: 'Description',
    helper: 'Provide a detailed description.',
  },
  render: renderTextArea,
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Review',
    charCount: 100,
    helper: 'Maximum 100 characters.',
  },
  render: renderTextArea,
};

export const WithCustomId: Story = {
  args: {
    id: 'custom-text-area-id',
    label: 'Custom ID Field',
    helper: 'This text area has a custom ID: "custom-text-area-id"',
  },
  render: renderTextArea,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Text Area',
    value: "You can't edit this.",
    disabled: true,
  },
  render: renderTextArea,
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-Only Text Area',
    value: 'You can read and copy this, but not edit.',
    readOnly: true,
  },
  render: renderTextArea,
};

export const Error: Story = {
  args: {
    label: 'Error State',
    value: 'This input has an error.',
    error: true,
    errorMessage: 'This field is in an error state.',
  },
  render: renderTextArea,
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    helper: 'This field is required for form submission.',
  },
  render: renderTextArea,
};

export const WithMinLength: Story = {
  args: {
    label: 'Bio',
    minLength: 10,
    helper: 'Must be at least 10 characters long.',
    validationTiming: 'input',
  },
  render: renderTextArea,
};

export const WithCustomValidationMessage: Story = {
  args: {
    label: 'Custom Validation',
    required: true,
    minLength: 5,
    errorMessage: 'Hey! You need to enter at least 5 characters.',
    helper: 'Validation triggers on blur (default).',
  },
  render: renderTextArea,
};

export const WithCustomValidationTiming: Story = {
  args: {
    label: 'Validate on Input',
    required: true,
    validationTiming: 'input',
    helper: 'Validation triggers as you type.',
    minLength: 5,
    errorMessage: 'The value must be at least 5 characters long.',
  },
  render: renderTextArea,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          const formMatch = code.match(/<form[^>]*>[\s\S]*?<\/form>/);
          return formatCodeString(formMatch?.[0] || '');
        },
      },
    },
  },
  render: () => {
    const formId = 'text-area-form-example';
    const outputId = 'text-area-form-output';
    const isInDocs = window.location.search.includes('viewMode=docs');
    const codeSnippet = hljs.highlightAuto(`
      // Handle form submit with FormValidationController
      form.addEventListener('submit', (event) => {
        // Check if validation was already prevented
        if (event.defaultPrevented) {
          console.log('Form submission blocked by validation');
          return;
        }

        // Prevent page reload
        event.preventDefault();

        // Process form data only if validation passed
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        console.log('Form submitted successfully:', formValues);
      });

      // Handle form reset - FormResetController handles component reset automatically
      form.addEventListener('reset', () => {
        // Only handle UI cleanup - components reset automatically
        // A custom message or action can be added here
        console.log('Form reset completed');
      });
    `).value;

    return html`
      <interactive-form-template
        form-id="${formId}"
        output-id="${outputId}"
        title="Feedback Form"
        code-snippet="${codeSnippet}"
        code-theme="dark"
      >
        <form slot="form" id="${formId}" class="form-container">
          <col-text-area
            name="comment"
            label="Comment"
            required
            min-length="10"
            helper="Please provide a comment of at least 10 characters."
            validation-timing="input"
          ></col-text-area>
          <col-text-area
            name="suggestions"
            label="Suggestions"
            char-count="200"
            helper="Any suggestions for improvement? (Max 200 chars)"
          ></col-text-area>
          <col-group>
            <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
            <col-button type="reset" ?disabled=${isInDocs}>Reset</col-button>
          </col-group>
        </form>
      </interactive-form-template>
    `;
  },
};
