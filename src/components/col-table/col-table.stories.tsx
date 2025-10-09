import { html, nothing } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  maxHeight: string;
  minHeight: string;
  checkboxCellWidth: string;
  selectable: boolean;
  scroller: boolean;
  onAllRowsSelected: () => void;
  onRowSelected: () => void;
};

const meta = {
  title: 'Data Visualization/Table',
  component: 'col-table',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    maxHeight: {
      name: 'max-height',
      control: 'text',
      description:
        'Maximum height CSS value for the table content area. When exceeded, enables vertical scrolling.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    minHeight: {
      name: 'min-height',
      control: 'text',
      description: 'Minimum height CSS value for the table content area.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    checkboxCellWidth: {
      name: 'checkbox-cell-width',
      control: 'text',
      description:
        'Defines the column width for the checkbox in each row when selectable is enabled.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '48px' },
      },
    },
    selectable: {
      control: 'boolean',
      description:
        'Whether the table rows are allowed to be selected. Automatically adds checkboxes to rows.',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    scroller: {
      control: 'boolean',
      description: 'Whether the table has vertical scroll (requires max-height value to be set).',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onAllRowsSelected: {
      action: 'all-rows-selected',
      description:
        'Fired when the header checkbox is checked/unchecked, selecting or deselecting all rows.',
      table: {
        category: 'Events',
      },
    },
    onRowSelected: {
      action: 'row-selected',
      description: 'Fired when a table row is clicked/selected.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    maxHeight: '',
    minHeight: 'auto',
    checkboxCellWidth: '',
    selectable: false,
    scroller: false,
    onAllRowsSelected: fn(),
    onRowSelected: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderTable: Story['render'] = ({
  maxHeight,
  minHeight,
  checkboxCellWidth,
  selectable,
  scroller,
  onAllRowsSelected,
  onRowSelected,
}) => html`
  <col-table
    max-height=${maxHeight || nothing}
    min-height=${minHeight || nothing}
    checkbox-cell-width=${checkboxCellWidth || nothing}
    ?selectable=${selectable}
    ?scroller=${scroller}
    @all-rows-selected=${onAllRowsSelected}
    @row-selected=${onRowSelected}
  >
    <col-table-head>
      <col-table-cell header>Name</col-table-cell>
      <col-table-cell header>Email</col-table-cell>
      <col-table-cell header>Status</col-table-cell>
      <col-table-cell header>Role</col-table-cell>
      <col-table-cell header>Actions</col-table-cell>
    </col-table-head>
    <col-table-body>
      <col-table-row row-index="1">
        <col-table-cell>John Doe</col-table-cell>
        <col-table-cell>john.doe@example.com</col-table-cell>
        <col-table-cell>
          <col-badge variant="success">Active</col-badge>
        </col-table-cell>
        <col-table-cell>Administrator</col-table-cell>
        <col-table-cell>
          <col-button size="small">Edit</col-button>
        </col-table-cell>
      </col-table-row>
      <col-table-row row-index="2">
        <col-table-cell>Jane Smith</col-table-cell>
        <col-table-cell>jane.smith@example.com</col-table-cell>
        <col-table-cell>
          <col-badge variant="warning">Pending</col-badge>
        </col-table-cell>
        <col-table-cell>Editor</col-table-cell>
        <col-table-cell>
          <col-button size="small">Edit</col-button>
        </col-table-cell>
      </col-table-row>
      <col-table-row row-index="3">
        <col-table-cell>Mike Johnson</col-table-cell>
        <col-table-cell>mike.johnson@example.com</col-table-cell>
        <col-table-cell>
          <col-badge variant="success">Active</col-badge>
        </col-table-cell>
        <col-table-cell>Viewer</col-table-cell>
        <col-table-cell>
          <col-button size="small">Edit</col-button>
        </col-table-cell>
      </col-table-row>
    </col-table-body>
  </col-table>
`;

/**
 * Default story showing a basic table with headers and data rows
 */
export const Default: Story = {
  render: renderTable,
};

/**
 * Table with selectable rows showing checkboxes for row selection
 */
export const SelectableRows: Story = {
  args: {
    selectable: true,
  },
  render: renderTable,
};

/**
 * Table with scrollable content when max-height is exceeded
 */
export const ScrollableTable: Story = {
  args: {
    maxHeight: '300px',
    scroller: true,
  },
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      checkbox-cell-width=${args.checkboxCellWidth || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
      @all-rows-selected=${args.onAllRowsSelected}
      @row-selected=${args.onRowSelected}
    >
      <col-table-head>
        <col-table-cell header>Name</col-table-cell>
        <col-table-cell header>Email</col-table-cell>
        <col-table-cell header>Department</col-table-cell>
        <col-table-cell header>Status</col-table-cell>
        <col-table-cell header>Actions</col-table-cell>
      </col-table-head>
      <col-table-body>
        ${[...Array(10)].map(
          (_, i) => html`
            <col-table-row row-index="${i + 1}">
              <col-table-cell>Employee ${i + 1}</col-table-cell>
              <col-table-cell>employee${i + 1}@example.com</col-table-cell>
              <col-table-cell>Department ${(i % 3) + 1}</col-table-cell>
              <col-table-cell>
                <col-badge variant="${i % 2 === 0 ? 'success' : 'warning'}">
                  ${i % 2 === 0 ? 'Active' : 'Pending'}
                </col-badge>
              </col-table-cell>
              <col-table-cell>
                <col-button size="small">Edit</col-button>
              </col-table-cell>
            </col-table-row>
          `
        )}
      </col-table-body>
    </col-table>
  `,
};

/**
 * Table with custom checkbox cell width
 */
export const CustomCheckboxWidth: Story = {
  args: {
    selectable: true,
    checkboxCellWidth: '80px',
  },
  render: renderTable,
};

/**
 * Empty table showing the no data state
 */
export const EmptyTable: Story = {
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <col-table-head>
        <col-table-cell header>Name</col-table-cell>
        <col-table-cell header>Email</col-table-cell>
        <col-table-cell header>Status</col-table-cell>
      </col-table-head>
      <col-table-body></col-table-body>
    </col-table>
  `,
};

/**
 * Table with minimum height set
 */
export const WithMinHeight: Story = {
  args: {
    minHeight: '400px',
  },
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <col-table-head>
        <col-table-cell header>Product</col-table-cell>
        <col-table-cell header>Price</col-table-cell>
        <col-table-cell header>Stock</col-table-cell>
      </col-table-head>
      <col-table-body>
        <col-table-row row-index="1">
          <col-table-cell>Product A</col-table-cell>
          <col-table-cell>$99.99</col-table-cell>
          <col-table-cell>In Stock</col-table-cell>
        </col-table-row>
        <col-table-row row-index="2">
          <col-table-cell>Product B</col-table-cell>
          <col-table-cell>$149.99</col-table-cell>
          <col-table-cell>Out of Stock</col-table-cell>
        </col-table-row>
      </col-table-body>
    </col-table>
  `,
};

/**
 * Table with header and footer slots
 */
export const WithHeaderAndFooter: Story = {
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <div slot="table-header" style="padding: 16px; background: #f5f5f5;">
        <h3 style="margin: 0;">User Management</h3>
        <p style="margin: 8px 0 0 0; color: #666;">Manage system users and permissions</p>
      </div>

      <col-table-head>
        <col-table-cell header>Username</col-table-cell>
        <col-table-cell header>Email</col-table-cell>
        <col-table-cell header>Last Login</col-table-cell>
        <col-table-cell header>Status</col-table-cell>
      </col-table-head>
      <col-table-body>
        <col-table-row row-index="1">
          <col-table-cell>admin</col-table-cell>
          <col-table-cell>admin@example.com</col-table-cell>
          <col-table-cell>2024-01-15 09:30</col-table-cell>
          <col-table-cell>
            <col-badge variant="success">Online</col-badge>
          </col-table-cell>
        </col-table-row>
        <col-table-row row-index="2">
          <col-table-cell>user123</col-table-cell>
          <col-table-cell>user123@example.com</col-table-cell>
          <col-table-cell>2024-01-14 15:45</col-table-cell>
          <col-table-cell>
            <col-badge variant="default">Offline</col-badge>
          </col-table-cell>
        </col-table-row>
      </col-table-body>

      <div slot="table-footer" style="padding: 16px; background: #f5f5f5; text-align: right;">
        <col-button variant="outlined" size="small">Export</col-button>
        <col-button color="primary" size="small" style="margin-left: 8px;">Add User</col-button>
      </div>
    </col-table>
  `,
};

/**
 * Table with complex cell content including multiple components
 */
export const ComplexCellContent: Story = {
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <col-table-head>
        <col-table-cell header>User</col-table-cell>
        <col-table-cell header>Details</col-table-cell>
        <col-table-cell header>Permissions</col-table-cell>
        <col-table-cell header>Actions</col-table-cell>
      </col-table-head>
      <col-table-body>
        <col-table-row row-index="1">
          <col-table-cell>
            <div style="display: flex; align-items: center; gap: 8px;">
              <col-avatar name="John Doe" variant="icon"></col-avatar>
              <div>
                <div style="font-weight: 600;">John Doe</div>
                <div style="font-size: 12px; color: #666;">ID: 12345</div>
              </div>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div>
              <div>john.doe@example.com</div>
              <div style="font-size: 12px; color: #666;">Joined: Jan 2023</div>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div style="display: flex; gap: 4px;">
              <col-badge size="small">Read</col-badge>
              <col-badge size="small">Write</col-badge>
              <col-badge size="small">Admin</col-badge>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div style="display: flex; gap: 4px;">
              <col-button size="small" variant="outlined">View</col-button>
              <col-button size="small" color="primary">Edit</col-button>
              <col-button size="small" color="danger">Delete</col-button>
            </div>
          </col-table-cell>
        </col-table-row>
        <col-table-row row-index="2">
          <col-table-cell>
            <div style="display: flex; align-items: center; gap: 8px;">
              <col-avatar name="Jane Smith" variant="icon"></col-avatar>
              <div>
                <div style="font-weight: 600;">Jane Smith</div>
                <div style="font-size: 12px; color: #666;">ID: 12346</div>
              </div>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div>
              <div>jane.smith@example.com</div>
              <div style="font-size: 12px; color: #666;">Joined: Mar 2023</div>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div style="display: flex; gap: 4px;">
              <col-badge size="small">Read</col-badge>
              <col-badge size="small">Write</col-badge>
            </div>
          </col-table-cell>
          <col-table-cell>
            <div style="display: flex; gap: 4px;">
              <col-button size="small" variant="outlined">View</col-button>
              <col-button size="small" color="primary">Edit</col-button>
              <col-button size="small" color="danger">Delete</col-button>
            </div>
          </col-table-cell>
        </col-table-row>
      </col-table-body>
    </col-table>
  `,
};

/**
 * Responsive table with horizontal scroll for wide content
 */
export const ResponsiveTable: Story = {
  render: args => html`
    <div style="max-width: 600px; overflow-x: auto;">
      <col-table
        max-height=${args.maxHeight || nothing}
        min-height=${args.minHeight || nothing}
        ?selectable=${args.selectable}
        ?scroller=${args.scroller}
      >
        <col-table-head>
          <col-table-cell header style="min-width: 150px;">Transaction ID</col-table-cell>
          <col-table-cell header style="min-width: 120px;">Date</col-table-cell>
          <col-table-cell header style="min-width: 150px;">Customer</col-table-cell>
          <col-table-cell header style="min-width: 100px;">Amount</col-table-cell>
          <col-table-cell header style="min-width: 100px;">Status</col-table-cell>
          <col-table-cell header style="min-width: 200px;">Description</col-table-cell>
          <col-table-cell header style="min-width: 100px;">Actions</col-table-cell>
        </col-table-head>
        <col-table-body>
          <col-table-row row-index="1">
            <col-table-cell style="min-width: 150px;">TXN-2024-001</col-table-cell>
            <col-table-cell style="min-width: 120px;">2024-01-15</col-table-cell>
            <col-table-cell style="min-width: 150px;">Acme Corp</col-table-cell>
            <col-table-cell style="min-width: 100px;">$1,234.56</col-table-cell>
            <col-table-cell style="min-width: 100px;">
              <col-badge variant="success">Completed</col-badge>
            </col-table-cell>
            <col-table-cell style="min-width: 200px;">Monthly subscription payment</col-table-cell>
            <col-table-cell style="min-width: 100px;">
              <col-button size="small">View</col-button>
            </col-table-cell>
          </col-table-row>
          <col-table-row row-index="2">
            <col-table-cell style="min-width: 150px;">TXN-2024-002</col-table-cell>
            <col-table-cell style="min-width: 120px;">2024-01-16</col-table-cell>
            <col-table-cell style="min-width: 150px;">Tech Solutions</col-table-cell>
            <col-table-cell style="min-width: 100px;">$5,678.90</col-table-cell>
            <col-table-cell style="min-width: 100px;">
              <col-badge variant="warning">Pending</col-badge>
            </col-table-cell>
            <col-table-cell style="min-width: 200px;">Enterprise license renewal</col-table-cell>
            <col-table-cell style="min-width: 100px;">
              <col-button size="small">View</col-button>
            </col-table-cell>
          </col-table-row>
        </col-table-body>
      </col-table>
    </div>
  `,
};

/**
 * Data table with sorting indicators (visual only - sorting logic not implemented)
 */
export const SortableColumns: Story = {
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <col-table-head>
        <col-table-cell header>
          <div style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
            Name
            <col-icon name="chevron-down" size="12"></col-icon>
          </div>
        </col-table-cell>
        <col-table-cell header>
          <div style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
            Date
            <col-icon name="chevron-up" size="12"></col-icon>
          </div>
        </col-table-cell>
        <col-table-cell header>
          <div style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
            Amount
            <col-icon name="arrows-up-down" size="12"></col-icon>
          </div>
        </col-table-cell>
        <col-table-cell header>Status</col-table-cell>
      </col-table-head>
      <col-table-body>
        <col-table-row row-index="1">
          <col-table-cell>Alpha Project</col-table-cell>
          <col-table-cell>2024-01-10</col-table-cell>
          <col-table-cell>$12,500</col-table-cell>
          <col-table-cell>
            <col-badge variant="success">Completed</col-badge>
          </col-table-cell>
        </col-table-row>
        <col-table-row row-index="2">
          <col-table-cell>Beta Initiative</col-table-cell>
          <col-table-cell>2024-01-08</col-table-cell>
          <col-table-cell>$8,750</col-table-cell>
          <col-table-cell>
            <col-badge variant="warning">In Progress</col-badge>
          </col-table-cell>
        </col-table-row>
        <col-table-row row-index="3">
          <col-table-cell>Gamma Development</col-table-cell>
          <col-table-cell>2024-01-15</col-table-cell>
          <col-table-cell>$25,000</col-table-cell>
          <col-table-cell>
            <col-badge variant="default">Planned</col-badge>
          </col-table-cell>
        </col-table-row>
      </col-table-body>
    </col-table>
  `,
};

/**
 * Table with custom cell widths using CSS variables
 */
export const CustomColumnWidths: Story = {
  render: args => html`
    <col-table
      max-height=${args.maxHeight || nothing}
      min-height=${args.minHeight || nothing}
      ?selectable=${args.selectable}
      ?scroller=${args.scroller}
    >
      <col-table-head>
        <col-table-cell header style="--cell-flex: 0 0 80px;">ID</col-table-cell>
        <col-table-cell header style="--cell-flex: 2 1 0%;">Name</col-table-cell>
        <col-table-cell header style="--cell-flex: 3 1 0%;">Description</col-table-cell>
        <col-table-cell header style="--cell-flex: 1 1 0%;">Status</col-table-cell>
        <col-table-cell header style="--cell-flex: 0 0 120px;">Actions</col-table-cell>
      </col-table-head>
      <col-table-body>
        <col-table-row row-index="1">
          <col-table-cell style="--cell-flex: 0 0 80px;">001</col-table-cell>
          <col-table-cell style="--cell-flex: 2 1 0%;">Feature A</col-table-cell>
          <col-table-cell style="--cell-flex: 3 1 0%;">
            This is a longer description that takes more space
          </col-table-cell>
          <col-table-cell style="--cell-flex: 1 1 0%;">Active</col-table-cell>
          <col-table-cell style="--cell-flex: 0 0 120px;">
            <col-button size="small">Edit</col-button>
          </col-table-cell>
        </col-table-row>
        <col-table-row row-index="2">
          <col-table-cell style="--cell-flex: 0 0 80px;">002</col-table-cell>
          <col-table-cell style="--cell-flex: 2 1 0%;">Feature B</col-table-cell>
          <col-table-cell style="--cell-flex: 3 1 0%;">
            Another description with variable length content
          </col-table-cell>
          <col-table-cell style="--cell-flex: 1 1 0%;">Inactive</col-table-cell>
          <col-table-cell style="--cell-flex: 0 0 120px;">
            <col-button size="small">Edit</col-button>
          </col-table-cell>
        </col-table-row>
      </col-table-body>
    </col-table>
  `,
};

/**
 * Full-featured table example with all features combined
 */
export const FullFeaturedExample: Story = {
  args: {
    selectable: true,
    scroller: true,
    maxHeight: '500px',
  },
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const handleRowSelected = (e: CustomEvent) => {
      console.log('Row selected:', e.detail);
    };

    const handleAllRowsSelected = (e: CustomEvent) => {
      console.log('All rows selected:', e.detail);
    };

    return html`
      <style>
        col-toolbar::part(toolbar) {
          padding: 0;
        }
      </style>
      <col-table
        max-height="500px"
        min-height="300px"
        selectable
        scroller
        @row-selected=${handleRowSelected}
        @all-rows-selected=${handleAllRowsSelected}
      >
        <div slot="table-header">
          <col-toolbar gap="none">
            <div
              style="display: flex; justify-content: space-between; align-items: center; gap: 2px"
            >
              <col-icon name="file" size="20"></col-icon>
              <col-typography variant="subheading">
                Order Management
                <col-tooltip slot="icon" position="top">
                  <col-icon name="info-circle" size="14px"></col-icon>
                  <span slot="tooltip-content">Track and manage customer orders</span>
                </col-tooltip>
              </col-typography>
            </div>
            <col-spacer></col-spacer>
            <div
              style="display: flex; justify-content: space-between; align-items: center; gap: 2px"
            >
              <col-group orientation="horizontal" withoutgap>
                <col-search-bar
                  placeholder="Type to search..."
                  mode="static"
                  custom-width="100%"
                ></col-search-bar>
                <col-button size="small">
                  <col-icon name="filter" size="16px"></col-icon>
                </col-button>
                <col-button size="small">
                  <col-icon name="table" size="16px"></col-icon>
                </col-button>
              </col-group>
            </div>
          </col-toolbar>
        </div>

        <col-table-head>
          <col-table-cell header>Order #</col-table-cell>
          <col-table-cell header>Customer</col-table-cell>
          <col-table-cell header>Date</col-table-cell>
          <col-table-cell header>Items</col-table-cell>
          <col-table-cell header>Total</col-table-cell>
          <col-table-cell header>Status</col-table-cell>
          <col-table-cell header>Actions</col-table-cell>
        </col-table-head>
        <col-table-body>
          ${[...Array(10)].map(
            (_, i) => html`
              <col-table-row row-index="${i + 1}" ?selectable=${true}>
                <col-table-cell>ORD-${String(1001 + i).padStart(4, '0')}</col-table-cell>
                <col-table-cell>
                  <div>
                    <div>Customer ${i + 1}</div>
                    <div style="font-size: 12px; color: #666;">customer${i + 1}@example.com</div>
                  </div>
                </col-table-cell>
                <col-table-cell>Jan ${15 - i}, 2024</col-table-cell>
                <col-table-cell>${Math.floor(Math.random() * 10) + 1} items</col-table-cell>
                <col-table-cell> $${(Math.random() * 1000 + 100).toFixed(2)} </col-table-cell>
                <col-table-cell>
                  <col-badge
                    variant="${i % 3 === 0 ? 'success' : i % 3 === 1 ? 'warning' : 'default'}"
                  >
                    ${i % 3 === 0 ? 'Shipped' : i % 3 === 1 ? 'Processing' : 'Pending'}
                  </col-badge>
                </col-table-cell>
                <col-table-cell>
                  <col-dropdown>
                    <col-button slot="trigger" size="small" variant="outlined">
                      Actions
                      <col-icon name="chevron-down" size="12"></col-icon>
                    </col-button>
                    <col-list-menu>
                      <col-list-menu-item>View Details</col-list-menu-item>
                      <col-list-menu-item>Edit Order</col-list-menu-item>
                      <col-list-menu-item>Send Invoice</col-list-menu-item>
                      <col-list-menu-item>Cancel Order</col-list-menu-item>
                    </col-list-menu>
                  </col-dropdown>
                </col-table-cell>
              </col-table-row>
            `
          )}
        </col-table-body>

        <div slot="table-footer">
          <col-toolbar gap="none">
            <col-toolbar gap="small">
              <span class="text-xs">Items per page</span>
              <col-select id="items-per-page" value="10" custom-width="60px">
                <col-list-menu>
                  <col-list-menu-item value="5">5</col-list-menu-item>
                  <col-list-menu-item value="10">10</col-list-menu-item>
                  <col-list-menu-item value="20">20</col-list-menu-item>
                  <col-list-menu-item value="50">50</col-list-menu-item>
                  <col-list-menu-item value="100">100</col-list-menu-item>
                </col-list-menu>
              </col-select>
              <col-divider orientation="vertical" style="height: 32px"></col-divider>
              <span id="items-info" class="text-xs" role="status" aria-live="polite"></span>
            </col-toolbar>
            <col-paginator id="paginator" length="4" value="1" align="end"></col-paginator>
          </col-toolbar>
        </div>
      </col-table>
    `;
  },
};
