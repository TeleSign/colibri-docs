import { html, TemplateResult } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { ColListMenuItem, LIST_MENU_ITEM_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  // col-list-menu-item properties
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
    disabled: {
      control: 'boolean',
      description: 'State declaring if a ListMenuItem is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    href: {
      control: 'text',
      description: 'URL for the breadcrumb link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Navigation',
      },
    },
    newTab: {
      control: 'boolean',
      description: 'Opens the link in a new tab',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Navigation',
      },
    },
    router: {
      control: 'boolean',
      description: 'Enables router mode for SPA navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Navigation',
      },
    },
    selected: {
      control: 'boolean',
      description: 'State declaring if a ListMenuItem is selected or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
    },
    variant: {
      control: 'select',
      options: Object.values(LIST_MENU_ITEM_VARIANTS),
      description: 'The variant for the ListMenuItem',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
        category: 'Core',
      },
    },
    value: {
      control: 'text',
      description: 'Value passed in the list-menu-item-click event',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Core',
      },
    },
    onListMenuItemClick: {
      action: 'list-menu-item-click',
      description: 'Fired when a ListMenuItem is clicked',
      table: {
        category: 'Events',
        type: { summary: 'ListMenuItemClickDetail' },
      },
    },
  },
  args: {
    disabled: false,
    href: '',
    newTab: false,
    router: false,
    selected: false,
    variant: LIST_MENU_ITEM_VARIANTS.BUTTON,
    value: 'list-menu-item-value',
    onListMenuItemClick: action('list-menu-item-click'),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const options = [
  { title: 'Option 1', value: 'option-1', icon: 'check-circle' },
  { title: 'Option 2', value: 'option-2', icon: 'check-circle' },
  { title: 'Option 3', value: 'option-3', icon: 'check-circle' },
  { title: 'Option 4', value: 'option-4', icon: 'check-circle' },
  { title: 'Option 5', value: 'option-5', icon: 'check-circle' },
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
  render: ({ disabled, href, newTab, router, selected, variant, value, onListMenuItemClick }) => {
    // Attach event listeners after rendering
    requestAnimationFrame(() => {
      document.querySelectorAll('col-list-menu-item').forEach(item => {
        item.addEventListener('list-menu-item-click', handleListMenuItemClick);
      });
    });

    return html`
      <col-list-menu>
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
      <col-list-menu-item value="option-1">Option 1</col-list-menu-item>
      <col-list-menu-item value="option-2">Option 2</col-list-menu-item>
      <col-list-menu-item variant="label">Group Title</col-list-menu-item>
      <col-list-menu-item value="option-3">Option 3</col-list-menu-item>
      <col-list-menu-item value="option-4">Option 4</col-list-menu-item>
      <col-list-menu-item value="option-5">Option 5</col-list-menu-item>
    </col-list-menu>
  `,
};

export const ListMenuWithNavigation: Story = {
  render: () => html`
    <col-list-menu>
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
      <div slot="banner">TODO: Include ColBanner when ready</div>
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
    <col-grid cols="3" gap="m">
      <col-grid-item>
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
      </col-grid-item>
      <col-grid-item>
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
      </col-grid-item>
      <col-grid-item>
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
      </col-grid-item>
    </col-grid>
  `,
};
