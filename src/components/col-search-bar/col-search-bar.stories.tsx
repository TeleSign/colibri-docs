import { html, nothing } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import hljs from 'highlight.js/lib/core';

type StoryArgs = {
  value: string;
  placeholder: string;
  mode: 'static' | 'expanded';
  disabled: boolean;
  customWidth: string;
  loading: boolean;
  searchInput: () => void;
  input: () => void;
  change: () => void;
  focus: () => void;
  blur: () => void;
  keydown: () => void;
  keyup: () => void;
  paste: () => void;
  invalid: () => void;
  inputCleared: () => void;
  validationChange: () => void;
};

const meta = {
  title: 'Molecules/Search Bar',
  component: 'col-search-bar',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current text value of the search input',
      table: { category: 'Core', type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
      table: { category: 'Core', type: { summary: 'string' } },
    },
    mode: {
      control: 'select',
      options: ['static', 'expanded'],
      description: 'Initial state of the search bar: collapsed or expanded',
      table: {
        category: 'Core',
        type: { summary: "'static' | 'expanded'" },
        defaultValue: { summary: 'static' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the search bar, preventing user interaction',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Storybook-only: shows a loading indicator replacing the search button',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    searchInput: {
      name: 'search-input',
      action: 'search-input',
      description: 'Custom search input event',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    inputCleared: {
      name: 'input-cleared',
      action: 'input-cleared',
      description: 'Fired when the input value is cleared.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
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
    customWidth: {
      name: 'custom-width',
      control: 'text',
      description:
        'Sets a custom width for the component host (e.g., "320px", "50%", "min(280px, 100%)"). Applied via the `--input-width` CSS variable; defaults to `auto` when omitted.',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'customWidth', neq: '' },
    },
  },
  args: {
    value: '',
    placeholder: 'Search...',
    mode: 'static',
    disabled: false,
    loading: false,
    customWidth: '100%',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderSearchBar: Story['render'] = args => html`
  <col-search-bar
    .value=${args.value}
    placeholder=${args.placeholder}
    mode=${args.mode}
    custom-width=${args.customWidth || nothing}
    ?disabled=${args.disabled}
    ?loading=${args.loading}
    @input=${args.input}
    @change=${args.change}
    @search-input=${args.searchInput}
    @input-cleared=${args.inputCleared}
    @focus=${args.focus}
    @blur=${args.blur}
    @keydown=${args.keydown}
    @keyup=${args.keyup}
    @paste=${args.paste}
  ></col-search-bar>
`;

export const Default: Story = {
  args: {
    placeholder: 'Type to search...',
    mode: 'expanded',
  },
  render: renderSearchBar,
};

export const Static: Story = {
  args: {
    mode: 'static',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const Expanded: Story = {
  args: {
    mode: 'expanded',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    mode: 'expanded',
    placeholder: "Can't type",
  },
  render: renderSearchBar,
};

export const Loading: Story = {
  args: {
    loading: true,
    mode: 'expanded',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        transform: (code: string) => {
          const formMatch = code.match(/<form[^>]*slot="form"[^>]*>[\s\S]*?<\/form>/);
          return formatCodeString(formMatch?.[0] || '');
        },
      },
    },
  },
  render: () => {
    const formId = 'search-bar-form-example';
    const outputId = 'search-bar-form-output';
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
      form.addEventListener('reset', (event) => {
        // Only handle UI cleanup - components reset automatically
        // A custom message or action can be added here
        console.log('Form reset completed');
      });
    `).value;

    return html`
      <form-demo
        form-id="${formId}"
        output-id="${outputId}"
        title="Search Bar Configuration"
        code-snippet="${codeSnippet}"
        code-theme="dark"
      >
        <form slot="form" id="${formId}" class="form-container">
          <div style="margin-bottom: 1rem;">
            <col-group>
              <col-select id="modeSelect" name="mode" value="expanded">
                <col-list-menu role="menuitem">
                  <col-list-menu-item value="expanded">Expanded</col-list-menu-item>
                  <col-list-menu-item value="static">Static</col-list-menu-item>
                </col-list-menu>
              </col-select>
              <col-checkbox name="disabled checkbox" id="disabledToggle"> Disabled </col-checkbox>
              <col-checkbox name="loading checkbox" id="loadingToggle"> Loading </col-checkbox>
            </col-group>
          </div>
          <col-group>
            <col-search-bar
              id="searchBar"
              name="search"
              mode="expanded"
              placeholder="Search something..."
              custom-width="100%"
            ></col-search-bar>
            <col-button type="submit" ?disabled=${isInDocs}>Submit</col-button>
            <col-button type="reset" ?disabled=${isInDocs}>Reset</col-button>
          </col-group>
        </form>
      </form-demo>
      <script>
        (() => {
          const modeSelect = document.getElementById('modeSelect');
          const disabledToggle = document.getElementById('disabledToggle');
          const loadingToggle = document.getElementById('loadingToggle');
          const searchBar = document.getElementById('searchBar');
          function updateSearchBar() {
            searchBar.mode = modeSelect.value;
            searchBar.disabled = disabledToggle.checked;
            searchBar.loading = loadingToggle.checked;
          }

          modeSelect.addEventListener('change', updateSearchBar);
          disabledToggle.addEventListener('change', updateSearchBar);
          loadingToggle.addEventListener('change', updateSearchBar);
        })();
      </script>
    `;
  },
};
