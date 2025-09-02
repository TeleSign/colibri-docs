import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { icons } from '@telesign/colibri-icons/icons-list';
import hljs from 'highlight.js/lib/core';

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
      name: 'currency-code',
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
      name: 'display-type',
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
      name: 'error-message',
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
      name: 'validation-timing',
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
      name: 'default-value',
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
    value: '',
    variant: 'outline',
    size: 'large',
    label: '',
    helper: '',
    placeholder: '',
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

export const WithLabel: Story = {
  args: {
    label: 'Amount',
    value: '10.50',
    helper: 'Enter the amount in dollars',
    format: 'currency',
    currencyCode: 'USD',
    min: 0,
    step: 0.01,
    precision: 2,
  },
  render: renderNumberField,
};

export const WithHelper: Story = {
  args: {
    label: 'Percentage',
    value: '25',
    helper: 'Enter a percentage between 0 and 100',
    format: 'percentage',
    min: 0,
    max: 100,
    step: 1,
    precision: 0,
  },
  render: renderNumberField,
};

export const WithIcon: Story = {
  args: {
    size: 'small',
    label: 'Search Results',
    value: '42',
    helper: 'Number of search results found',
    iconVisible: true,
    iconName: 'search',
    iconSize: '16px',
  },
  render: renderNumberField,
};

export const Required: Story = {
  args: {
    label: 'Required Amount',
    value: '',
    helper: 'This field is required',
    required: true,
    error: true,
    errorMessage: 'Amount is required',
    min: 1,
    max: 1000,
  },
  render: renderNumberField,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: '50',
    helper: 'This field is disabled',
    disabled: true,
  },
  render: renderNumberField,
};

export const Error: Story = {
  args: {
    label: 'Invalid Input',
    value: '999',
    helper: 'Value exceeds maximum limit',
    error: true,
    errorMessage: 'Value must be less than 100',
    max: 100,
  },
  render: renderNumberField,
};

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Value',
    value: '42',
    helper: 'This value cannot be modified',
    readOnly: true,
  },
  render: renderNumberField,
};

/**
 * Size variants comparison - Large and small size variants
 */
export const SizeVariants: Story = {
  parameters: {
    controls: { disable: true },
    __sb: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    },
  },
  render: () => html`
    <col-number-field
      size="large"
      label="Large Size"
      value="42"
      helper="Large size variant with full button layout"
      min="0"
      max="100"
      step="1"
    ></col-number-field>
    <col-number-field
      size="small"
      label="Small Size"
      value="42"
      helper="Small size variant with compact button layout"
      min="0"
      max="100"
      step="1"
    ></col-number-field>
  `,
};

export const WithInitialValue: Story = {
  args: {
    label: 'Starting Amount',
    value: '1000',
    helper: 'This field starts with a pre-set value',
    defaultValue: 1000,
    format: 'currency',
    currencyCode: 'USD',
    min: 0,
    step: 100,
    precision: 0,
  },
  render: renderNumberField,
};

export const WithCustomValidationMessage: Story = {
  args: {
    label: 'Custom Validation',
    value: '999',
    helper: 'This field has a custom validation message',
    error: true,
    errorMessage: 'Custom error: Value must be between 1 and 500',
    min: 1,
    max: 500,
    required: true,
  },
  render: renderNumberField,
};

export const WithConstraints: Story = {
  args: {
    label: 'Constrained Input',
    value: '50',
    helper: 'Value must be between 10 and 200',
    min: 10,
    max: 200,
    step: 5,
    precision: 0,
  },
  render: renderNumberField,
};

export const WithStepValues: Story = {
  args: {
    label: 'Step Configuration',
    value: '0.5',
    helper: 'Step value of 0.5 for fine control',
    min: 0,
    max: 10,
    step: 0.5,
    precision: 1,
  },
  render: renderNumberField,
};

export const WithPrecision: Story = {
  args: {
    label: 'High Precision',
    value: '3.14159',
    helper: 'Supports up to 5 decimal places',
    min: 0,
    max: 10,
    step: 0.00001,
    precision: 5,
  },
  render: renderNumberField,
};

export const WithValidationTiming: Story = {
  args: {
    label: 'Input Validation',
    value: '42',
    helper: 'Validates on every input change',
    validationTiming: 'input',
    min: 1,
    max: 100,
    required: true,
  },
  render: renderNumberField,
};

export const WithDisplayType: Story = {
  args: {
    label: 'Placeholder Mode',
    value: '',
    placeholder: 'Enter a number between 1-100',
    helper: 'Uses placeholder text instead of default value',
    displayType: 'placeholder',
    min: 1,
    max: 100,
    step: 1,
  },
  render: renderNumberField,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const formId = 'number-field-form-example';
    const outputId = 'number-field-form-output';
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

    const script = `
      const form = document.getElementById('${formId}');
      const output = document.getElementById('${outputId}');
      const isInDocs = ${isInDocs};

      if (!isInDocs) {
        form.addEventListener('submit', (event) => {
          // Check if the event was already prevented by the FormValidationController
          if (event.defaultPrevented) {
            output.textContent = 'Form submission blocked by validation';
            return;
          }

          // Prevent the default form submission (page reload)
          event.preventDefault();

          // Only process if validation passed
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          output.textContent = JSON.stringify(data, null, 2);
        });

        form.addEventListener('reset', () => {
          output.textContent = 'Submit the form to see the data here';
        });
      }
    `;

    return html`
      <style>
        .storybook-card {
          background: #f5f6fa;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(16, 30, 54, 0.04);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .storybook-flex {
          display: flex;
          gap: 2rem;
        }
        .storybook-col {
          flex: 1 1 0;
          width: 50%;
        }
        .storybook-code {
          background: #0e0e2c;
          color: #fff;
          border-radius: 8px;
          padding: 1rem;
          font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 1rem;
          white-space: pre;
          overflow-x: auto;
          box-sizing: border-box;
        }
        .storybook-code pre {
          margin: 0;
          white-space: pre;
          overflow-x: auto;
        }
        #${outputId} {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow-x: auto;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .storybook-flex {
            flex-direction: column;
            gap: 1.5rem;
          }
          .storybook-card {
            padding: 1rem;
          }
          .storybook-col {
            width: 100%;
          }
        }
      </style>
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h3>Product Configuration Form</h3>
                  <form id="${formId}" class="form-container">
                    <col-number-field
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      default-value="5"
                      helper="Number of items to order"
                      required
                      min="1"
                      max="100"
                      step="1"
                      precision="0"
                      error-message="Quantity must be between 1 and 100"
                      validation-timing="submit"
                    ></col-number-field>
                    <col-number-field
                      id="price"
                      name="price"
                      label="Unit Price"
                      default-value="29.99"
                      helper="Price per unit in USD"
                      required
                      format="currency"
                      currency-code="USD"
                      min="0.01"
                      step="0.01"
                      precision="2"
                      error-message="Price must be greater than 0"
                      validation-timing="submit"
                    ></col-number-field>
                    <col-number-field
                      id="discount"
                      name="discount"
                      label="Discount Percentage"
                      default-value="15"
                      helper="Discount percentage (0-100)"
                      format="percentage"
                      min="0"
                      max="100"
                      step="1"
                      precision="0"
                      error-message="Discount must be between 0% and 100%"
                    ></col-number-field>
                    <col-number-field
                      id="weight"
                      name="weight"
                      label="Weight (kg)"
                      default-value="2.5"
                      helper="Product weight in kilograms"
                      min="0.1"
                      max="50"
                      step="0.1"
                      precision="1"
                      error-message="Weight must be between 0.1 and 50 kg"
                    ></col-number-field>
                    <col-group>
                      <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
                      <col-button type="reset" ?disabled=${isInDocs}>Reset</col-button>
                    </col-group>
                  </form>
                </div>
                <div class="storybook-col">
                  <h3>Form Data Integration in JavaScript</h3>
                  <div class="storybook-code">
                    <pre>${unsafeHTML(codeSnippet)}</pre>
                  </div>
                  <h3>Form Output</h3>
                  <pre id="${outputId}">Submit the form to see the data here</pre>
                  <script>
                    ${script};
                  </script>
                </div>
              </div>
            `
          : html`
              <h3>Product Configuration Form</h3>
              <form id="${formId}" class="form-container">
                <col-number-field
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  default-value="5"
                  helper="Number of items to order"
                  required
                  min="1"
                  max="100"
                  step="1"
                  precision="0"
                  validation-timing="submit"
                ></col-number-field>
                <col-number-field
                  id="price"
                  name="price"
                  label="Unit Price"
                  default-value="29.99"
                  helper="Price per unit in USD"
                  required
                  format="currency"
                  currency-code="USD"
                  min="0.01"
                  step="0.01"
                  precision="2"
                  validation-timing="submit"
                ></col-number-field>
                <col-number-field
                  id="discount"
                  name="discount"
                  label="Discount Percentage"
                  default-value="15"
                  helper="Discount percentage (0-100)"
                  format="percentage"
                  min="0"
                  max="100"
                  step="1"
                  precision="0"
                ></col-number-field>
                <col-number-field
                  id="weight"
                  name="weight"
                  label="Weight (kg)"
                  default-value="2.5"
                  helper="Product weight in kilograms"
                  min="0.1"
                  max="50"
                  step="0.1"
                  precision="1"
                ></col-number-field>
                <col-group>
                  <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
                  <col-button type="reset" ?disabled=${isInDocs}>Reset</col-button>
                </col-group>
              </form>
            `}
      </div>
    `;
  },
};
