import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from '@storybook/addon-actions';
import { SITE_MENU_COLOR_VARIANTS } from '@telesign/colibri';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import '@/_storybook/components/LayoutDemo';
import '@/_storybook/components/MainLogo';

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
  selected: boolean;
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
    selected: {
      control: { type: 'boolean' },
      description:
        'Button and Item: Whether the component is currently selected. Managed by the site menu context.',
      table: {
        category: 'core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'selected', neq: false },
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
    selected: false,
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
  dashboard: (categoryName?: string) => `
    <col-site-menu-category category-name="${categoryName || 'dashboard'}" aria-label="Close Dashboard">
      <col-icon name="dash-board" size="20"></col-icon>
      Dashboard
    </col-site-menu-category>
  `,

  analytics: (categoryName?: string) => `
    <col-site-menu-category category-name="${categoryName || 'analytics'}" aria-label="Close Analytics">
      <col-icon name="trending-up-square" size="20"></col-icon>
      Analytics
    </col-site-menu-category>
  `,
};

const SubcategoryTemplates = {
  overview: (
    options: {
      subcategoryId?: string;
      ariaLabel?: string;
      disabled?: boolean;
    } = {}
  ) => {
    const { subcategoryId = 'overview', ariaLabel = 'Toggle Overview', disabled = false } = options;

    return `
    <col-site-menu-subcategory subcategory-id="${subcategoryId}" aria-label="${ariaLabel}" ${disabled ? 'disabled' : ''}>
      <col-icon slot="icon" name="sight-on" size="18"></col-icon>
      Overview
      <col-site-menu-item slot="items" item-name="home" parent-subcategory-id="${subcategoryId}" href="/dashboard/home" router>Home</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="activity" parent-subcategory-id="${subcategoryId}" href="/dashboard/activity">Recent Activity</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="stats" parent-subcategory-id="${subcategoryId}">Quick Stats</col-site-menu-item>
    </col-site-menu-subcategory>
  `;
  },

  reports: (
    options: {
      subcategoryId?: string;
      ariaLabel?: string;
      disabled?: boolean;
    } = {}
  ) => {
    const { subcategoryId = 'reports', ariaLabel = 'Toggle Reports', disabled = false } = options;

    return `
      <col-site-menu-subcategory subcategory-id="${subcategoryId}" aria-label="${ariaLabel}" ${disabled ? 'disabled' : ''}>
      <col-icon slot="icon" name="documentation" size="18"></col-icon>
      Reports
      <col-site-menu-item slot="items" item-name="analytics" parent-subcategory-id="${subcategoryId}" href="/dashboard/reports/analytics" router>Analytics</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="export" parent-subcategory-id="${subcategoryId}" href="/dashboard/reports/export" router>Export Data</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="scheduled" parent-subcategory-id="${subcategoryId}">Scheduled Reports</col-site-menu-item>
    </col-site-menu-subcategory>
    `;
  },

  metrics: (
    options: {
      subcategoryId?: string;
      ariaLabel?: string;
      disabled?: boolean;
    } = {}
  ) => {
    const { subcategoryId, ariaLabel, disabled } = options;

    return `
    <col-site-menu-subcategory subcategory-id="${subcategoryId}" aria-label="${ariaLabel || 'Toggle Metrics'}" ${disabled ? 'disabled' : ''}>
      <col-icon slot="icon" name="signal" size="18"></col-icon>
      Metrics
      <col-site-menu-item slot="items" item-name="performance" parent-subcategory-id="${subcategoryId}" href="/analytics/performance" router>Performance</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="traffic" parent-subcategory-id="${subcategoryId}" href="/analytics/traffic" router>Traffic Analysis</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="conversion" parent-subcategory-id="${subcategoryId}">Conversion Rates</col-site-menu-item>
    </col-site-menu-subcategory>
  `;
  },

  insights: (
    options: {
      subcategoryId?: string;
      ariaLabel?: string;
      disabled?: boolean;
    } = {}
  ) => {
    const { subcategoryId = 'insights', ariaLabel = 'Toggle Insights', disabled = false } = options;

    return `
    <col-site-menu-subcategory subcategory-id="${subcategoryId}" aria-label="${ariaLabel}" ${disabled ? 'disabled' : ''}>
      <col-icon slot="icon" name="monitoring" size="18"></col-icon>
      Insights
      <col-site-menu-item slot="items" item-name="trends" parent-subcategory-id="${subcategoryId}" href="/analytics/trends" router>Trends</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="forecasting" parent-subcategory-id="${subcategoryId}" href="/analytics/forecast" router>Forecasting</col-site-menu-item>
      <col-site-menu-item slot="items" item-name="recommendations" parent-subcategory-id="${subcategoryId}">Recommendations</col-site-menu-item>
    </col-site-menu-subcategory>
  `;
  },
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

const renderButton = (args: SiteMenuStoryArgs) => html`
  <col-site-menu-button
    slot="actions"
    action-id="dashboard"
    aria-label="${args.ariaLabel}"
    ?disabled=${args.disabled}
    ?selected=${args.selected}
  >
    <col-icon name="dash-board" size="20"></col-icon>
  </col-site-menu-button>
`;

const renderItem = (args: SiteMenuStoryArgs) => html`
  <col-site-menu-item
    item-name="${args.itemName}"
    parent-subcategory-id="${args.parentSubcategoryId}"
    aria-label="${args.ariaLabel}"
    href="${args.href || nothing}"
    ?disabled=${args.disabled}
    ?selected=${args.selected}
    ?newtab=${args.newTab}
    ?router=${args.router}
  >
    ${args.itemName}
  </col-site-menu-item>
`;

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
        <main-logo slot="logo" color="${args.color || 'primary'}" size="36"></main-logo>
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
  parameters: {
    __sb: {
      height: '100dvh',
      margin: '0 0 0 56px',
    },
  },
  args: {
    showColorControl: false,
    color: SITE_MENU_COLOR_VARIANTS.PRIMARY,
    ariaLabel: 'Site navigation menu',
  },
  render: renderSiteMenuWithSwitching,
};

export const InteractiveExample: Story = {
  parameters: {
    __sb: {
      height: '100dvh',
      margin: '0 0 0 56px',
    },
  },
  args: {
    showColorControl: true,
    color: SITE_MENU_COLOR_VARIANTS.PRIMARY,
    ariaLabel: 'Site navigation menu',
  },
  render: renderSiteMenuWithSwitching,
};

// Hidden individual stories for MDX Canvas usage
export const ToolbarExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const toolbarMatch = code.match(
            /<col-site-menu-toolbar[^>]*>[\s\S]*?<\/col-site-menu-toolbar>/
          );
          return formatCodeString(toolbarMatch?.[0] || '');
        },
      },
    },
    __sb: {
      height: '500px',
    },
  },
  args: {
    ariaLabel: 'Site navigation toolbar',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <col-site-menu-toolbar slot="toolbar" aria-label="${args.ariaLabel}">
      <main-logo slot="logo" color="primary" size="36"></main-logo>
      <col-site-menu-button slot="actions" action-id="dashboard" aria-label="Dashboard">
        <col-icon name="dash-board" size="20"></col-icon>
      </col-site-menu-button>
      <col-site-menu-button slot="actions" action-id="analytics" aria-label="Analytics">
        <col-icon name="trending-up-square" size="20"></col-icon>
      </col-site-menu-button>
    </col-site-menu-toolbar>
    <layout-demo title="Page Title" show-placeholder></layout-demo>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const ButtonExampleEnabled: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const buttonMatch = code.match(
            /<col-site-menu-button[^>]*>[\s\S]*?<\/col-site-menu-button>/
          );
          return formatCodeString(buttonMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    ariaLabel: 'Dashboard',
    disabled: false,
  },
  render: (args: SiteMenuStoryArgs) => html` <div>${renderButton(args)}</div> `,
};

// Hidden individual stories for MDX Canvas usage
export const ButtonExampleDisabled: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const buttonMatch = code.match(
            /<col-site-menu-button[^>]*>[\s\S]*?<\/col-site-menu-button>/
          );
          return formatCodeString(buttonMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    ariaLabel: 'Dashboard',
    disabled: true,
  },
  render: (args: SiteMenuStoryArgs) => html` <div>${renderButton(args)}</div> `,
};

// Hidden individual stories for MDX Canvas usage
export const ButtonExampleSelected: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const buttonMatch = code.match(
            /<col-site-menu-button[^>]*>[\s\S]*?<\/col-site-menu-button>/
          );
          return formatCodeString(buttonMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    ariaLabel: 'Dashboard',
    selected: true,
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div id="button-selected">
      <div>${renderButton(args)}</div>
    </div>
    <script>
      setTimeout(() => {
        const button = document.querySelector('#button-selected col-site-menu-button');
        if (button) {
          // Mock the context to match the actionId
          button._context = {
            selectedActionId: 'dashboard',
            color: 'primary',
            setFocusedActionElement: () => {},
            selectAction: () => {},
            deselectAllActions: () => {},
          };
          button.requestUpdate();
        }
      }, 0);
    </script>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const SubmenuExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          // Extract only the submenu component content
          const submenuMatch = code.match(
            /<col-site-menu-submenu[^>]*>[\s\S]*?<\/col-site-menu-submenu>/
          );
          return formatCodeString(submenuMatch?.[0] || '');
        },
      },
    },
    __sb: {
      padding: '1rem',
      justifyContent: 'center',
      alignItems: 'start',
      height: '300px',
    },
  },
  args: {
    ariaLabel: 'Dashboard submenu content',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div id="submenu-container">
      <col-site-menu-submenu aria-label="${args.ariaLabel}">
        ${unsafeHTML(CategoryTemplates.dashboard())} ${unsafeHTML(SubcategoryTemplates.overview())}
        ${unsafeHTML(SubcategoryTemplates.reports())}
      </col-site-menu-submenu>
    </div>
    <script>
      setTimeout(() => {
        const submenu = document.querySelector('#submenu-container col-site-menu-submenu');
        const subcategory = submenu?.querySelector('col-site-menu-subcategory');
        const asideElement = submenu?.shadowRoot?.querySelector('aside');
        if (submenu) {
          // Set the _previousOpenState to true to prevent focus triggering
          submenu._previousOpenState = true;

          // Mock the context to make submenu visible
          submenu._context = {
            open: true,
          };
          submenu.requestUpdate();
        }
        if (subcategory) {
          // Mock the context to make subcategory expanded
          subcategory._context = {
            openSubcategoryId: 'overview',
          };
          subcategory.requestUpdate();
        }
        if (asideElement) {
          asideElement.style.transition = 'none';
        }
      }, 0);
    </script>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const CategoryExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const categoryMatch = code.match(
            /<col-site-menu-category[^>]*>[\s\S]*?<\/col-site-menu-category>/
          );
          return formatCodeString(categoryMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    categoryName: 'dashboard',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width: 242px">
      ${unsafeHTML(CategoryTemplates.dashboard(args.categoryName))}
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const SubcategoryExampleDefault: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const subcategoryMatch = code.match(
            /<col-site-menu-subcategory[^>]*>[\s\S]*?<\/col-site-menu-subcategory>/
          );
          return formatCodeString(subcategoryMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    subcategoryId: 'overview',
    ariaLabel: 'Toggle Overview',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width: 242px">
      ${unsafeHTML(
        SubcategoryTemplates.overview({
          subcategoryId: args.subcategoryId,
          ariaLabel: args.ariaLabel,
        })
      )}
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const SubcategoryExampleOpen: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const subcategoryMatch = code.match(
            /<col-site-menu-subcategory[^>]*>[\s\S]*?<\/col-site-menu-subcategory>/
          );
          return formatCodeString(subcategoryMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    },
  },
  args: {
    subcategoryId: 'overview',
    ariaLabel: 'Toggle Overview',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div id="subcategory-container" style="min-width: 242px">
      ${unsafeHTML(
        SubcategoryTemplates.overview({
          subcategoryId: args.subcategoryId,
          ariaLabel: args.ariaLabel,
        })
      )}
    </div>
    <script>
      setTimeout(() => {
        const subcategory = document.querySelector(
          '#subcategory-container col-site-menu-subcategory'
        );
        if (subcategory) {
          // Mock the context first so the setter can work
          subcategory._context = {
            openSubcategoryId: 'overview',
          };
        }
        // Now the set the open to true to expand
        subcategory.open = true;
        subcategory.requestUpdate();
      }, 0);
    </script>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const SubcategoryExampleDisabled: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const subcategoryMatch = code.match(
            /<col-site-menu-subcategory[^>]*>[\s\S]*?<\/col-site-menu-subcategory>/
          );
          return formatCodeString(subcategoryMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    subcategoryId: 'overview',
    ariaLabel: 'Toggle Overview',
    disabled: true,
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div id="subcategory-container" style="min-width: 242px">
      ${unsafeHTML(
        SubcategoryTemplates.overview({
          subcategoryId: args.subcategoryId,
          ariaLabel: args.ariaLabel,
          disabled: args.disabled,
        })
      )}
    </div>
    <script>
      setTimeout(() => {
        const subcategory = document.querySelector(
          '#subcategory-container col-site-menu-subcategory'
        );
        if (subcategory) {
          // Mock the context first so the setter can work
          subcategory._context = {
            openSubcategoryId: 'overview',
          };
        }
        // Now the set the open to true to expand
        subcategory.open = true;
        subcategory.requestUpdate();
      }, 0);
    </script>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const ItemExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const itemMatch = code.match(/<col-site-menu-item[^>]*>[\s\S]*?<\/col-site-menu-item>/);
          return formatCodeString(itemMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    itemName: 'Home',
    parentSubcategoryId: 'overview',
    ariaLabel: 'Navigate to Home',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width:242px">
      <div>${renderItem(args)}</div>
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const ItemExampleSelected: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const itemMatch = code.match(/<col-site-menu-item[^>]*>[\s\S]*?<\/col-site-menu-item>/);
          return formatCodeString(itemMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    itemName: 'Home',
    parentSubcategoryId: 'overview',
    ariaLabel: 'Navigate to Home',
    selected: true,
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width:242px">
      <div>${renderItem(args)}</div>
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const ItemExampleDisabled: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const itemMatch = code.match(/<col-site-menu-item[^>]*>[\s\S]*?<\/col-site-menu-item>/);
          return formatCodeString(itemMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    itemName: 'Home',
    parentSubcategoryId: 'overview',
    ariaLabel: 'Navigate to Home',
    disabled: true,
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width:242px">
      <div>${renderItem(args)}</div>
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const RouterItemExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const itemMatch = code.match(/<col-site-menu-item[^>]*>[\s\S]*?<\/col-site-menu-item>/);
          return formatCodeString(itemMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    itemName: 'Profile',
    parentSubcategoryId: 'account',
    href: '/settings/profile',
    router: true,
    ariaLabel: 'Navigate to Profile',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width:242px">
      <div>${renderItem(args)}</div>
    </div>
  `,
};

// Hidden individual stories for MDX Canvas usage
export const ExternalItemExample: Story = {
  tags: ['!dev'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) => {
          const itemMatch = code.match(/<col-site-menu-item[^>]*>[\s\S]*?<\/col-site-menu-item>/);
          return formatCodeString(itemMatch?.[0] || '');
        },
      },
    },
    __sb: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '150px',
    },
  },
  args: {
    itemName: '🔗 API Docs',
    parentSubcategoryId: 'help',
    href: 'https://docs.example.com/api',
    newTab: true,
    ariaLabel: 'Open API Documentation',
  },
  render: (args: SiteMenuStoryArgs) => html`
    <div style="min-width:242px">
      <div>${renderItem(args)}</div>
    </div>
  `,
};
