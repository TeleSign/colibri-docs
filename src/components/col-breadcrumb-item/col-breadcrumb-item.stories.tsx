import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString, disableControls } from '@/utils';

type BreadcrumbItemStoryArgs = {
  text: string;
  href: string;
  current: boolean;
  newTab: boolean;
  value: string;
  router: boolean;
};

const meta = {
  title: 'Atoms/Breadcrumb Item',
  component: 'col-breadcrumb-item',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the breadcrumb item',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb Item' },
        category: 'Content',
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
    current: {
      control: 'boolean',
      description: 'Indicates if this is the current page',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
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
    value: {
      control: 'text',
      description: 'Value passed in the breadcrumb-click event',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Events',
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
  },
  args: {
    text: 'Breadcrumb Item',
    href: '',
    current: false,
    newTab: false,
    value: '',
    router: false,
  },
} satisfies ColibriStoryMeta<BreadcrumbItemStoryArgs>;

export default meta;

type Story = ColibriStory<BreadcrumbItemStoryArgs>;

/**
 * Helper function to render breadcrumb item within a container
 */
const renderBreadcrumbItem = (args: BreadcrumbItemStoryArgs, showContainer = true) => {
  const item = html`
    <col-breadcrumb-item
      href=${args.href || ''}
      ?current=${args.current}
      ?newTab=${args.newTab}
      ?router=${args.router}
      value=${args.value || ''}
    >
      ${args.text}
    </col-breadcrumb-item>
  `;

  return showContainer ? html`
    <col-breadcrumb>
      ${item}
    </col-breadcrumb>
  ` : item;
};

/**
 * Default breadcrumb item with full controls
 */
export const Default: Story = {
  args: {
    text: 'Products',
    href: '/products',
  },
  render: (args) => renderBreadcrumbItem(args),
};

/**
 * Basic text item without navigation
 */
export const TextItem: Story = {
  args: {
    text: 'Category',
  },
  argTypes: disableControls('href', 'newTab', 'router', 'value'),
  render: (args) => html`
    <col-breadcrumb>
      <col-breadcrumb-item>Home</col-breadcrumb-item>
      <col-breadcrumb-item>${args.text}</col-breadcrumb-item>
      <col-breadcrumb-item>Subcategory</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Clickable link item
 */
export const LinkItem: Story = {
  args: {
    text: 'Products',
    href: '/products',
  },
  argTypes: disableControls('current', 'router', 'value'),
  render: (args) => html`
    <col-breadcrumb>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item
        href=${args.href}
        ?newTab=${args.newTab}
      >
        ${args.text}
      </col-breadcrumb-item>
      <col-breadcrumb-item current>Electronics</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Current page indicator
 */
export const CurrentPage: Story = {
  args: {
    text: 'Current Page',
    current: true,
  },
  argTypes: disableControls('href', 'newTab', 'router', 'value'),
  render: (args) => html`
    <col-breadcrumb>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href="/products">Products</col-breadcrumb-item>
      <col-breadcrumb-item current>${args.text}</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * External link opening in new tab
 */
export const ExternalLink: Story = {
  args: {
    text: 'Documentation',
    href: 'https://docs.example.com',
    newTab: true,
  },
  argTypes: disableControls('current', 'router', 'value'),
  render: (args) => html`
    <col-breadcrumb>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item
        href=${args.href}
        newTab
      >
        ${args.text} ↗
      </col-breadcrumb-item>
      <col-breadcrumb-item current>API Reference</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Router navigation for SPA
 */
export const RouterNavigation: Story = {
  args: {
    text: 'Dashboard',
    value: 'dashboard',
    router: true,
  },
  argTypes: disableControls('current', 'newTab'),
  render: (args) => html`
    <div>
      <col-breadcrumb>
        <col-breadcrumb-item
          value="home"
          router
        >
          Home
        </col-breadcrumb-item>
        <col-breadcrumb-item
          value=${args.value}
          router
        >
          ${args.text}
        </col-breadcrumb-item>
        <col-breadcrumb-item current>Settings</col-breadcrumb-item>
      </col-breadcrumb>

      <div style="margin-top: 16px; padding: 12px; background-color: #f5f5f5; border-radius: 4px; font-size: 14px;">
        <strong>Router mode enabled:</strong> Click items to see events in the console.
      </div>
    </div>

    <script>
      document.addEventListener('breadcrumb-click', (event) => {
        console.log('Breadcrumb clicked:', event.detail);
        // In a real app: router.navigate(event.detail.value);
      });
    </script>
  `,
};

/**
 * Download link (less common use case)
 */
export const DownloadLink: Story = {
  args: {
    text: 'Export Data',
    href: '/api/export/data.csv',
  },
  argTypes: disableControls('current', 'router', 'value', 'newTab'),
  render: (args) => html`
    <col-breadcrumb>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href="/reports">Reports</col-breadcrumb-item>
      <col-breadcrumb-item
        href=${args.href}
      >
        ${args.text} ⬇
      </col-breadcrumb-item>
    </col-breadcrumb>
  `,
};
