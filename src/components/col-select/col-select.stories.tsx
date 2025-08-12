import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  id: string;
  value: string;
  placeholder: string;
  name: string;
  variant: 'outline' | 'plain';
  placement: 'start' | 'end';
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
    __sb: { height: '200px' },
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
      description:
        'The current selected value. Can be used to reset the field to a previous value.',
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
    placement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'The placement of the dropdown.',
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
      },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the icon. **Storybook control only, not a component prop.**',
      if: { arg: 'iconVisible' },
      table: {
        category: 'Storybook',
      },
    },
    optionType: {
      control: 'select',
      options: ['col-list-menu', 'custom-data'],
      description:
        'Type of options to display in the select. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
      },
      if: { arg: 'showOptions', neq: false },
    },
    showOptions: {
      control: 'boolean',
      description:
        'Whether to show options in the select. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
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
    placement: 'start',
    loading: false,
    disabled: false,
    error: false,
    required: false,
    badge: false,
    counter: false,
    errorMessage: '',
    iconVisible: false,
    iconName: 'search',
    iconSize: '16px',
    showOptions: true,
    optionType: 'col-list-menu',
    input: action('input'),
    change: action('change'),
    focus: action('focus'),
    blur: action('blur'),
    selectOptionSelected: action('select-option-selected'),
    selectCleared: action('select-cleared'),
    selectOpened: action('select-opened'),
    selectClosed: action('select-closed'),
    invalid: action('invalid'),
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
          <col-list-menu-item value="option1">Option 1</col-list-menu-item>
          <col-list-menu-item value="option2">Option 2</col-list-menu-item>
          <col-list-menu-item value="option3">Option 3</col-list-menu-item>
          <col-list-menu-item value="option4">Option 4</col-list-menu-item>
          <col-list-menu-item value="option5" disabled>Option 5 (Disabled)</col-list-menu-item>
        </col-list-menu>
      `;
    }

    return html`
      <div class="custom-options" role="menuitem">
        <div data-value="custom1">Custom Option 1</div>
        <div data-value="custom2">Custom Option 2</div>
        <div data-value="custom3">Custom Option 3</div>
        <div data-value="custom4" data-disabled="true">Custom Option 4 (Disabled)</div>
      </div>
    `;
  };

  return html`
    <col-select
      id=${args.id || nothing}
      name=${args.name || nothing}
      value=${args.value || nothing}
      label=${args.label || nothing}
      sub-label=${args.subLabel || nothing}
      helper=${args.helper || nothing}
      placeholder=${args.placeholder || nothing}
      variant=${args.variant}
      placement=${args.placement}
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

export const Default: Story = {
  args: {
    label: 'Select an option',
    placeholder: 'Choose from the list...',
    name: 'select-demo',
    helper: 'Select one option from the dropdown',
    showOptions: true,
    optionType: 'col-list-menu',
  },
  render: renderColSelect,
};

export const Variants: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline variant',
    showOptions: true,
  },
  render: renderColSelect,
  tags: ['!dev'],
};

export const PlainVariant: Story = {
  args: {
    variant: 'plain',
    placeholder: 'Plain variant',
    showOptions: true,
  },
  render: renderColSelect,
  tags: ['!dev'],
};

export const Loading: Story = {
  args: {
    label: 'Loading Select',
    placeholder: 'Loading options...',
    loading: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithBadge: Story = {
  args: {
    label: 'Select with Badge',
    value: 'option1',
    badge: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithSelectionCounter: Story = {
  args: {
    label: 'Select with Counter',
    value: 'option2',
    counter: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithBadgeAndCounter: Story = {
  args: {
    label: 'Select with Badge and Counter',
    value: 'option1',
    badge: true,
    counter: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'This select is disabled',
    disabled: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const Error: Story = {
  args: {
    label: 'Select with Error',
    placeholder: 'Select an option',
    error: true,
    errorMessage: 'Please select a valid option',
    showOptions: true,
  },
  render: renderColSelect,
};

export const Required: Story = {
  args: {
    label: 'Required Select',
    placeholder: 'This field is required',
    required: true,
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithInitialValue: Story = {
  args: {
    label: 'Select with Initial Value',
    value: 'option2',
    helper: 'This select has a pre-selected value',
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithLabel: Story = {
  args: {
    label: 'Priority Level',
    placeholder: 'Select priority',
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithSubLabel: Story = {
  args: {
    label: 'Task Category',
    subLabel: 'Choose the most appropriate category',
    placeholder: 'Select category',
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithHelper: Story = {
  args: {
    label: 'Project Status',
    placeholder: 'Select status',
    helper: 'This will determine the project visibility and permissions',
    showOptions: true,
  },
  render: renderColSelect,
};

export const WithIcon: Story = {
  args: {
    label: 'Select with Icon',
    placeholder: 'Choose option',
    iconVisible: true,
    iconName: 'emoji-circle',
    iconSize: '16px',
    showOptions: true,
  },
  render: renderColSelect,
};

export const ColListMenuOptions: Story = {
  args: {
    label: 'Standard Options',
    placeholder: 'Select using col-list-menu-item',
    helper: 'Uses standard col-list-menu and col-list-menu-item components.',
    optionType: 'col-list-menu',
    showOptions: true,
  },
  render: renderColSelect,
  tags: ['!dev'],
};

export const CustomDataOptions: Story = {
  args: {
    label: 'Custom Options',
    placeholder: 'Select using custom data attributes',
    helper: 'Uses custom div elements with data-value attributes.',
    optionType: 'custom-data',
    showOptions: true,
  },
  render: renderColSelect,
  tags: ['!dev'],
};

export const WithCustomValidationMessage: Story = {
  args: {
    label: 'Project Status',
    name: 'project-status',
    placeholder: 'Select project status',
    required: true,
    errorMessage: 'Project status is required for proper task management.',
    helper: 'This field is required. Select an option and then clear it to see validation.',
    showOptions: true,
  },
  render: renderColSelect,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
    __sb: { height: '100%' },
  },
  render: () => {
    const formId = 'select-form-example';
    const outputId = 'select-form-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const script = `
      const form = document.getElementById('${formId}');
      const output = document.getElementById('${outputId}');
      const isInDocs = ${isInDocs};

      if (!isInDocs) {
        form.addEventListener('submit', (event) => {
          event.preventDefault();

          // Validate col-select components manually since they use readonly inputs
          const selects = form.querySelectorAll('col-select');
          let isFormValid = true;
          let firstInvalidSelect = null;

          selects.forEach(select => {
            const isValid = select.validate(select.value);
            if (!isValid && !firstInvalidSelect) {
              firstInvalidSelect = select;
            }
            isFormValid = isFormValid && isValid;
          });

          // Also check other form elements
          if (isFormValid && !form.checkValidity()) {
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
          }

          if (!isFormValid && firstInvalidSelect) {
            firstInvalidSelect.focus();
            return;
          }

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
          background: #23272f;
          color: #fff;
          border-radius: 8px;
          padding: 1rem;
          font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
          font-size: 0.95rem;
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
                  <h3>User Preferences Form</h3>
                  <form id="${formId}" class="form-container">
                    <col-select
                      id="country"
                      name="country"
                      label="Country"
                      placeholder="Select your country"
                      required
                      helper="This will be used for shipping."
                      error-message="Please select a country"
                    >
                      <col-list-menu role="menuitem">
                        <col-list-menu-item value="us">United States</col-list-menu-item>
                        <col-list-menu-item value="ca">Canada</col-list-menu-item>
                        <col-list-menu-item value="uk">United Kingdom</col-list-menu-item>
                        <col-list-menu-item value="de">Germany</col-list-menu-item>
                        <col-list-menu-item value="fr">France</col-list-menu-item>
                      </col-list-menu>
                    </col-select>
                    <col-select
                      id="role"
                      name="role"
                      label="User Role"
                      placeholder="Select your role"
                      required
                      badge
                      counter
                      helper="This determines your access level."
                      error-message="Please select a role"
                    >
                      <col-list-menu role="menuitem">
                        <col-list-menu-item value="admin">Administrator</col-list-menu-item>
                        <col-list-menu-item value="user">Standard User</col-list-menu-item>
                        <col-list-menu-item value="guest">Guest</col-list-menu-item>
                      </col-list-menu>
                    </col-select>
                    <col-select
                      id="theme"
                      name="theme"
                      label="Theme Preference"
                      value="light"
                      helper="Choose your preferred theme."
                    >
                      <col-list-menu role="menuitem">
                        <col-list-menu-item value="light">Light Theme</col-list-menu-item>
                        <col-list-menu-item value="dark">Dark Theme</col-list-menu-item>
                        <col-list-menu-item value="auto">Auto (System)</col-list-menu-item>
                      </col-list-menu>
                    </col-select>
                    <col-group>
                      <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
                      <col-button type="reset" variant="secondary" ?disabled=${isInDocs}
                        >Reset</col-button
                      >
                    </col-group>
                  </form>
                </div>
                <div class="storybook-col">
                  <h3>Form Data</h3>
                  <div class="storybook-code">
                    <pre>
// Handle form submit with col-select validation
const form = event.target as HTMLFormElement;
event.preventDefault();

// Col-select uses readonly inputs, so validate manually
const selects = form.querySelectorAll('col-select');
const selectsValid = Array.from(selects).every(select => select.validate(select.value));

if (!selectsValid || !form.checkValidity()) {
  // Focus first invalid element and prevent submission
  return;
}

const formData = new FormData(form);
const formValues = Object.fromEntries(formData.entries());
                    </pre
                    >
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
              <h3>User Preferences Form</h3>
              <form id="${formId}" class="form-container">
                <col-select
                  id="country"
                  name="country"
                  label="Country"
                  placeholder="Select your country"
                  required
                  helper="This will be used for shipping."
                >
                  <col-list-menu role="menuitem">
                    <col-list-menu-item value="us">United States</col-list-menu-item>
                    <col-list-menu-item value="ca">Canada</col-list-menu-item>
                    <col-list-menu-item value="uk">United Kingdom</col-list-menu-item>
                    <col-list-menu-item value="de">Germany</col-list-menu-item>
                    <col-list-menu-item value="fr">France</col-list-menu-item>
                  </col-list-menu>
                </col-select>
                <col-select
                  id="role"
                  name="role"
                  label="User Role"
                  placeholder="Select your role"
                  required
                  badge
                  counter
                  helper="This determines your access level."
                >
                  <col-list-menu role="menuitem">
                    <col-list-menu-item value="admin">Administrator</col-list-menu-item>
                    <col-list-menu-item value="user">Standard User</col-list-menu-item>
                    <col-list-menu-item value="guest">Guest</col-list-menu-item>
                  </col-list-menu>
                </col-select>
                <col-select
                  id="theme"
                  name="theme"
                  label="Theme Preference"
                  value="light"
                  helper="Choose your preferred theme."
                >
                  <div class="custom-options" role="menuitem">
                    <div data-value="light" data-text="Light Theme">Light Theme</div>
                    <div data-value="dark" data-text="Dark Theme">Dark Theme</div>
                    <div data-value="auto" data-text="Auto (System)">Auto (System)</div>
                  </div>
                </col-select>
                <col-group>
                  <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
                  <col-button type="reset" variant="secondary" ?disabled=${isInDocs}
                    >Reset</col-button
                  >
                </col-group>
              </form>
            `}
      </div>
    `;
  },
};
