import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type BreadcrumbStoryArgs = {
  ariaLabel: string;
  separator: string;
};

const meta = {
  title: 'Atoms/Breadcrumb',
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
  },
  args: {
    ariaLabel: 'Breadcrumb navigation',
    separator: '/',
  },
} satisfies ColibriStoryMeta<BreadcrumbStoryArgs>;

export default meta;

type Story = ColibriStory<BreadcrumbStoryArgs>;

/**
 * Default breadcrumb container with basic navigation items
 */
export const Default: Story = {
  args: {
    ariaLabel: 'Breadcrumb navigation',
    separator: '/',
  },
  render: (args) => html`
    <col-breadcrumb
      ariaLabel=${args.ariaLabel}
      separator=${args.separator}
    >
      <col-breadcrumb-item>Home</col-breadcrumb-item>
      <col-breadcrumb-item>Products</col-breadcrumb-item>
      <col-breadcrumb-item>Electronics</col-breadcrumb-item>
      <col-breadcrumb-item current>Mobile Phones</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Breadcrumb with custom separator character
 */
export const CustomSeparator: Story = {
  args: {
    separator: '>',
  },
  render: (args) => html`
    <col-breadcrumb separator=${args.separator}>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href="/docs">Documentation</col-breadcrumb-item>
      <col-breadcrumb-item href="/docs/components">Components</col-breadcrumb-item>
      <col-breadcrumb-item current>Breadcrumb</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Breadcrumb with custom aria-label for specific navigation context
 */
export const CustomAriaLabel: Story = {
  args: {
    ariaLabel: 'Product category navigation',
  },
  render: (args) => html`
    <col-breadcrumb ariaLabel=${args.ariaLabel}>
      <col-breadcrumb-item href="/shop">Shop</col-breadcrumb-item>
      <col-breadcrumb-item href="/shop/electronics">Electronics</col-breadcrumb-item>
      <col-breadcrumb-item href="/shop/electronics/computers">Computers</col-breadcrumb-item>
      <col-breadcrumb-item current>Laptops</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};
