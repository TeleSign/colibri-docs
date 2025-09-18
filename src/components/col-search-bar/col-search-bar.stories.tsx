import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';

type StoryArgs = {
  value: string;
  placeholder: string;
  variant: 'static' | 'expanded';
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
    variant: {
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
        defaultValue: { summary: false },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Storybook-only: shows a loading indicator replacing the search button',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
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
  },
  args: {
    value: '',
    placeholder: 'Search...',
    variant: 'static',
    disabled: false,
    loading: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderSearchBar: Story['render'] = args => html`
  <col-search-bar
    .value=${args.value}
    placeholder=${args.placeholder}
    variant=${args.variant}
    ?disabled=${args.disabled}
    ?loading=${args.loading}
    custom-width="100%"
    @input=${args.input}
    @change=${args.change}
    @search-input=${args['search-input']}
    @input-cleared=${args['input-cleared']}
    @focus=${args.focus}
    @blur=${args.blur}
    @keydown=${args.keydown}
    @paste=${args.paste}
  ></col-search-bar>
`;

export const Default: Story = {
  args: {
    placeholder: 'Type to search...',
    variant: 'expanded',
  },
  render: renderSearchBar,
};

export const Static: Story = {
  args: {
    variant: 'static',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const Expanded: Story = {
  args: {
    variant: 'expanded',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'expanded',
    placeholder: "Can't type",
  },
  render: renderSearchBar,
};

export const Loading: Story = {
  args: {
    loading: true,
    variant: 'expanded',
    placeholder: 'Type to search...',
  },
  render: renderSearchBar,
};

export const InteractiveForm: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <form id="interactiveForm">
        <div style="margin-bottom: 0.5rem;">
          <label>
            Variant:
            <select id="variantSelect">
              <option value="expanded">expanded</option>
              <option value="static">static</option>
            </select>
          </label>
          <label style="margin-left: 1rem;">
            <input type="checkbox" id="disabledToggle" />
            Disabled
          </label>
          <label style="margin-left: 1rem;">
            <input type="checkbox" id="loadingToggle" />
            Loading
          </label>
        </div>

        <col-search-bar
          id="searchBar"
          name="search"
          custom-width="100%"
          variant="expanded"
          placeholder="Search something..."
        ></col-search-bar>

        <div style="margin-top: 1rem;">
          <button type="submit">Submit</button>
          <button type="button" id="resetButton" style="margin-left: 1rem;">Reset</button>
        </div>

        <pre id="formOutput" style="
          margin-top: 1rem;
          padding: 0.75rem;
          border: 1px solid #ddd;
          background: #f9f9f9;
          font-size: 0.9rem;
        "></pre>
      </form>
    `;

    const form = wrapper.querySelector('form')!;
    const searchBar = wrapper.querySelector('#searchBar') as any;
    const output = wrapper.querySelector('#formOutput')!;
    const resetButton = wrapper.querySelector('#resetButton')!;
    const variantSelect = wrapper.querySelector('#variantSelect') as HTMLSelectElement;
    const disabledToggle = wrapper.querySelector('#disabledToggle') as HTMLInputElement;
    const loadingToggle = wrapper.querySelector('#loadingToggle') as HTMLInputElement;

    variantSelect.addEventListener('change', () => {
      searchBar.variant = variantSelect.value;
    });

    disabledToggle.addEventListener('change', () => {
      searchBar.disabled = disabledToggle.checked;
    });

    loadingToggle.addEventListener('change', () => {
      searchBar.loading = loadingToggle.checked;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const value = formData.get('search');

      output.textContent = `Form submitted with value: "${value}"`;

      searchBar.loading = true;
      searchBar.disabled = true;

      setTimeout(() => {
        searchBar.loading = false;
        searchBar.disabled = false;
      }, 1200);
    });

    resetButton.addEventListener('click', () => {
      searchBar.value = '';
      output.textContent = '';
      searchBar.disabled = false;
      searchBar.loading = false;
      disabledToggle.checked = false;
      loadingToggle.checked = false;
      variantSelect.value = 'expanded';
      searchBar.variant = 'expanded';
    });

    return wrapper;
  },
};
