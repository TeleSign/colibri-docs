import { html, nothing, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { createStoryCollection } from '@/utils/helpers';

type ColToolbarProps = {
  align: 'left' | 'center' | 'right' | 'space-between' | 'space-around';
  border: 'none' | 'top' | 'bottom' | 'all';
  elevation: boolean;
  sticky: 'none' | 'top' | 'bottom';
  fixed: 'none' | 'top' | 'bottom';
  wrap: boolean;
  gap: 'small' | 'medium' | 'large';
};

const meta = {
  title: 'Layouts/Toolbar',
  component: 'col-toolbar',
  excludeStories: [
    'AlignmentTemplates',
    'BorderVariationTemplates',
    'PositioningTemplates',
    'GapVariationTemplates',
    'ComplexToolbarTemplates',
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
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'space-between', 'space-around'],
      description: 'Horizontal alignment of toolbar content. Use `align="center"` in HTML.',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    border: {
      control: { type: 'select' },
      options: ['none', 'top', 'bottom', 'all'],
      description: 'Border styling for the toolbar. Use `border="bottom"` in HTML.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    elevation: {
      control: { type: 'boolean' },
      description: 'Add shadow elevation to the toolbar. Use `elevation` in HTML.',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'elevation', neq: false },
    },
    sticky: {
      control: { type: 'select' },
      options: ['none', 'top', 'bottom'],
      description: 'Sticky positioning behavior. Use `sticky="top"` in HTML.',
      table: {
        category: 'Positioning',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    fixed: {
      control: { type: 'select' },
      options: ['none', 'top', 'bottom'],
      description: 'Fixed positioning behavior. Use `fixed="top"` in HTML.',
      table: {
        category: 'Positioning',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    wrap: {
      control: { type: 'boolean' },
      description: 'Allow toolbar items to wrap to new lines. Use `wrap` in HTML.',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'wrap', neq: false },
    },
    gap: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Spacing between toolbar items. Use `gap="medium"` in HTML.',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
  },
  args: {
    align: 'left',
    border: 'none',
    elevation: false,
    sticky: 'none',
    fixed: 'none',
  },
} satisfies ColibriStoryMeta<ColToolbarProps>;

export default meta;

type Story = ColibriStory<ColToolbarProps>;

/**
 * Styles for the toolbar stories using Lit's css template literal.
 * These styles are scoped to the stories and won't affect other components.
 */
const styles = css`
  .story-section {
    font-family: var(--col-typography-font-family-primary);
    margin-bottom: 2rem;
  }

  .search-input {
    padding: 6px 12px;
    border: 1px solid var(--col-colors-stroke-default-light);
    border-radius: 4px;
    font-family: var(--col-typography-font-family-primary);
    font-size: 0.875rem;
    background: var(--col-colors-ui-default);
    min-width: 200px;
  }

  .search-input:focus {
    outline: 2px solid var(--col-theme-primary-base);
    border-color: var(--col-theme-primary-base);
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--col-theme-success-base);
    margin-right: 6px;
  }

  /* Demo container styles */

  .demo-container {
    position: relative;
    min-height: 200px;
    background: var(--col-colors-ui-default);
    border-radius: 4px;
    overflow: hidden;
  }

  .demo-content {
    padding: 2rem;
    text-align: center;
    font-family: var(--col-typography-font-family-primary);
  }
`;

/**
 * Helper function to create common toolbar buttons and elements
 */
const createButton = (label: string, variant?: string, icon?: string) => {
  const iconHtml = icon ? `<col-icon name="${icon}"></col-icon>` : '';
  return `<col-button color="${variant ?? 'primary'}">${iconHtml}${label}</col-button>`;
};

const createDivider = () => `<col-spacer></col-spacer>`;

const createSearchInput = (placeholder = 'Search...') =>
  `<input type="text" class="search-input" placeholder="${placeholder}" />`;

const createUserAvatar = (initials: string) => `<col-avatar name="${initials}"></div>`;

const createBreadcrumb = (items: string[]) => {
  return `<col-breadcrumb>
    ${items
      .map((item, index) => {
        const isLast = index === items.length - 1;
        return `<col-breadcrumb-item ${isLast ? 'current' : ''}>${item}</col-breadcrumb-item>`;
      })
      .join('')}
  </col-breadcrumb>`;
};

const createStatusIndicator = (status: 'success' | 'warning' | 'error', text: string) =>
  `<div style="display: flex; align-items: center;">
    <span class="status-indicator ${status}"></span>
    ${text}
  </div>`;

/**
 * Reusable render function for toolbar component
 */
const renderToolbar = (args: ColToolbarProps, content: string[]) => html`
  <style>
    ${styles}
  </style>
  <col-toolbar
    align=${args.align || nothing}
    border=${args.border || nothing}
    ?elevation=${args.elevation || nothing}
    sticky=${args.sticky || nothing}
    fixed=${args.fixed || nothing}
    ?wrap=${args.wrap || nothing}
    gap=${args.gap || nothing}
  >
    ${content.map(item => unsafeHTML(item))}
  </col-toolbar>
`;

/**
 * Default interactive playground story
 */
export const Default: Story = {
  args: {
    align: 'left',
    border: 'none',
    elevation: false,
    sticky: 'none',
    fixed: 'none',
    wrap: false,
    gap: 'medium',
  },
  render: args =>
    renderToolbar(args, [
      createButton('New', 'primary', 'plus'),
      createButton('Edit', 'danger'),
      createButton('Delete', 'danger'),
      createDivider(),
      createSearchInput('Search items...'),
    ]),
};

/**
 * Alignment Templates
 */
export const AlignmentTemplates = {
  alignLeft: () =>
    renderToolbar({ align: 'left' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createButton('Action 3'),
    ]),

  alignCenter: () =>
    renderToolbar({ align: 'center' } as ColToolbarProps, [
      createButton('Cancel', 'danger'),
      createButton('Save', 'primary'),
    ]),

  alignRight: () =>
    renderToolbar({ align: 'right' } as ColToolbarProps, [
      createButton('Settings', 'success', 'settings'),
      createUserAvatar('John Doe'),
    ]),

  alignSpaceBetween: () =>
    renderToolbar({ align: 'space-between' } as ColToolbarProps, [
      createBreadcrumb(['Home', 'Products', 'Details']),
      `<div style="display: flex; gap: 8px;">
        ${createButton('Edit', 'danger')}
        ${createButton('Save', 'primary')}
      </div>`,
    ]),

  alignSpaceAround: () =>
    renderToolbar({ align: 'space-around' } as ColToolbarProps, [
      createButton('Dashboard', 'danger'),
      createButton('Analytics', 'danger'),
      createButton('Settings', 'primary'),
    ]),
};

/**
 * Alignment Examples
 */
export const Alignment: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection([
      { title: 'Left Aligned (Default)', content: AlignmentTemplates.alignLeft },
      { title: 'Center Aligned', content: AlignmentTemplates.alignCenter },
      { title: 'Right Aligned', content: AlignmentTemplates.alignRight },
      { title: 'Space Between', content: AlignmentTemplates.alignSpaceBetween },
      { title: 'Space Around', content: AlignmentTemplates.alignSpaceAround },
    ]),
};

// Hidden individual stories for MDX Canvas usage
export const AlignLeft: Story = {
  parameters: { controls: { disable: true } },
  render: AlignmentTemplates.alignLeft,
  tags: ['!dev'],
};

export const AlignCenter: Story = {
  parameters: { controls: { disable: true } },
  render: AlignmentTemplates.alignCenter,
  tags: ['!dev'],
};

export const AlignSpaceBetween: Story = {
  parameters: { controls: { disable: true } },
  render: AlignmentTemplates.alignSpaceBetween,
  tags: ['!dev'],
};

/**
 * Border Variation Templates
 */
export const BorderVariationTemplates = {
  noBorder: () =>
    renderToolbar({ border: 'none' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),

  topBorder: () =>
    renderToolbar({ border: 'top' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),

  bottomBorder: () =>
    renderToolbar({ border: 'bottom' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),

  allBorders: () =>
    renderToolbar({ border: 'all' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),

  elevatedToolbar: () =>
    renderToolbar({ elevation: true } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),

  bottomBorderWithElevation: () =>
    renderToolbar({ border: 'bottom', elevation: true } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createSearchInput(),
    ]),
};

/**
 * Border Variations
 */
export const BorderVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection(
      [
        {
          title: 'No Border (Default)',
          content: BorderVariationTemplates.noBorder,
          description: 'border: "none"',
        },
        {
          title: 'Top Border',
          content: BorderVariationTemplates.topBorder,
          description: 'border: "top" - Useful for bottom toolbars',
        },
        {
          title: 'Bottom Border',
          content: BorderVariationTemplates.bottomBorder,
          description: 'border: "bottom" - Common for header toolbars',
        },
        {
          title: 'All Borders',
          content: BorderVariationTemplates.allBorders,
          description: 'border: "all" - Standalone toolbar containers',
        },
        {
          title: 'Elevated Toolbar',
          content: BorderVariationTemplates.elevatedToolbar,
          description: 'elevation: true - Adds shadow depth',
        },
        {
          title: 'Border + Elevation',
          content: BorderVariationTemplates.bottomBorderWithElevation,
          description: 'Combination of border and elevation effects',
        },
      ],
      { descriptionClass: 'toolbar-info' }
    ),
};

// Hidden individual stories for MDX Canvas usage
export const NoBorder: Story = {
  parameters: { controls: { disable: true } },
  render: BorderVariationTemplates.noBorder,
  tags: ['!dev'],
};

export const BottomBorder: Story = {
  parameters: { controls: { disable: true } },
  render: BorderVariationTemplates.bottomBorder,
  tags: ['!dev'],
};

export const ElevatedToolbar: Story = {
  parameters: { controls: { disable: true } },
  render: BorderVariationTemplates.elevatedToolbar,
  tags: ['!dev'],
};

/**
 * Positioning Templates
 */
export const PositioningTemplates = {
  staticToolbar: () => html`
    <div class="demo-container">
      ${renderToolbar({ sticky: 'none', border: 'all' } as ColToolbarProps, [
        createButton('Static Toolbar'),
        createButton('Action 1'),
        createButton('Action 2'),
      ])}
      <div class="demo-content">
        <p>This is regular content below the toolbar.</p>
        <p>Scroll to see how the toolbar behaves...</p>
      </div>
    </div>
  `,

  stickyTop: () => html`
    <div class="demo-container" style="height: 400px; overflow-y: auto;">
      ${renderToolbar({ sticky: 'top', border: 'bottom', elevation: true } as ColToolbarProps, [
        createButton('Sticky Top'),
        createButton('Action 1'),
        createButton('Action 2'),
      ])}
      <div class="demo-content" style="height: 600px;">
        <p>Scroll down to see the toolbar stick to the top of its container.</p>
        <p>Content continues below...</p>
        <div style="margin-top: 200px;">More content here...</div>
        <div style="margin-top: 200px;">Even more content...</div>
      </div>
    </div>
  `,

  stickyBottom: () => html`
    <div class="demo-container" style="height: 400px; overflow-y: auto;">
      <div class="demo-content" style="height: 600px;">
        <p>Scroll down to see the toolbar stick to the bottom of its container.</p>
        <p>Content continues below...</p>
        <div style="margin-top: 200px;">More content here...</div>
        <div style="margin-top: 200px;">Even more content...</div>
      </div>
      ${renderToolbar({ sticky: 'bottom', border: 'top', elevation: true } as ColToolbarProps, [
        createButton('Sticky Bottom'),
        createButton('Action 1'),
        createButton('Action 2'),
      ])}
    </div>
  `,

  fixedTop: () => html`
    <div style="position: relative; min-height: 200px;">
      ${renderToolbar({ fixed: 'top', border: 'bottom', elevation: true } as ColToolbarProps, [
        createButton('Fixed Top'),
        createButton('Global Action'),
        createSearchInput('Global search...'),
      ])}
      <div class="demo-content" style="padding-top: 60px; padding: 60px 16px 16px;">
        <p>This toolbar is fixed to the top of the viewport.</p>
        <p>It will stay in place even when scrolling the page.</p>
      </div>
    </div>
  `,

  fixedBottom: () => html`
    <div style="position: relative; min-height: 200px;">
      <div class="demo-content" style="padding: 16px 16px 60px;">
        <p>This toolbar is fixed to the bottom of the viewport.</p>
        <p>It provides persistent access to actions.</p>
      </div>
      ${renderToolbar({ fixed: 'bottom', border: 'top', elevation: true } as ColToolbarProps, [
        createButton('Save Draft', 'outline'),
        createButton('Publish', 'primary'),
      ])}
    </div>
  `,
};

/**
 * Positioning Examples
 */
export const PositioningSticky: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection(
      [
        {
          title: 'Static Toolbar (Default)',
          content: PositioningTemplates.staticToolbar,
          description: 'sticky: "none" - Normal document flow positioning',
        },
        {
          title: 'Sticky Top',
          content: PositioningTemplates.stickyTop,
          description: 'sticky: "top" - Sticks to top when scrolling within container',
        },
        {
          title: 'Sticky Bottom',
          content: PositioningTemplates.stickyBottom,
          description: 'sticky: "bottom" - Sticks to bottom when scrolling within container',
        },
      ],
      { descriptionClass: 'toolbar-info' }
    ),
};

export const FixedTop: Story = {
  parameters: { controls: { disable: true } },
  render: PositioningTemplates.fixedTop,
};

export const FixedBottom: Story = {
  parameters: { controls: { disable: true } },
  render: PositioningTemplates.fixedBottom,
};

// Hidden individual stories for MDX Canvas usage
export const StickyTop: Story = {
  parameters: { controls: { disable: true } },
  render: PositioningTemplates.stickyTop,
  tags: ['!dev'],
};

/**
 * Gap Variation Templates
 */
export const GapVariationTemplates = {
  smallGap: () =>
    renderToolbar({ gap: 'small' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createButton('Action 3'),
      createButton('Action 4'),
    ]),

  mediumGap: () =>
    renderToolbar({ gap: 'medium' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createButton('Action 3'),
      createButton('Action 4'),
    ]),

  largeGap: () =>
    renderToolbar({ gap: 'large' } as ColToolbarProps, [
      createButton('Action 1'),
      createButton('Action 2'),
      createButton('Action 3'),
      createButton('Action 4'),
    ]),

  wrappingToolbar: () =>
    renderToolbar({ wrap: true, gap: 'medium' } as ColToolbarProps, [
      createButton('Long Action Name'),
      createButton('Another Action'),
      createButton('Third Action'),
      createButton('Fourth Action'),
      createButton('Fifth Action'),
      createButton('Sixth Action'),
      createSearchInput('Search for items...'),
      createButton('Settings', 'danger', 'settings'),
    ]),

  noWrapOverflow: () =>
    renderToolbar({ wrap: false, gap: 'medium' } as ColToolbarProps, [
      createButton('Long Action Name'),
      createButton('Another Action'),
      createButton('Third Action'),
      createButton('Fourth Action'),
      createButton('Fifth Action'),
      createButton('Sixth Action'),
      createSearchInput('Search for items...'),
      createButton('Settings', 'primary', 'settings'),
    ]),
};

/**
 * Gap and Wrapping Variations
 */
export const GapAndWrapping: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection(
      [
        {
          title: 'Small Gap',
          content: GapVariationTemplates.smallGap,
          description: 'gap: "small" - Compact spacing between items',
        },
        {
          title: 'Medium Gap (Default)',
          content: GapVariationTemplates.mediumGap,
          description: 'gap: "medium" - Standard spacing between items',
        },
        {
          title: 'Large Gap',
          content: GapVariationTemplates.largeGap,
          description: 'gap: "large" - Generous spacing between items',
        },
        {
          title: 'Wrapping Toolbar',
          content: GapVariationTemplates.wrappingToolbar,
          description: 'wrap: true - Items wrap to new lines when space is limited',
        },
        {
          title: 'No Wrap (Overflow)',
          content: GapVariationTemplates.noWrapOverflow,
          description: 'wrap: false - Items stay on one line, may overflow container',
        },
      ],
      { descriptionClass: 'toolbar-info' }
    ),
};

// Hidden individual stories for MDX Canvas usage
export const SmallGap: Story = {
  parameters: { controls: { disable: true } },
  render: GapVariationTemplates.smallGap,
  tags: ['!dev'],
};

export const MediumGap: Story = {
  parameters: { controls: { disable: true } },
  render: GapVariationTemplates.mediumGap,
  tags: ['!dev'],
};

export const WrappingToolbar: Story = {
  parameters: { controls: { disable: true } },
  render: GapVariationTemplates.wrappingToolbar,
  tags: ['!dev'],
};

/**
 * Complex Toolbar Templates
 */
export const ComplexToolbarTemplates = {
  applicationHeader: () =>
    renderToolbar(
      {
        align: 'space-between',
        border: 'bottom',
        elevation: true,
        sticky: 'top',
      } as ColToolbarProps,
      [
        `<div style="display: flex; align-items: center; gap: 16px;">
        <strong style="font-size: 1.125rem;">MyApp</strong>
        ${createBreadcrumb(['Dashboard', 'Analytics'])}
      </div>`,
        `<div style="display: flex; align-items: center; gap: 12px;">
        ${createSearchInput('Search...')}
        ${createButton('', 'danger', 'alert-warning-high')}
        ${createUserAvatar('John Doe')}
      </div>`,
      ]
    ),

  dataTableToolbar: () =>
    renderToolbar({ align: 'space-between', border: 'bottom', gap: 'medium' } as ColToolbarProps, [
      `<div style="display: flex; align-items: center; gap: 12px;">
        ${createButton('New Item', 'primary', 'plus')}
        ${createButton('Import', 'primary', 'archived')}
        ${createButton('Export', 'primary', 'archived')}
      </div>`,
      `<div style="display: flex; align-items: center; gap: 12px;">
        ${createSearchInput('Filter items...')}
        ${createButton('', 'primary', 'settings')}
      </div>`,
    ]),

  dashboardToolbar: () =>
    renderToolbar(
      {
        align: 'space-between',
        border: 'bottom',
        elevation: true,
      } as ColToolbarProps,
      [
        `<div style="display: flex; align-items: center; gap: 16px;">
        <h2 style="margin: 0; font-size: 1.25rem;">Dashboard</h2>
        ${createStatusIndicator('success', 'System Healthy')}
      </div>`,
        `<div style="display: flex; align-items: center; gap: 12px;">
        <col-dropdown>
          <col-button slot="trigger">
            Toggle
            <col-icon name="chevron-down" size="16px"></col-icon>
          </col-button>
          <col-list-menu>
            <col-list-item-menu>Item 1</col-list-item-menu>
            <col-list-item-menu>Item 2</col-list-item-menu>
            <col-list-item-menu>Item 3</col-list-item-menu>
          </col-list-menu>
        </col-dropdown>
        ${createButton('Export Report', 'primary', 'database')}
        ${createButton('Refresh', 'primary', 'arrow-refresh-clockwise')}
      </div>`,
      ]
    ),

  mobileResponsiveToolbar: () =>
    renderToolbar(
      {
        align: 'space-between',
        wrap: true,
        gap: 'small',
        border: 'bottom',
      } as ColToolbarProps,
      [
        `<div style="display: flex; align-items: center; gap: 8px;">
        ${createButton('☰', 'outline')}
        <strong>Mobile App</strong>
      </div>`,
        `<div style="display: flex; align-items: center; gap: 8px;">
        ${createButton('', 'primary', 'search')}
        ${createButton('', 'primary', 'three-dots-vertical')}
      </div>`,
      ]
    ),

  richContentToolbar: () =>
    renderToolbar({ align: 'left', wrap: true, gap: 'small', border: 'all' } as ColToolbarProps, [
      `<div style="display: flex; align-items: center; gap: 4px;">
        ${createButton('B', 'outline')}
        ${createButton('I', 'outline')}
        ${createButton('U', 'outline')}
        ${createDivider()}
      </div>`,
      `<div style="display: flex; align-items: center; gap: 4px;">
        ${createButton('H1', 'outline')}
        ${createButton('H2', 'outline')}
        ${createDivider()}
      </div>`,
      `<div style="display: flex; align-items: center; gap: 4px;">
        ${createButton('', 'default', 'masivlinks')}
        ${createButton('', 'default', 'camera')}
        ${createButton('', 'default', 'document-blank-format')}
      </div>`,
    ]),

  statusBarToolbar: () =>
    renderToolbar({ align: 'space-between', border: 'top', gap: 'small' } as ColToolbarProps, [
      `<div style="display: flex; align-items: center; gap: 12px;">
        ${createStatusIndicator('success', 'Connected')}
        <span style="font-size: 0.875rem;">Line 42, Column 15</span>
      </div>`,
      `<div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 0.875rem;">UTF-8</span>
        <span style="font-size: 0.875rem;">JavaScript</span>
        ${createButton('', 'default', 'notifications')}
      </div>`,
    ]),
};

/**
 * Complex Toolbar Examples
 */
export const ComplexToolbars: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection(
      [
        {
          title: 'Application Header',
          content: ComplexToolbarTemplates.applicationHeader,
          description: 'Complete app header with branding, navigation, search, and user actions',
        },
        {
          title: 'Data Table Toolbar',
          content: ComplexToolbarTemplates.dataTableToolbar,
          description: 'CRUD actions on the left, filtering and settings on the right',
        },
        {
          title: 'Dashboard Toolbar',
          content: ComplexToolbarTemplates.dashboardToolbar,
          description: 'Title with status, time range selector, and export actions',
        },
        {
          title: 'Mobile Responsive Toolbar',
          content: ComplexToolbarTemplates.mobileResponsiveToolbar,
          description: 'Compact toolbar optimized for mobile with hamburger menu',
        },
        {
          title: 'Rich Content Editor Toolbar',
          content: ComplexToolbarTemplates.richContentToolbar,
          description: 'Text formatting tools grouped logically with dividers',
        },
        {
          title: 'Status Bar Toolbar',
          content: ComplexToolbarTemplates.statusBarToolbar,
          description: 'Bottom status bar with connection status and editor info',
        },
      ],
      { descriptionClass: 'toolbar-info' }
    ),
};

// Hidden individual stories for MDX Canvas usage
export const ApplicationHeader: Story = {
  parameters: { controls: { disable: true } },
  render: ComplexToolbarTemplates.applicationHeader,
  tags: ['!dev'],
};

export const DataTableToolbar: Story = {
  parameters: { controls: { disable: true } },
  render: ComplexToolbarTemplates.dataTableToolbar,
  tags: ['!dev'],
};

export const RichContentToolbar: Story = {
  parameters: { controls: { disable: true } },
  render: ComplexToolbarTemplates.richContentToolbar,
  tags: ['!dev'],
};
