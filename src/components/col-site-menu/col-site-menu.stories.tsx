import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import { SITE_MENU_COLOR_VARIANTS } from '@telesign/colibri';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import '@/_storybook/components/LayoutDemo';

type SiteMenuProps = {
  color: string;
  open: boolean;
  ariaLabel: string;
};

type SiteMenuChildProps = {
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
    showColorControl: boolean;
    selectAction: () => void;
    toggleSubmenu: () => void;
    toggleSubcategory: () => void;
    handleClick: () => void;
  };

const meta = {
  title: 'Organisms/Site Menu',
  component: 'col-site-menu',
  excludeStories: ['SubmenuContentTemplates'],
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    layout: 'fullscreen',
    __sb: {
      display: 'flex',
      gap: '1rem',
      height: '100dvh',
      margin: '0 0 0 56px',
      padding: '0 1rem',
    },
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: Object.values(SITE_MENU_COLOR_VARIANTS),
      description: 'Color variant for the entire site menu system. Use `color="primary"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
      if: { arg: 'showColorControl', neq: false },
    },
    open: {
      control: { type: 'boolean' },
      description: 'Whether the submenu panel is visible. Use `open` attribute in HTML.',
      table: {
        category: 'core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description:
        'Button and Item: Whether the component is disabled. Use `disabled` attribute in HTML.',
      table: {
        category: 'core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    ariaLabel: {
      name: 'aria-label',
      control: { type: 'text' },
      description:
        'All components: Accessible label for components. Use `aria-label="Dashboard"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'ariaLabel', neq: '' },
    },
    categoryName: {
      name: 'category-name',
      control: { type: 'text' },
      description:
        'Category: Name identifier for categories. Use `category-name="dashboard"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'categoryName', neq: '' },
    },
    subcategoryId: {
      name: 'subcategory-id',
      control: { type: 'text' },
      description:
        'Subcategory: Unique identifier for subcategories. Use `subcategory-id="overview"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'subcategoryId', neq: '' },
    },
    itemName: {
      name: 'item-name',
      control: { type: 'text' },
      description: 'Item: Name identifier for menu items. Use `item-name="home"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'itemName', neq: '' },
    },
    href: {
      control: { type: 'text' },
      description: 'Item: URL for menu item links. Use `href="/dashboard/home"` in HTML.',
      table: {
        category: 'link',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'href', neq: '' },
    },
    newTab: {
      name: 'new-tab',
      control: { type: 'boolean' },
      description: 'Item: Whether to open link in new tab. Use `new-tab` attribute in HTML.',
      table: {
        category: 'link',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'newTab', neq: false },
    },
    router: {
      control: { type: 'boolean' },
      description: 'Item: Whether to use SPA router navigation. Use `router` attribute in HTML.',
      table: {
        category: 'link',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'router', neq: false },
    },
    parentSubcategoryId: {
      name: 'parent-subcategory-id',
      control: { type: 'text' },
      description:
        'Item: ID of parent subcategory for accessibility. Use `parent-subcategory-id="overview"` in HTML.',
      table: {
        category: 'core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
      if: { arg: 'parentSubcategoryId', neq: '' },
    },
    showColorControl: {
      control: { type: 'boolean' },
      description: 'Show color control (Storybook only)',
      table: {
        category: 'Storybook',
      },
      if: { arg: 'showColorControl', neq: false },
    },
    selectAction: {
      action: 'site-menu-action-selected',
      description: 'Fired when a toolbar action button is selected.',
      table: {
        category: 'Events',
        type: { summary: '{ actionId: string }' },
      },
    },
    toggleSubmenu: {
      action: 'site-menu-submenu-toggle',
      description: 'Fired when the submenu panel is opened or closed.',
      table: {
        category: 'Events',
        type: { summary: '{ open: boolean }' },
      },
    },
    toggleSubcategory: {
      action: 'site-menu-subcategory-toggle',
      description: 'Fired when a subcategory is expanded or collapsed.',
      table: {
        category: 'Events',
        type: { summary: '{ subcategoryId: string; open: boolean }' },
      },
    },
    handleClick: {
      action: 'site-menu-item-click',
      description: 'Fired when a menu item is clicked.',
      table: {
        category: 'Events',
        type: { summary: '{ itemName: string; href: string }' },
      },
    },
  },
  args: {
    color: 'primary',
    open: false,
    disabled: false,
    ariaLabel: '',
    categoryName: '',
    subcategoryId: '',
    itemName: '',
    href: '',
    newTab: false,
    router: false,
    parentSubcategoryId: '',
    showColorControl: false,
    selectAction: action('site-menu-action-selected'),
    toggleSubmenu: action('site-menu-submenu-toggle'),
    toggleSubcategory: action('site-menu-subcategory-toggle'),
    handleClick: action('site-menu-item-click'),
  },
} satisfies ColibriStoryMeta<SiteMenuStoryArgs>;

export default meta;

type Story = ColibriStory<SiteMenuStoryArgs>;

const CategoryTemplates = {
  dashboard: () => `
    <col-site-menu-category category-name="dashboard" aria-label="Close Dashboard">
      <col-icon name="dash-board" size="20"></col-icon>
      Dashboard
    </col-site-menu-category>
  `,

  analytics: () => `
    <col-site-menu-category category-name="analytics" aria-label="Close Analytics">
      <col-icon name="trending-up-square" size="20"></col-icon>
      Analytics
    </col-site-menu-category>
  `,
};

const SubcategoryTemplates = {
  overview: () => `
    <col-site-menu-subcategory subcategory-id="overview" aria-label="Toggle Overview">
      <col-icon slot="icon" name="sight-on" size="18"></col-icon>
      Overview
      <col-site-menu-item slot="items" item-name="home" parent-subcategory-id="overview" href="/dashboard/home" router>Home</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="activity" parent-subcategory-id="overview" href="/dashboard/activity">Recent Activity</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="stats" parent-subcategory-id="overview">Quick Stats</col-site-menu-item>
    </col-site-menu-subcategory>
  `,

  reports: () => `
    <col-site-menu-subcategory subcategory-id="reports" aria-label="Toggle Reports">
      <col-icon slot="icon" name="documentation" size="18"></col-icon>
      Reports
      <col-site-menu-item slot="items" item-name="analytics" parent-subcategory-id="reports" href="/dashboard/reports/analytics" router>Analytics</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="export" parent-subcategory-id="reports" href="/dashboard/reports/export" router>Export Data</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="scheduled" parent-subcategory-id="reports">Scheduled Reports</col-site-menu-item>
    </col-site-menu-subcategory>
  `,

  metrics: () => `
    <col-site-menu-subcategory subcategory-id="metrics" aria-label="Toggle Metrics">
      <col-icon slot="icon" name="signal" size="18"></col-icon>
      Metrics
      <col-site-menu-item slot="items" item-name="performance" parent-subcategory-id="metrics" href="/analytics/performance" router>Performance</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="traffic" parent-subcategory-id="metrics" href="/analytics/traffic" router>Traffic Analysis</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="conversion" parent-subcategory-id="metrics">Conversion Rates</col-site-menu-item>
    </col-site-menu-subcategory>
  `,

  insights: () => `
    <col-site-menu-subcategory subcategory-id="insights" aria-label="Toggle Insights">
      <col-icon slot="icon" name="monitoring" size="18"></col-icon>
      Insights
      <col-site-menu-item slot="items" item-name="trends" parent-subcategory-id="insights" href="/analytics/trends" router>Trends</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="forecasting" parent-subcategory-id="insights" href="/analytics/forecast" router>Forecasting</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="recommendations" parent-subcategory-id="insights">Recommendations</col-site-menu-item>
    </col-site-menu-subcategory>
  `,
};

export const SubmenuContentTemplates = {
  dashboardContent: () => `
    ${CategoryTemplates.dashboard()}
    ${SubcategoryTemplates.overview()}
    ${SubcategoryTemplates.reports()}
  `,

  analyticsContent: () => `
    ${CategoryTemplates.analytics()}
    ${SubcategoryTemplates.metrics()}
    ${SubcategoryTemplates.insights()}
  `,
};

const renderSiteMenuWithSwitching = (args: SiteMenuStoryArgs) => {
  const handleActionSelected = (e: CustomEvent) => {
    action('site-menu-action-selected')(e);

    const { actionId } = e.detail;
    const submenuElement = (e.target as HTMLElement)?.querySelector('col-site-menu-submenu');

    if (submenuElement) {
      submenuElement.innerHTML = '';

      if (actionId === 'dashboard') {
        submenuElement.innerHTML = SubmenuContentTemplates.dashboardContent();
      } else if (actionId === 'analytics') {
        submenuElement.innerHTML = SubmenuContentTemplates.analyticsContent();
      }
    }
  };

  return html`
    <col-site-menu
      color="${args.color}"
      ?open=${args.open}
      aria-label="${args.ariaLabel || nothing}"
      @site-menu-action-selected=${handleActionSelected}
      @site-menu-submenu-toggle=${action('site-menu-submenu-toggle')}
      @site-menu-subcategory-toggle=${action('site-menu-subcategory-toggle')}
    >
      <col-site-menu-toolbar slot="toolbar">
        <col-icon slot="logo" name="home" size="24" style="color: white"></col-icon>
        <col-site-menu-button slot="actions" action-id="dashboard" aria-label="Dashboard">
          <col-icon name="dash-board" size="20"></col-icon>
        </col-site-menu-button>
        <col-site-menu-button slot="actions" action-id="analytics" aria-label="Analytics">
          <col-icon name="trending-up-square" size="20"></col-icon>
        </col-site-menu-button>
      </col-site-menu-toolbar>
      <col-site-menu-submenu slot="submenu"></col-site-menu-submenu>
    </col-site-menu>
    <layout-demo title="Page Title" show-placeholder></layout-demo>
  `;
};

export const Default: Story = {
  args: {
    showColorControl: false,
    color: SITE_MENU_COLOR_VARIANTS.PRIMARY,
    ariaLabel: 'Site navigation menu',
  },
  render: renderSiteMenuWithSwitching,
};

export const InteractiveExample: Story = {
  args: {
    showColorControl: true,
    color: SITE_MENU_COLOR_VARIANTS.PRIMARY,
    ariaLabel: 'Site navigation menu',
  },
  render: renderSiteMenuWithSwitching,
};
