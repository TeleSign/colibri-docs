import { html, nothing, css, TemplateResult } from 'lit';
import { action } from '@storybook/addon-actions';
import { SITE_MENU_COLOR_VARIANTS } from '@telesign/colibri';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type SiteMenuProps = {
  color: SITE_MENU_COLOR_VARIANTS;
  selectedActionId: string;
  open: boolean;
  openSubcategoryId: string;
  ariaLabel: string;
};

type SiteMenuChildProps = {
  actionId: string;
  disabled: boolean;
  ariaLabel: string;
  categoryName: string;
  subcategoryId: string;
  itemName: string;
  href: string;
  newTab: boolean;
  router: boolean;
  parentSubcategoryId: string;
};

type SiteMenuStoryArgs = SiteMenuProps &
  SiteMenuChildProps & {
    onSiteMenuActionSelected: () => void;
    onSiteMenuSubmenuToggle: () => void;
    onSiteMenuSubcategoryToggle: () => void;
    onSiteMenuItemClick: () => void;
  };

const meta = {
  title: 'Organisms/Site Menu',
  component: 'col-site-menu',
  excludeStories: [
    'SubmenuContentTemplates',
    'NavigationPatternTemplates',
    'MenuStructureTemplates',
    'StateTemplates',
  ],
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(SITE_MENU_COLOR_VARIANTS),
      description: 'Color variant for the entire site menu system. Use `color="primary"` in HTML.',
      table: {
        category: 'Site Menu',
        type: { summary: 'SITE_MENU_COLOR_VARIANTS' },
        defaultValue: { summary: 'SITE_MENU_COLOR_VARIANTS.PRIMARY' },
      },
    },
    selectedActionId: {
      name: 'selected-action-id',
      control: { type: 'text' },
      description:
        'ID of the currently selected action button. Use `selected-action-id="dashboard"` in HTML.',
      table: {
        category: 'Site Menu',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Whether the submenu panel is visible. Use `open` attribute in HTML.',
      table: {
        category: 'Site Menu',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    openSubcategoryId: {
      name: 'open-subcategory-id',
      control: { type: 'text' },
      description:
        'ID of the currently open subcategory (single-open accordion). Use `open-subcategory-id="overview"` in HTML.',
      table: {
        category: 'Site Menu',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    actionId: {
      name: 'action-id',
      control: { type: 'text' },
      description:
        'Button: Unique identifier for action buttons. Use `action-id="dashboard"` in HTML.',
      table: {
        category: 'Button',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Button and Item: Whether the component is disabled. Use `disabled` attribute in HTML.',
      table: {
        category: 'Button',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      control: { type: 'text' },
      description:
        'All components: Accessible label for components. Use `aria-label="Dashboard"` in HTML.',
      table: {
        category: 'Button',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    categoryName: {
      name: 'category-name',
      control: { type: 'text' },
      description:
        'Category: Name identifier for categories. Use `category-name="dashboard"` in HTML.',
      table: {
        category: 'Category',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    subcategoryId: {
      name: 'subcategory-id',
      control: { type: 'text' },
      description:
        'Subcategory: Unique identifier for subcategories. Use `subcategory-id="overview"` in HTML.',
      table: {
        category: 'Subcategory',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    itemName: {
      name: 'item-name',
      control: { type: 'text' },
      description: 'Item: Name identifier for menu items. Use `item-name="home"` in HTML.',
      table: {
        category: 'Item',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'Item: URL for menu item links. Use `href="/dashboard/home"` in HTML.',
      table: {
        category: 'Item',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    newTab: {
      name: 'new-tab',
      control: { type: 'boolean' },
      description: 'Item: Whether to open link in new tab. Use `new-tab` attribute in HTML.',
      table: {
        category: 'Item',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    router: {
      control: { type: 'boolean' },
      description: 'Item: Whether to use SPA router navigation. Use `router` attribute in HTML.',
      table: {
        category: 'Item',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    parentSubcategoryId: {
      name: 'parent-subcategory-id',
      control: { type: 'text' },
      description:
        'Item: ID of parent subcategory for accessibility. Use `parent-subcategory-id="overview"` in HTML.',
      table: {
        category: 'Item',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies ColibriStoryMeta<SiteMenuStoryArgs>;

export default meta;

type Story = ColibriStory<SiteMenuStoryArgs>;
