import { html, css } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import '@/_storybook/components/CodeBlock';
import hljs from 'highlight.js/lib/core';

type BreadcrumbStoryArgs = {
  // col-breadcrumb properties
  ariaLabel: string;
  separator: string;
  // col-breadcrumb-item properties
  text: string;
  href: string;
  current: boolean;
  newTab: boolean;
  value: string;
  router: boolean;
  downloadable: boolean;
  filename: string;
  // action handlers
  onBreadcrumbClick: () => void;
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
    // col-breadcrumb properties
    ariaLabel: {
      name: 'aria-label',
      control: 'text',
      description: 'Accessibility label for the navigation element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Breadcrumb navigation' },
        category: 'Accessibility',
      },
      if: { arg: 'ariaLabel', neq: '' },
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
      if: { arg: 'separator', neq: '' },
    },
    // col-breadcrumb-item properties
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
      if: { arg: 'href', neq: '' },
    },
    current: {
      control: 'boolean',
      description: 'Indicates if this is the current page',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'State',
      },
      if: { arg: 'current', neq: false },
    },
    newTab: {
      name: 'newtab',
      control: 'boolean',
      description: 'Opens the link in a new tab',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Navigation',
      },
      if: { arg: 'newTab', neq: false },
    },
    downloadable: {
      control: 'boolean',
      description: 'Downloads the link',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Navigation',
      },
      if: { arg: 'downloadable', neq: false },
    },
    filename: {
      control: 'text',
      description: 'Filename of the downloadable link',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Navigation',
      },
      if: { arg: 'filename', neq: '' },
    },
    value: {
      control: 'text',
      description: 'Value passed in the breadcrumb-click event',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Events',
      },
      if: { arg: 'value', neq: '' },
    },
    router: {
      control: 'boolean',
      description: 'Enables router mode for SPA navigation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Navigation',
      },
      if: { arg: 'router', neq: false },
    },
    onBreadcrumbClick: {
      action: 'breadcrumb-click',
      description: 'Fired when a breadcrumb item is clicked',
      table: {
        category: 'Events',
        type: { summary: 'BreadcrumbClickDetail' },
      },
    },
  },
  args: {
    ariaLabel: '',
    separator: '',
    text: '',
    href: '',
    current: false,
    newTab: false,
    value: '',
    router: false,
    downloadable: false,
    filename: '',
    onBreadcrumbClick: action('breadcrumb-click'),
  },
} satisfies ColibriStoryMeta<BreadcrumbStoryArgs>;

export default meta;

type Story = ColibriStory<BreadcrumbStoryArgs>;

/**
 * Styles for the breadcrumb stories using Lit's css template literal.
 * These styles are scoped to the stories and won't affect other components.
 */
const styles = css`
  .breadcrumb-demo {
    padding: 1rem;
    border: 1px solid var(--col-theme-border-base);
    border-radius: 4px;
    background: var(--col-theme-background-primary);
    font-family: var(--col-typography-font-family-primary);
  }

  .router-info {
    margin-top: 16px;
    padding: 12px;
    background-color: #f5f5f5;
    border-radius: 4px;
    font-size: 14px;
    font-family: var(--col-typography-font-family-primary);
    color: var(--col-theme-text-secondary);
  }
`;

/**
 * Default breadcrumb with interactive controls
 * Demonstrates both col-breadcrumb and col-breadcrumb-item functionality
 */
export const Default: Story = {
  args: {
    ariaLabel: 'Breadcrumb navigation',
    separator: '/',
    text: 'Products',
    href: '/products',
  },
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb
      aria-label=${args.ariaLabel}
      separator=${args.separator}
      @breadcrumb-click=${args.onBreadcrumbClick}
    >
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item
        href=${args.href}
        ?newTab=${args.newTab}
        ?router=${args.router}
        value=${args.value || ''}
      >
        ${args.text}
      </col-breadcrumb-item>
      <col-breadcrumb-item current>Details</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Custom separator demonstration
 * Shows how to change the separator character between breadcrumb items
 */
export const CustomSeparator: Story = {
  args: {
    separator: '>',
    text: 'Documentation',
    href: '/docs',
  },
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb separator=${args.separator} @breadcrumb-click=${args.onBreadcrumbClick}>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href="/docs">Documentation</col-breadcrumb-item>
      <col-breadcrumb-item href="/docs/components">Components</col-breadcrumb-item>
      <col-breadcrumb-item current>Breadcrumb</col-breadcrumb-item>
    </col-breadcrumb>
  `,
};

/**
 * Basic text item without navigation
 */
export const TextItem: Story = {
  args: {
    text: 'Category',
  },
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb @breadcrumb-click=${args.onBreadcrumbClick}>
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
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb @breadcrumb-click=${args.onBreadcrumbClick}>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href=${args.href} ?newTab=${args.newTab}>
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
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb @breadcrumb-click=${args.onBreadcrumbClick}>
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
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-breadcrumb @breadcrumb-click=${args.onBreadcrumbClick}>
      <col-breadcrumb-item href="/">Home</col-breadcrumb-item>
      <col-breadcrumb-item href=${args.href} ?newTab=${args.newTab}>
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
  render: args => {
    const isInDocs = window.location.search.includes('viewMode=docs');

    return html`
      <style>
        ${styles}
      </style>
      <col-breadcrumb @breadcrumb-click=${args.onBreadcrumbClick}>
        <col-breadcrumb-item value="home" router> Home </col-breadcrumb-item>
        <col-breadcrumb-item value=${args.value} ?router=${args.router}>
          ${args.text}
        </col-breadcrumb-item>
        <col-breadcrumb-item current>Settings</col-breadcrumb-item>
      </col-breadcrumb>

      ${!isInDocs
        ? html`
            <div class="router-info">
              <strong>Router mode enabled:</strong> Click items to see events in the actions tab.
            </div>
          `
        : html``}
    `;
  },
};

/**
 * Download link (less common use case)
 */
export const DownloadLink: Story = {
  name: 'Download Link',
  args: {
    downloadable: true,
    href: '#',
    filename: 'data.csv',
  },
  parameters: {
    controls: { disable: true },
  },
  render: args => {
    const isInDocs = window.location.search.includes('viewMode=docs');
    const outputId = 'download-event-output';

    const codeSnippet = hljs.highlightAuto(`
// Handle download click
const downloadLink = document.querySelector('#download-breadcrumb-item');
downloadLink.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  // Generate CSV content
  const csvContent = 'Name,Email\\nJohn,john@example.com\\nJane,jane@example.com';
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Create event detail
  const detail = {
    value: 'download',
    label: 'Export Data',
    index: 2,
    href: '#',
  };

  // Update output if available
  if (output && !isInDocs) {
    output.textContent = JSON.stringify(detail, null, 2);
  }

  // Also dispatch the breadcrumb-click event for consistency
  e.target?.dispatchEvent(
    new CustomEvent('breadcrumb-click', {
      detail,
      bubbles: true,
      composed: true,
    })
  );
});
    `).value;

    const styles = css`
      .storybook-flex {
        display: flex;
        gap: 2rem;
      }

      .storybook-col {
        flex: 1 1 0;
      }

      @media (max-width: 900px) {
        .storybook-flex {
          flex-direction: column;
          gap: 1.5rem;
        }
      }
    `;

    return html`
      ${!isInDocs
        ? html`
            <style>
              ${styles}
            </style>
            <div class="storybook-flex">
              <div class="storybook-col">
                <h3>Download Breadcrumb</h3>
                <div
                  style="padding: 1rem; border: 1px solid var(--col-theme-border-base); border-radius: 4px; background: var(--col-theme-background-primary); font-family: var(--col-typography-font-family-primary);"
                >
                  <col-breadcrumb>
                    <col-breadcrumb-item>Home</col-breadcrumb-item>
                    <col-breadcrumb-item>Reports</col-breadcrumb-item>
                    <col-breadcrumb-item
                      id="download-breadcrumb-item"
                      href=${args.href}
                      ?downloadable=${args.downloadable}
                      filename=${args.filename}
                    >
                      Export Data ⬇
                    </col-breadcrumb-item>
                  </col-breadcrumb>
                </div>
              </div>
              <div class="storybook-col">
                <h3>Event Details</h3>
                <pre
                  id="${outputId}"
                  style="margin-top: 1rem; padding: 1rem; background-color: #f0f0f0; border: 1px solid #ccc; border-radius: 4px; overflow-x: auto;"
                >
Click the "Export Data" link to trigger the download and see event details here</pre
                >
                <script>
                  const downloadLink = document.querySelector('#download-breadcrumb-item');
                  const output = document.getElementById('${outputId}');

                  if (downloadLink) {
                    downloadLink.addEventListener('click', e => {
                      e.preventDefault();
                      e.stopPropagation();

                      // Generate CSV content
                      const csvContent =
                        'Name,Email\\nJohn,john@example.com\\nJane,jane@example.com';
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);

                      // Create download link
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'data.csv';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);

                      // Create event detail
                      const detail = {
                        value: 'download',
                        label: 'Export Data',
                        index: 2,
                        href: '#',
                      };

                      // Update output if available
                      if (output && !${isInDocs}) {
                        output.textContent = JSON.stringify(detail, null, 2);
                      }

                      // Also dispatch the breadcrumb-click event for consistency
                      e.target?.dispatchEvent(
                        new CustomEvent('breadcrumb-click', {
                          detail,
                          bubbles: true,
                          composed: true,
                        })
                      );
                    });
                  }
                </script>
              </div>
            </div>
            <code-block
              code=${codeSnippet}
              language="javascript"
              title="Download Handler in JavaScript"
              code-theme="dark"
            ></code-block>
          `
        : html`
            <col-breadcrumb>
              <col-breadcrumb-item>Home</col-breadcrumb-item>
              <col-breadcrumb-item>Reports</col-breadcrumb-item>
              <col-breadcrumb-item
                id="download-breadcrumb-item"
                href="/"
                filename=${args.filename}
                ?downloadable=${args.downloadable}
              >
                Export Data ⬇
              </col-breadcrumb-item>
            </col-breadcrumb>
          `}
    `;
  },
};
