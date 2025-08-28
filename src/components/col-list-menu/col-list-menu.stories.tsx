import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { ColListMenu, ColListMenuItem, LIST_MENU_ITEM_VARIANTS } from '@telesign/colibri';

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

function toggleSelectedItem(clickedItem: ColListMenuItem) {
  clickedItem.selected = !clickedItem.selected;
}

function selectSingle(listMenu: ColListMenu, clickedItem: ColListMenuItem) {
  listMenu.menuItems.forEach(item => {
    if (item !== clickedItem) {
      item.selected = false;
    }
  });

  toggleSelectedItem(clickedItem);
}

function setupSingleSelect(menuList: ColListMenu) {
  if (!menuList) return;

  menuList.menuItems.forEach(item => {
    item.addEventListener('list-menu-item-click', event => {
      console.log('Get the information of the selected item: ', event.detail);
      selectSingle(menuList, item);
    });
  });
}

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
    return html`
      <col-list-menu
        id="list-menu-default"
        aria-label=${ariaLabel}
        ?multiselectable=${multiselectable}
        role=${role}
      >
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
  play: async ({ canvasElement }) => {
    const menu = canvasElement.querySelector('#list-menu-default') as ColListMenu;
    setupSingleSelect(menu);
  },
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
};

export const ListMenuWithLabelItems: Story = {
  render: () => {
    return html`
      <col-list-menu id="label-items">
        <col-list-menu-item variant="label">Group Title</col-list-menu-item>
        <col-list-menu-item value="option-1">Option 1 - 1</col-list-menu-item>
        <col-list-menu-item value="option-2">Option 1 - 2</col-list-menu-item>
        <col-list-menu-item variant="label">Group Title</col-list-menu-item>
        <col-list-menu-item value="option-3">Option 2 - 1</col-list-menu-item>
        <col-list-menu-item value="option-4">Option 2 - 2</col-list-menu-item>
        <col-list-menu-item value="option-5">Option 2 - 3</col-list-menu-item>
      </col-list-menu>
    `;
  },
  play: async ({ canvasElement }) => {
    const menu = canvasElement.querySelector('#label-items') as ColListMenu;
    setupSingleSelect(menu);
  },
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
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
  render: () => {
    return html`
      <col-list-menu id="icon-items">
        ${options.map(
          ({ title, value, icon }) => html`
            <col-list-menu-item value=${value}>
              <col-icon name=${icon} size="16"></col-icon>
              ${title}
            </col-list-menu-item>
          `
        )}
      </col-list-menu>
    `;
  },
  play: async ({ canvasElement }) => {
    const menu = canvasElement.querySelector('#icon-items') as ColListMenu;
    setupSingleSelect(menu);
  },
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
};

const interactiveStoryStyles = (outputId: string) => {
  return html`
    <style>
      .storybook-card {
        background: #f1f1f1;
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
      .list-menu-container {
        background-color: #fff;
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
  `;
};

const checkboxList = (listMenuId: string, multiple: boolean = false) => html`
  <col-list-menu id="${listMenuId}" ?multiselectable=${multiple}>
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
  </col-list-menu>
`;

export const ListMenuCheckbox: Story = {
  parameters: {
    controls: { disable: true },
    __sb: { height: '100%' },
  },
  render: () => {
    const listMenuId = 'checkbox-single-menu';
    const outputId = 'checkbox-single-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const listMenuScript = (inPreCode: boolean) => `
        // --- JAVASCRIPT CODE ---
        // State and Event management needed for ColListMenu

        // Helper to toggle selected state for item
        function toggleSingleCheckboxItem(clickedItem) {
          const checkboxItem = clickedItem.querySelector('col-checkbox');
          if (clickedItem.hasAttribute('selected')) {
            clickedItem.removeAttribute('selected');
            checkboxItem.removeAttribute('checked');
          } else {
            clickedItem.setAttribute('selected', '');
            checkboxItem.setAttribute('checked', '');
          }
        }

        // Helper to clear selection for all items except the one clicked
        function selectCheckboxItem(listMenu, clickedItem) {
          listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
            const checkboxItem = item.querySelector('col-checkbox');
            if (item !== clickedItem) {
              item.removeAttribute('selected');
              checkboxItem.removeAttribute('checked');
            }
          });

          toggleSingleCheckboxItem(clickedItem);
        }

        ${inPreCode ? '' : `const checkboxOutput = document.querySelector('#${outputId}');`}
        // Add the EventListener to handle item selection
        const checkboxListMenu = document.querySelector('#${listMenuId}');
        if (checkboxListMenu) {
          checkboxListMenu.querySelectorAll('col-list-menu-item').forEach(item => {
            // Listen for our CustomEvent: 'list-menu-item-click'
            item.addEventListener('list-menu-item-click', event => {
              ${
                inPreCode
                  ? `console.log("Get the information of the selected item: ", event.detail);`
                  : `checkboxOutput.textContent = JSON.stringify(event.detail);`
              };

              // since 'multiselectable' is not present we only allow 1 item to be selected at a time
              selectCheckboxItem(checkboxListMenu, item);
            });
          });
        }
    `;

    return html`
      ${interactiveStoryStyles(outputId)}
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <h3>ColListMenu with single select ColCheckbox</h3>
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h4>ColListMenu</h4>
                  <div class="list-menu-container">${checkboxList(listMenuId)}</div>
                </div>
                <div class="storybook-col">
                  <h4>Event Output</h4>
                  <pre id="${outputId}">Select an item to see the event detail</pre>
                </div>
              </div>
              <h4>Required Javascript</h4>
              <div class="storybook-code">
                <pre>${listMenuScript(true)}</pre>
              </div>
              <script>
                ${listMenuScript(false)};
              </script>
            `
          : html`
              <h3>ColListMenu with single select ColCheckbox</h3>
              <div class="list-menu-container">${checkboxList(listMenuId)}</div>
              <script>
                ${listMenuScript(true)};
              </script>
            `}
      </div>
    `;
  },
};

export const ListMenuCheckboxWithMultiSelect: Story = {
  parameters: {
    controls: { disable: true },
    __sb: { height: '100%' },
  },
  render: () => {
    const listMenuId = 'checkbox-multiple-menu';
    const outputId = 'checkbox-multiple-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const listMenuScript = (inPreCode: boolean) => `
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
        ${inPreCode ? '' : `const multipleOutput = document.querySelector('#${outputId}');`}
        // Add the EventListener to handle item selection
        const multiList = document.querySelector('#${listMenuId}');
        if (multiList) {
          multiList.querySelectorAll('col-list-menu-item').forEach(item => {
            item.addEventListener('list-menu-item-click', (event) => {
              ${
                inPreCode
                  ? `console.log("Get the information of the selected item: ", event.detail);`
                  : `multipleOutput.textContent = JSON.stringify(event.detail);`
              };
              toggleCheckbox(item);
            });
          });
        }
    `;

    return html`
      ${interactiveStoryStyles(outputId)}
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <h3>ColListMenu with multiple select ColCheckbox</h3>
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h4>ColListMenu</h4>
                  <div class="list-menu-container">${checkboxList(listMenuId, true)}</div>
                </div>
                <div class="storybook-col">
                  <h4>Event Output</h4>
                  <pre id="${outputId}">Select an item to see the event detail</pre>
                </div>
              </div>
              <h4>Required Javascript</h4>
              <div class="storybook-code">
                <pre>${listMenuScript(true)}</pre>
              </div>
              <script>
                ${listMenuScript(false)};
              </script>
            `
          : html`
              <h3>ColListMenu with multiple select ColCheckbox</h3>
              <div class="list-menu-container">${checkboxList(listMenuId, true)}</div>
              <script>
                ${listMenuScript(true)};
              </script>
            `}
      </div>
    `;
  },
};

const radioList = html`
  <col-list-menu id="radio-list">
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
  </col-list-menu>
`;

export const ListMenuRadio: Story = {
  parameters: {
    controls: { disable: true },
    __sb: { height: '100%' },
  },
  render: () => {
    const outputId = 'radio-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const radioScript = (inPreCode: boolean) => `
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
        ${inPreCode ? '' : `const radioOutput = document.querySelector('#${outputId}');`}
        // Add the EventListener to handle item selection
        const radioList = document.querySelector('#radio-list');
        if (radioList) {
          radioList.querySelectorAll('col-list-menu-item').forEach(item => {
            item.addEventListener('list-menu-item-click', (event) => {
              ${
                inPreCode
                  ? `console.log("Get the information of the selected item: ", event.detail);`
                  : `radioOutput.textContent = JSON.stringify(event.detail);`
              };
              selectRadio(radioList, item);
            });
          });
        }
    `;

    return html`
      ${interactiveStoryStyles(outputId)}
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <h3>ColListMenu with ColRadio</h3>
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h4>ColListMenu</h4>
                  <div class="list-menu-container">${radioList}</div>
                </div>
                <div class="storybook-col">
                  <h4>Event Output</h4>
                  <pre id="${outputId}">Select an item to see the event detail</pre>
                </div>
              </div>
              <h4>Required Javascript</h4>
              <div class="storybook-code">
                <pre>${radioScript(true)}</pre>
              </div>
              <script>
                ${radioScript(false)};
              </script>
            `
          : html`
              <h3>ColListMenu with ColRadio</h3>
              <div class="list-menu-container">${radioList}</div>
              <script>
                ${radioScript(true)};
              </script>
            `}
      </div>
    `;
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
    <col-list-menu id="list-menu-slots">
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
  play: async ({ canvasElement }) => {
    const menu = canvasElement.querySelector('#list-menu-slots') as ColListMenu;
    setupSingleSelect(menu);
  },
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
};

export const ListMenuItemSlots: Story = {
  parameters: {
    controls: { disable: true },
    __sb: { height: '100%' },
  },
  render: () => {
    const outputId = 'list-menu-item-slots-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    const listMenuScript = (inPreCode: boolean) => `
      // --- JAVASCRIPT CODE ---
      // State and Event management needed for ColListMenu
      // Helper to toggle selected state for item
      function toggleSlotItem(clickedItem) {
        if (clickedItem.hasAttribute('selected')) {
          clickedItem.removeAttribute('selected');
        } else {
          clickedItem.setAttribute('selected', '');
        }
      }

      // Helper to ensure only one item is selected at a time in a list
      function slotSelectSingle(listMenu, clickedItem) {
        listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
          if (item !== clickedItem) {
            item.removeAttribute('selected');
          }
        });
        toggleSlotItem(clickedItem);
      }
      ${inPreCode ? '' : `const slotOutput = document.querySelector('#${outputId}');`}
      // Handle selection and logging for all col-list-menu-item clicks
      document.querySelectorAll('.list-menu-slot-example').forEach(listMenu => {
        listMenu.querySelectorAll('col-list-menu-item').forEach(item => {
          item.addEventListener('list-menu-item-click', event => {
            ${
              inPreCode
                ? `console.log("Get the information of the selected item: ", event.detail);`
                : `slotOutput.textContent = JSON.stringify(event.detail);`
            };
            slotSelectSingle(listMenu, item);
          });

          // Add listeners for all col-buttons in the named slot of each item
          item.querySelectorAll('col-button[slot="list-menu-item-slot"]').forEach(button => {
            button.addEventListener('click', () => {
              // You can distinguish buttons by index, text, or a custom attribute
              // Example: log which button was clicked and its parent item
              ${
                inPreCode
                  ? `console.log('ColButton was clicked', {
                button,
                parentItem: item,
                value: item.getAttribute('value'),
              });`
                  : `slotOutput.textContent = 'ColButton from item with value: ' + item.getAttribute('value') + ' was clicked';`
              };


              // Example: perform different actions based on button or parent item
              if (item.getAttribute('value') === 'special') {
                // Do something special for this item
              }
            });
          });
        });
      });
    `;

    const listMenuItemSlots = html`
      <style>
        .list-menu-grid {
          background-color: #f1f1f1;
        }
        .list-menu-wrapper {
          background-color: #fff;
        }
      </style>
      <div class="list-menu-grid">
        <col-grid cols="3" gap="m">
          <col-grid-item>
            <div class="list-menu-wrapper">
              <col-list-menu id="list-menu-item-button-slot" class="list-menu-slot-example">
                <col-list-menu-item value="option-1">
                  Option
                  <col-button slot="list-menu-item-slot">
                    <col-icon name="save" size="16px"></col-icon>
                  </col-button>
                </col-list-menu-item>
                <col-list-menu-item value="option-2">Option</col-list-menu-item>
                <col-list-menu-item value="option-3">Option</col-list-menu-item>
              </col-list-menu>
            </div>
          </col-grid-item>
          <col-grid-item>
            <div class="list-menu-wrapper">
              <col-list-menu id="list-menu-item-tag-slot" class="list-menu-slot-example">
                <col-list-menu-item value="option-4">
                  Option
                  <col-tag slot="list-menu-item-slot" text="Option" readonly>
                    <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
                  </col-tag>
                </col-list-menu-item>
                <col-list-menu-item value="option-5">Option</col-list-menu-item>
                <col-list-menu-item value="option-6">Option</col-list-menu-item>
              </col-list-menu>
            </div>
          </col-grid-item>
          <col-grid-item>
            <div class="list-menu-wrapper">
              <col-list-menu id="list-menu-item-status-slot" class="list-menu-slot-example">
                <col-list-menu-item value="option-7">
                  Option
                  <col-status slot="list-menu-item-slot" status="neutral">
                    <col-icon name="check-circle-fill"></col-icon>
                    Neutral
                  </col-status>
                </col-list-menu-item>
                <col-list-menu-item value="option-8">Option</col-list-menu-item>
                <col-list-menu-item value="option-9">Option</col-list-menu-item>
              </col-list-menu>
            </div>
          </col-grid-item>
        </col-grid>
      </div>
    `;

    return html`
      ${interactiveStoryStyles(outputId)}
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <h3>ColListMenuItem with Slots</h3>
              <div>
                <h4>ColListMenu</h4>
                <div class="list-menu-container">${listMenuItemSlots}</div>
              </div>
              <div>
                <h4>Event Output</h4>
                <pre id="${outputId}">Select an item to see the event detail</pre>
              </div>
              <h4>Required Javascript</h4>
              <div class="storybook-code">
                <pre>${listMenuScript(true)}</pre>
              </div>
              <script>
                ${listMenuScript(false)};
              </script>
            `
          : html`
              <h3>ColListMenuItem with Slots</h3>
              <div class="list-menu-container">${listMenuItemSlots}</div>
              <script>
                ${listMenuScript(true)};
              </script>
            `}
      </div>
    `;
  },
};
