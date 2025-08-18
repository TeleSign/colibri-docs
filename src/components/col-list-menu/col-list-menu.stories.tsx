import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { ColListMenuItem, LIST_MENU_ITEM_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  // col-list-menu
  // properties
  ariaLabel?: string;
  multiselectable?: boolean;
  role: string;
  // col-list-menu-item
  // properties
  disabled: boolean;
  href: string;
  newTab: boolean;
  router: boolean;
  selected: boolean;
  variant: string;
  value: string;
  // action handlers
  onListMenuItemClick: () => void;
};

const withWhiteBackground = (Story: any) => html` <div style="background: #fff;">${Story()}</div> `;

const meta = {
  title: 'Molecules/ListMenu',
  component: 'col-list-menu',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for the list menu',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'List Menu' },
        category: 'List Menu',
        subcategory: 'Accessibility',
      },
    },
    multiselectable: {
      control: 'boolean',
      description: 'Attribute to indicate if a ListMenu should allow multiple item selections',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'List Menu',
        subcategory: 'State',
      },
    },
    role: {
      control: 'select',
      description: 'ARIA role for the list menu',
      options: ['listbox', 'menu'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'listbox' },
        category: 'List Menu',
        subcategory: 'State',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a ListMenuItem is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'List Menu Item',
        subcategory: 'State',
      },
    },
    href: {
      control: 'text',
      description: 'URL for the breadcrumb link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'List Menu Item',
        subcategory: 'Navigation',
      },
    },
    newTab: {
      control: 'boolean',
      description: 'Opens the link in a new tab',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'List Menu Item',
        subcategory: 'Navigation',
      },
    },
    router: {
      control: 'boolean',
      description: 'Enables router mode for SPA navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'List Menu Item',
        subcategory: 'Navigation',
      },
    },
    selected: {
      control: 'boolean',
      description: 'State declaring if a ListMenuItem is selected or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'List Menu Item',
        subcategory: 'State',
      },
    },
    variant: {
      control: 'select',
      options: Object.values(LIST_MENU_ITEM_VARIANTS),
      description: 'The variant for the ListMenuItem',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
        category: 'List Menu Item',
        subcategory: 'Core',
      },
    },
    value: {
      control: 'text',
      description: 'Value passed in the list-menu-item-click event',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'List Menu Item',
        subcategory: 'Core',
      },
    },
    onListMenuItemClick: {
      action: 'list-menu-item-click',
      description: 'Fired when a ListMenuItem is clicked',
      table: {
        category: 'List Menu Item',
        subcategory: 'Events',
        type: { summary: 'ListMenuItemClickDetail' },
      },
    },
  },
  args: {
    ariaLabel: 'List Menu',
    multiselectable: false,
    role: 'listbox',
    disabled: false,
    href: '',
    newTab: false,
    router: false,
    selected: false,
    variant: LIST_MENU_ITEM_VARIANTS.BUTTON,
    value: 'list-menu-item-value',
    onListMenuItemClick: action('list-menu-item-click'),
  },
  decorators: [withWhiteBackground],
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const options = [
  { title: 'Option 1', value: 'option-1', icon: 'check-circle' },
  { title: 'Option 2', value: 'option-2', icon: 'check-circle' },
  { title: 'Option 3', value: 'option-3', icon: 'check-circle' },
];

const handleListMenuItemClick = (event: Event) => {
  const item = event.currentTarget as ColListMenuItem;

  if (item.href) return;

  item.selected = !item.selected;

  // Check for a <col-checkbox> inside the item
  const checkbox = item.querySelector('col-checkbox');
  if (checkbox) {
    if (checkbox.hasAttribute('checked')) {
      checkbox.removeAttribute('checked');
    } else {
      checkbox.setAttribute('checked', '');
    }
  }

  // Check for a <col-radio> inside the item
  const radio = item.querySelector('col-radio');
  if (radio) {
    if (radio.hasAttribute('checked')) {
      radio.removeAttribute('checked');
    } else {
      radio.setAttribute('checked', '');
    }
  }
};

export const Default: Story = {
  args: {
    ariaLabel: 'List Menu',
    multiselectable: false,
    role: 'listbox',
    disabled: false,
    href: '',
    newTab: false,
    router: false,
    selected: false,
    variant: LIST_MENU_ITEM_VARIANTS.BUTTON,
    value: 'list-menu-item-value',
    onListMenuItemClick: action('list-menu-item-click'),
  },
  render: ({
    ariaLabel,
    multiselectable,
    role,
    disabled,
    href,
    newTab,
    router,
    selected,
    variant,
    value,
    onListMenuItemClick,
  }) => {
    // Attach event listeners after rendering
    requestAnimationFrame(() => {
      document.querySelectorAll('col-list-menu-item').forEach(item => {
        item.addEventListener('list-menu-item-click', handleListMenuItemClick);
      });
    });

    return html`
      <col-list-menu aria-label=${ariaLabel} ?multiselectable=${multiselectable} role=${role}>
        <col-list-menu-item
          href=${href}
          variant=${variant}
          value=${value || 'option-1'}
          ?disabled=${disabled}
          ?newTab=${newTab}
          ?router=${router}
          ?selected=${selected}
          @list-menu-item-click=${onListMenuItemClick}
          >Option 1</col-list-menu-item
        >
        <col-list-menu-item value="option-2">Option 2</col-list-menu-item>
        <col-list-menu-item value="option-3">Option 3</col-list-menu-item>
        <col-list-menu-item value="option-4">Option 4</col-list-menu-item>
      </col-list-menu>
    `;
  },
};

export const ListMenuWithLabelItems: Story = {
  render: () => html`
    <col-list-menu>
      <col-list-menu-item variant="label">Group Title</col-list-menu-item>
      <col-list-menu-item value="option-1">Option 1 - 1</col-list-menu-item>
      <col-list-menu-item value="option-2">Option 1 - 2</col-list-menu-item>
      <col-list-menu-item variant="label">Group Title</col-list-menu-item>
      <col-list-menu-item value="option-3">Option 2 - 1</col-list-menu-item>
      <col-list-menu-item value="option-4">Option 2 - 2</col-list-menu-item>
      <col-list-menu-item value="option-5">Option 2 - 3</col-list-menu-item>
    </col-list-menu>
  `,
};

export const ListMenuWithNavigation: Story = {
  render: () => html`
    <col-list-menu role="menu">
      <col-list-menu-item variant="label">External Links</col-list-menu-item>
      <col-list-menu-item href="https://chat.chatbot.app/gpt4o" newtab>ChatGPT</col-list-menu-item>
      <col-list-menu-item href="https://claude.ai/" newtab>Claude</col-list-menu-item>
      <col-list-menu-item href="https://gemini.google.com/app" newtab>Gemini</col-list-menu-item>
    </col-list-menu>
  `,
};

export const ListMenuItemsWithIcons: Story = {
  render: () => html`
    <col-list-menu>
      ${options.map(
        ({ title, value, icon }) => html`
          <col-list-menu-item value=${value}>
            <col-icon name=${icon} size="16"></col-icon>
            ${title}
          </col-list-menu-item>
        `
      )}
    </col-list-menu>
  `,
};

export const ListMenuCheckbox: Story = {
  render: () => html`
    <col-list-menu>
      ${options.map(
        ({ title, value, icon }) => html`
          <col-list-menu-item value=${value}>
            <col-checkbox></col-checkbox>
            <col-icon name=${icon} size="16"></col-icon>
            ${title}
          </col-list-menu-item>
        `
      )}
    </col-list-menu>
  `,
  parameters: {
    docs: {
      source: {
        code: `
// --- JAVASCRIPT CODE ---
// State and Event management needed for ColListMenu

// Helper to clear selection for all items except the one clicked
function selectSingle(listMenu, clickedItem) {
  listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
    if (item !== clickedItem) {
      item.removeAttribute('selected');
    }
  });
  clickedItem.setAttribute('selected', '');
}
// Add the EventListener to handle item selection
const menuList = document.querySelector('col-list-menu');
if (menuList) {
  menuList.querySelectorAll('col-list-menu-item').forEach(item => {
    // Listen for our CustomEvent: 'list-menu-item-click'
    item.addEventListener('list-menu-item-click', (event) => {
      console.log("Get the information of the selected item: ", event.detail);

      // since 'multiselectable' is not present we only allow 1 item to be selected at a time
      selectSingle(menuList, item);
    });
  });
}

// --- HTML ---
<col-list-menu>
  <col-list-menu-item value="option-1">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 1
  </col-list-menu-item>
  <col-list-menu-item value="option-2">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 2
  </col-list-menu-item>
  <col-list-menu-item value="option-3">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 3
  </col-list-menu-item>
</col-list-menu>`,
      },
    },
  },
};

export const ListMenuCheckboxWithMultiSelect: Story = {
  render: () => html`
    <col-list-menu multiselectable>
      ${options.map(
        ({ title, value, icon }) => html`
          <col-list-menu-item value=${value}>
            <col-checkbox></col-checkbox>
            <col-icon name=${icon} size="16"></col-icon>
            ${title}
          </col-list-menu-item>
        `
      )}
    </col-list-menu>
  `,
  parameters: {
    docs: {
      source: {
        code: `
// --- JAVASCRIPT CODE ---
// State and Event management needed for ColListMenu

// Helper for multiselectable (checkbox)
function toggleCheckbox(item) {
  const checkbox = item.querySelector('col-checkbox');
  if (checkbox) {
    const isSelected = item.hasAttribute('selected');
    checkbox.checked = !isSelected;
    if (isSelected) {
      item.removeAttribute('selected');
    } else {
      item.setAttribute('selected', '');
    }
  }
}
// Add the EventListener to handle item selection
const multiList = document.querySelector('col-list-menu[multiselectable]');
if (multiList) {
  multiList.querySelectorAll('col-list-menu-item').forEach(item => {
    item.addEventListener('list-menu-item-click', (event) => {
      console.log("Get the information of the selected item: ", event.detail);
      toggleCheckbox(item);
    });
  });
}

// --- HTML ---
<col-list-menu>
  <col-list-menu-item value="option-1">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 1
  </col-list-menu-item>
  <col-list-menu-item value="option-2">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 2
  </col-list-menu-item>
  <col-list-menu-item value="option-3">
    <col-checkbox></col-checkbox>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 3
  </col-list-menu-item>
</col-list-menu>`,
      },
    },
  },
};

export const ListMenuRadio: Story = {
  render: () => html`
    <col-list-menu>
      ${options.map(
        ({ title, value, icon }) => html`
          <col-list-menu-item value=${value}>
            <col-radio group="demo"></col-radio>
            <col-icon name=${icon} size="16"></col-icon>
            ${title}
          </col-list-menu-item>
        `
      )}
    </col-list-menu>
  `,
  parameters: {
    docs: {
      source: {
        code: `
// --- JAVASCRIPT CODE ---
// State and Event management needed for ColListMenu

// Helper to handle radio selection
function selectRadio(listMenu, clickedItem) {
  listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
    const radio = item.querySelector('col-radio');
    if (radio) {
      radio.checked = false;
      item.removeAttribute('selected');
    }
  });
  const radio = clickedItem.querySelector('col-radio');
  if (radio) {
    radio.checked = true;
    clickedItem.setAttribute('selected', '');
  }
}
// Add the EventListener to handle item selection
const radioList = document.querySelector('col-list-menu');
if (radioList) {
  radioList.querySelectorAll('col-list-menu-item').forEach(item => {
    item.addEventListener('list-menu-item-click', (event) => {
      console.log("Get the information of the selected item: ", event.detail);
      selectRadio(radioList, item);
    });
  });
}

// --- HTML ---
<col-list-menu>
  <col-list-menu-item value="option-1">
    <col-radio group="demo"></col-radio>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 1
  </col-list-menu-item>
  <col-list-menu-item value="option-2">
    <col-radio group="demo"></col-radio>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 2
  </col-list-menu-item>
  <col-list-menu-item value="option-3">
    <col-radio group="demo"></col-radio>
    <col-icon size="16" name="check-circle"></col-icon>
    Option 3
  </col-list-menu-item>
</col-list-menu>`,
      },
    },
  },
};

export const ListMenuSlots: Story = {
  render: () => html`
    <style>
      .just-for-story {
        background-color: #f7f7f8;
        border: 1px dashed #e3e3e6;
        padding: 6;
        justify-content: center;
      }
    </style>
    <col-list-menu>
      <div slot="banner">
        <col-banner variant="info">
          <span slot="title">Title</span>
          An example of an information type banner within a ListMenu
          <col-group slot="actions">
            <col-button color="primary" variant="outlined">Button</col-button>
            <col-button color="primary" variant="outlined">Button</col-button>
          </col-group>
        </col-banner>
      </div>
      <div slot="header" class="just-for-story">
        <span>Header Slot</span>
      </div>
      <col-list-menu-item variant="label">Group Title</col-list-menu-item>
      <col-list-menu-item value="option-1">Option 1 </col-list-menu-item>
      <col-list-menu-item value="option-2">Option 2 </col-list-menu-item>
      <col-list-menu-item value="option-3">Option 3 </col-list-menu-item>
      <col-list-menu-item variant="label">Group Title</col-list-menu-item>
      <col-list-menu-item value="option-4">Option 4 </col-list-menu-item>
      <col-list-menu-item value="option-5">Option 5 </col-list-menu-item>
      <div slot="footer" class="just-for-story">
        <span>Footer Slot</span>
      </div>
    </col-list-menu>
  `,
};

export const ListMenuItemSlots: Story = {
  render: () => html`
    <style>
      .list-menu-grid {
        background-color: #e5e5e5;
      }
      .list-menu-wrapper {
        background-color: #fff;
      }
    </style>
    <div class="list-menu-grid">
      <col-grid cols="3" gap="m">
        <col-grid-item>
          <div class="list-menu-wrapper">
            <col-list-menu>
              <col-list-menu-item>
                Option
                <col-button slot="list-menu-item-slot">
                  <col-icon name="save" size="16px"></col-icon>
                </col-button>
              </col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
            </col-list-menu>
          </div>
        </col-grid-item>
        <col-grid-item>
          <div class="list-menu-wrapper">
            <col-list-menu>
              <col-list-menu-item>
                Option
                <col-tag slot="list-menu-item-slot" text="Option" readonly>
                  <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
                </col-tag>
              </col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
            </col-list-menu>
          </div>
        </col-grid-item>
        <col-grid-item>
          <div class="list-menu-wrapper">
            <col-list-menu>
              <col-list-menu-item>
                Option
                <col-status slot="list-menu-item-slot" status="neutral">
                  <col-icon name="check-circle-fill"></col-icon>
                  Neutral
                </col-status>
              </col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
              <col-list-menu-item>Option</col-list-menu-item>
            </col-list-menu>
          </div>
        </col-grid-item>
      </col-grid>
    </div>
  `,
  parameters: {
    docs: {
      source: {
        code: `
// --- JAVASCRIPT CODE ---
// State and Event management needed for ColListMenu

// Helper to ensure only one item is selected at a time in a list
function selectSingle(listMenu, clickedItem) {
  listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
    if (item !== clickedItem) {
      item.removeAttribute('selected');
    }
  });
  clickedItem.setAttribute('selected', '');
}

// Handle selection and logging for all col-list-menu-item clicks
document.querySelectorAll('col-list-menu').forEach(listMenu => {
  listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
    item.addEventListener('list-menu-item-click', event => {
      console.log(event.detail);
      selectSingle(listMenu, item);
    });

    // Add listeners for all col-buttons in the named slot of each item
    item.querySelectorAll('col-button[slot="list-menu-item-slot"]').forEach(button => {
      button.addEventListener('click', () => {
        // You can distinguish buttons by index, text, or a custom attribute
        // Example: log which button was clicked and its parent item
        console.log('ColButton was clicked', {
          button,
          parentItem: item,
          value: item.getAttribute('value'),
        });

        // Example: perform different actions based on button or parent item
        if (item.getAttribute('value') === 'special') {
          // Do something special for this item
        }
      });
    });
  });
});

// --- HTML ---
<div class="list-menu-grid">
  <col-grid cols="3" gap="m">
    <col-grid-item>
      <div class="list-menu-wrapper">
        <col-list-menu>
          <col-list-menu-item>
            Option
            <col-button slot="list-menu-item-slot">
              <col-icon name="save" size="16px"></col-icon>
            </col-button>
          </col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
        </col-list-menu>
      </div>
    </col-grid-item>
    <col-grid-item>
      <div class="list-menu-wrapper">
        <col-list-menu>
          <col-list-menu-item>
            Option
            <col-tag slot="list-menu-item-slot" text="Option" readonly>
              <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
            </col-tag>
          </col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
        </col-list-menu>
      </div>
    </col-grid-item>
    <col-grid-item>
      <div class="list-menu-wrapper">
        <col-list-menu>
          <col-list-menu-item>
            Option
            <col-status slot="list-menu-item-slot" status="neutral">
              <col-icon name="check-circle-fill"></col-icon>
              Neutral
            </col-status>
          </col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
          <col-list-menu-item>Option</col-list-menu-item>
        </col-list-menu>
      </div>
    </col-grid-item>
  </col-grid>
</div>`,
      },
    },
  },
};
