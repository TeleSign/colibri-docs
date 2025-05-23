import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type BreadcrumbStoryArgs = {
  ariaLabel: string;
  separator: string;
  items: Array<{
    text: string;
    href?: string;
    current?: boolean;
    newTab?: boolean;
    value?: string;
    router?: boolean;
  }>;
};

const meta = {
  title: 'Navigation/Breadcrumb',
  component: 'col-breadcrumb',
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
      description: 'Accessibility label for the navigation element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb navigation' },
        category: 'Accessibility',
      },
    },
    separator: {
      control: 'select',
      options: ['/', '>', '→', '•', '|', '»', '-'],
      description: 'Character or string used to separate breadcrumb items',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '/' },
        category: 'Appearance',
      },
    },
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with their properties',
      table: {
        type: { summary: 'Array<BreadcrumbItem>' },
        category: 'Content',
      },
    },
  },
  args: {
    ariaLabel: 'Breadcrumb navigation',
    separator: '/',
    items: [],
  },
} satisfies ColibriStoryMeta<BreadcrumbStoryArgs>;

export default meta;

type Story = ColibriStory<BreadcrumbStoryArgs>;

/**
 * Reusable render function for breadcrumb component
 */
const renderBreadcrumb: Story['render'] = args => html`
  <col-breadcrumb
    ariaLabel=${args.ariaLabel}
    separator=${args.separator}
  >
    ${args.items.map(item => html`
      <col-breadcrumb-item
        href=${item.href || ''}
        ?current=${item.current}
        ?newTab=${item.newTab}
        ?router=${item.router}
        value=${item.value || ''}
      >
        ${item.text}
      </col-breadcrumb-item>
    `)}
  </col-breadcrumb>
`;

/**
 * Basic breadcrumb showing a simple navigation trail
 */
export const Basic: Story = {
  args: {
    items: [
      { text: 'Home' },
      { text: 'Products' },
      { text: 'Electronics' },
      { text: 'Phones', current: true },
    ],
  },
  render: renderBreadcrumb,
};

/**
 * Breadcrumb with custom separator
 */
export const WithCustomSeparator: Story = {
  args: {
    separator: '>',
    items: [
      { text: 'Home' },
      { text: 'Documentation' },
      { text: 'Components' },
      { text: 'Breadcrumb', current: true },
    ],
  },
  render: renderBreadcrumb,
};

/**
 * Breadcrumb with clickable links
 */
export const WithLinks: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Products', href: '/products' },
      { text: 'Electronics', href: '/products/electronics' },
      { text: 'iPhone 15', current: true },
    ],
  },
  render: renderBreadcrumb,
};

/**
 * Breadcrumb with router integration for SPA navigation
 */
export const WithRouter: Story = {
  args: {
    items: [
      { text: 'Dashboard', value: 'dashboard', router: true },
      { text: 'Users', value: 'users', router: true },
      { text: 'Profile', value: 'profile', router: true },
      { text: 'Edit', current: true },
    ],
  },
  render: (args) => html`
    <div>
      ${// @ts-ignore
        renderBreadcrumb(args)
      }
      <div style="margin-top: 16px; padding: 12px; background-color: #f5f5f5; border-radius: 4px; font-size: 14px;">
        <strong>Router mode enabled:</strong> Click items to see the breadcrumb-click event in the console.
      </div>
    </div>
    <script>
      document.addEventListener('breadcrumb-click', (event) => {
        console.log('Breadcrumb clicked:', event.detail);
      });
    </script>
  `,
};

/**
 * Mixed navigation with both links and router items
 */
export const MixedNavigation: Story = {
  args: {
    items: [
      { text: 'Home', href: '/' },
      { text: 'Documentation', href: '/docs', newTab: true },
      { text: 'API', value: 'api', router: true },
      { text: 'Methods', current: true },
    ],
  },
  render: renderBreadcrumb,
};

/**
 * Interactive breadcrumb with all features enabled
 */
export const Breadcrumb: Story = {
  args: {
    ariaLabel: 'Main navigation',
    separator: '/',
    items: [
      { text: 'Home', href: '/', value: 'home' },
      { text: 'Products', href: '/products', value: 'products' },
      { text: 'Electronics', href: '/products/electronics', value: 'electronics' },
      { text: 'Mobile Phones', href: '/products/electronics/phones', value: 'phones' },
      { text: 'iPhone 15 Pro', current: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete breadcrumb example with all features. Try customizing the separator, adding or removing items, and toggling between link and router modes.',
      },
    },
  },
  render: renderBreadcrumb,
};
