import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';

type StoryArgs = {
  value: string;
  placeholder: string;
  variant: 'static' | 'expanded';
  disabled: boolean;
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

export const InForm: Story = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <form id="searchForm">
        <col-search-bar
          id="searchBar"
          placeholder="Search something..."
          variant="expanded"
          value=""
        ></col-search-bar>

        <input type="hidden" name="search" id="hiddenSearchInput" value="" />

        <div style="margin-top: 1rem;">
          <button type="submit">Submit</button>
          <button type="button" id="resetButton" style="margin-left: 1rem;">Reset</button>
        </div>
      </form>
    `;

    const form = wrapper.querySelector('form')!;
    const searchBar = wrapper.querySelector('#searchBar') as HTMLElement & {
      value: string;
      loading: boolean;
      disabled: boolean;
      variant: string;
    };
    const hiddenInput = wrapper.querySelector('#hiddenSearchInput') as HTMLInputElement;
    const resetButton = wrapper.querySelector('#resetButton')!;

    hiddenInput.value = searchBar.value || '';

    searchBar.addEventListener('search-input', (e: CustomEvent) => {
      hiddenInput.value = e.detail.value;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const value = formData.get('search');

      action('Form submitted with')(value);

      searchBar.loading = true;
      searchBar.disabled = true;
    });

    resetButton.addEventListener('click', () => {
      searchBar.value = '';
      searchBar.loading = false;
      searchBar.disabled = false;
      hiddenInput.value = '';
    });

    return wrapper;
  },
};
