import { html, nothing, css, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { GRID_VALIDATION_ARRAYS, LAYOUT_VALIDATION_ARRAYS } from '@telesign/colibri';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { removeStyleTags } from '@/utils/formatters';

type ColGridProps = {
  cols: string;
  rows: string;
  gap: string;
  colGap: string;
  rowGap: string;
  inline: boolean;
  autoFit: string;
  areas: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  ariaLabel: string;
  ariaLabelledby: string;
};

type ColGridItemProps = {
  colSpan: string;
  rowSpan: string;
  area: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  ariaLabel: string;
};

const meta = {
  title: 'Atoms/Grid',
  component: 'col-grid',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: removeStyleTags,
      },
    },
  },
  argTypes: {
    cols: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Number of columns in the grid',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rows: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.rows],
      description: 'Number of rows in the grid',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    gap: {
      control: { type: 'select' },
      options: [...LAYOUT_VALIDATION_ARRAYS.gaps],
      description: 'Gap between grid items (both column and row)',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    colGap: {
      control: { type: 'select' },
      options: [...LAYOUT_VALIDATION_ARRAYS.gaps],
      description: 'Gap between columns only',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rowGap: {
      control: { type: 'select' },
      options: [...LAYOUT_VALIDATION_ARRAYS.gaps],
      description: 'Gap between rows only',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    inline: {
      control: { type: 'boolean' },
      description: 'Use inline-grid display instead of grid',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoFit: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.autofit],
      description: 'Auto-fit grid with minimum column size',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    areas: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.areas],
      description: 'Named grid areas template',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    sm: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for small screens and up (320px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    md: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for medium screens and up (769px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    lg: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for large screens and up (960px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    xl: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for extra large screens and up (1152px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    xxl: {
      control: { type: 'select' },
      options: [...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for extra extra large screens and up (1344px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Accessible label for the grid',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    ariaLabelledby: {
      control: { type: 'text' },
      description: 'ID of element that labels the grid',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies ColibriStoryMeta<ColGridProps>;

export default meta;

type Story = ColibriStory<ColGridProps>;

/**
 * Styles for the grid stories using Lit's css template literal.
 * These styles are scoped to the stories and won't affect other components.
 */
const styles = css`
  .grid-item {
    padding: 16px;
    border-radius: 4px;
    text-align: center;
    font-family: var(--col-typography-font-family-primary);
    font-weight: 500;
    color: var(--col-theme-white);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: var(--col-theme-primary-base);
    border: 1px solid var(--col-theme-primary-lighter);
  }

  .story-section {
    margin-bottom: 2rem;
  }

  .story-title {
    font-family: var(--col-typography-font-family-primary);
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--col-theme-text-primary);
  }

  .breakpoint-info,
  .gap-info,
  .autofit-info,
  .areas-info,
  .span-info,
  .row-info,
  .complex-info {
    font-family: var(--col-typography-font-family-primary);
    font-size: 0.875rem;
    color: var(--col-theme-text-secondary);
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: var(--col-theme-background-secondary);
    border-radius: 4px;
  }
`;

/**
 * Helper function to create a grid item with content and specific styling
 */
const createGridItem = (
  content: string,
  itemNumber: number,
  itemProps: Partial<ColGridItemProps> = {}
) => html`
  <col-grid-item
    col-span=${itemProps.colSpan || nothing}
    row-span=${itemProps.rowSpan || nothing}
    area=${itemProps.area || nothing}
    sm=${itemProps.sm || nothing}
    md=${itemProps.md || nothing}
    lg=${itemProps.lg || nothing}
    xl=${itemProps.xl || nothing}
    xxl=${itemProps.xxl || nothing}
    aria-label=${itemProps.ariaLabel || nothing}
  >
    <div class="grid-item grid-item-${itemNumber}">${unsafeHTML(content)}</div>
  </col-grid-item>
`;

/**
 * Reusable render function for grid component that accepts dynamic grid items
 */
const renderGrid = (args: ColGridProps, gridItems: TemplateResult[]) => html`
  <style>
    ${styles}
  </style>
  <col-grid
    cols=${args.cols || nothing}
    rows=${args.rows || nothing}
    gap=${args.gap || nothing}
    col-gap=${args.colGap || nothing}
    row-gap=${args.rowGap || nothing}
    ?inline=${args.inline}
    auto-fit=${args.autoFit || nothing}
    areas=${args.areas || nothing}
    sm=${args.sm || nothing}
    md=${args.md || nothing}
    lg=${args.lg || nothing}
    xl=${args.xl || nothing}
    xxl=${args.xxl || nothing}
    aria-label=${args.ariaLabel || nothing}
    aria-labelledby=${args.ariaLabelledby || nothing}
  >
    ${gridItems}
  </col-grid>
`;

/**
 * Default interactive playground story
 * Allows users to experiment with all grid properties using Storybook controls
 */
export const Default: Story = {
  args: {
    cols: '2',
  },
  render: args =>
    renderGrid(args, [
      createGridItem('Item 1', 1),
      createGridItem('Item 2', 2),
      createGridItem('Item 3', 3),
      createGridItem('Item 4', 4),
    ]),
};

/**
 * Basic Layout Examples
 * Shows common 2-column and 3-column layouts with different gap variations
 */
export const BasicLayouts: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">2-Column Layout (No Gap)</div>
      ${renderGrid({ cols: '2' } as ColGridProps, [
        createGridItem('Content A', 1),
        createGridItem('Content B', 2),
        createGridItem('Content C', 3),
        createGridItem('Content D', 4),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">2-Column Layout (Medium Gap)</div>
      ${renderGrid({ cols: '2', gap: 'm' } as ColGridProps, [
        createGridItem('Content A', 1),
        createGridItem('Content B', 2),
        createGridItem('Content C', 3),
        createGridItem('Content D', 4),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">3-Column Layout (Small Gap)</div>
      ${renderGrid({ cols: '3', gap: 's' } as ColGridProps, [
        createGridItem('Content A', 1),
        createGridItem('Content B', 2),
        createGridItem('Content C', 3),
        createGridItem('Content D', 4),
        createGridItem('Content E', 5),
        createGridItem('Content F', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">3-Column Layout (Large Gap)</div>
      ${renderGrid({ cols: '3', gap: 'l' } as ColGridProps, [
        createGridItem('Header', 1),
        createGridItem('Sidebar', 2),
        createGridItem('Main', 3),
        createGridItem('Footer A', 4),
        createGridItem('Footer B', 5),
        createGridItem('Footer C', 6),
      ])}
    </div>
  `,
};

/**
 * Responsive Grid Examples
 * Demonstrates responsive column behavior across different screen sizes
 * 1 column on mobile, 2 on small, 3 on medium, 4 on large screens
 */
export const ResponsiveGrid: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">Responsive Grid Layout</div>
      <div class="breakpoint-info">
        📱 Mobile (default): 1 column<br />
        📱 Small (320px+): 2 columns<br />
        💻 Medium (769px+): 3 columns<br />
        🖥️ Large (960px+): 4 columns
      </div>
      ${renderGrid({ cols: '1', sm: '2', md: '3', lg: '4', gap: 'm' } as ColGridProps, [
        createGridItem('Card 1', 1),
        createGridItem('Card 2', 2),
        createGridItem('Card 3', 3),
        createGridItem('Card 4', 4),
        createGridItem('Card 5', 5),
        createGridItem('Card 6', 6),
        createGridItem('Card 7', 7),
        createGridItem('Card 8', 8),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Responsive Product Grid</div>
      <div class="breakpoint-info">
        📱 Mobile: 1 column<br />
        📱 Small: 2 columns<br />
        💻 Medium/Large: 3 columns<br />
        🖥️ Extra Large: 4 columns
      </div>
      ${renderGrid({ cols: '1', sm: '2', md: '3', xl: '4', gap: 'l' } as ColGridProps, [
        createGridItem('Product A', 1),
        createGridItem('Product B', 2),
        createGridItem('Product C', 3),
        createGridItem('Product D', 4),
        createGridItem('Product E', 5),
        createGridItem('Product F', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Content Grid (Typography-Friendly)</div>
      <div class="breakpoint-info">
        📱 Mobile: 1 column<br />
        💻 Medium+: 2 columns
      </div>
      ${renderGrid({ cols: '1', md: '2', gap: 'xl' } as ColGridProps, [
        createGridItem('Article 1', 1),
        createGridItem('Article 2', 2),
        createGridItem('Article 3', 3),
        createGridItem('Article 4', 4),
      ])}
    </div>
  `,
};

/**
 * Gap Variations
 * Demonstrates different gap sizes and separate column/row gap controls
 */
export const GapVariations: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">No Gap</div>
      <div class="gap-info">gap: none</div>
      ${renderGrid({ cols: '3' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Small Gap</div>
      <div class="gap-info">gap: "s" (small)</div>
      ${renderGrid({ cols: '3', gap: 's' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Large Gap</div>
      <div class="gap-info">gap: "l" (large)</div>
      ${renderGrid({ cols: '3', gap: 'l' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Extra Large Gap</div>
      <div class="gap-info">gap: "2xl" (extra large)</div>
      ${renderGrid({ cols: '3', gap: '2xl' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Separate Column and Row Gaps</div>
      <div class="gap-info">col-gap: "l" (large horizontal), row-gap: "s" (small vertical)</div>
      ${renderGrid({ cols: '3', colGap: 'l', rowGap: 's' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Asymmetric Gaps</div>
      <div class="gap-info">
        col-gap: "xs" (extra small horizontal), row-gap: "xl" (extra large vertical)
      </div>
      ${renderGrid({ cols: '4', colGap: 'xs', rowGap: 'xl' } as ColGridProps, [
        createGridItem('Card A', 1),
        createGridItem('Card B', 2),
        createGridItem('Card C', 3),
        createGridItem('Card D', 4),
        createGridItem('Card E', 5),
        createGridItem('Card F', 6),
        createGridItem('Card G', 7),
        createGridItem('Card H', 8),
      ])}
    </div>
  `,
};

/**
 * Auto-Fit Grid Examples
 * Demonstrates responsive auto-fit behavior with different minimum column sizes
 * Resize the viewport to see columns automatically adjust
 */
export const AutoFitGrid: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">Auto-Fit Small (150px min)</div>
      <div class="autofit-info">
        auto-fit: "s" - Columns automatically fit with minimum width of ~150px<br />
        🔄 Resize your browser to see columns adjust automatically
      </div>
      ${renderGrid({ autoFit: 's', gap: 'm' } as ColGridProps, [
        createGridItem('Card 1', 1),
        createGridItem('Card 2', 2),
        createGridItem('Card 3', 3),
        createGridItem('Card 4', 4),
        createGridItem('Card 5', 5),
        createGridItem('Card 6', 6),
        createGridItem('Card 7', 7),
        createGridItem('Card 8', 8),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Auto-Fit Medium (200px min)</div>
      <div class="autofit-info">
        auto-fit: "m" - Columns automatically fit with minimum width of ~200px<br />
        🔄 Perfect for product cards or content blocks
      </div>
      ${renderGrid({ autoFit: 'm', gap: 'l' } as ColGridProps, [
        createGridItem('Product A', 1),
        createGridItem('Product B', 2),
        createGridItem('Product C', 3),
        createGridItem('Product D', 4),
        createGridItem('Product E', 5),
        createGridItem('Product F', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Auto-Fit Large (300px min)</div>
      <div class="autofit-info">
        auto-fit: "l" - Columns automatically fit with minimum width of ~300px<br />
        🔄 Great for larger content cards or feature blocks
      </div>
      ${renderGrid({ autoFit: 'l', gap: 'xl' } as ColGridProps, [
        createGridItem('Feature 1', 1),
        createGridItem('Feature 2', 2),
        createGridItem('Feature 3', 3),
        createGridItem('Feature 4', 4),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Auto-Fit Extra Small (100px min)</div>
      <div class="autofit-info">
        auto-fit: "xs" - Columns automatically fit with minimum width of ~100px<br />
        🔄 Useful for tags, badges, or small UI elements
      </div>
      ${renderGrid({ autoFit: 'xs', gap: 's' } as ColGridProps, [
        createGridItem('Tag 1', 1),
        createGridItem('Tag 2', 2),
        createGridItem('Tag 3', 3),
        createGridItem('Tag 4', 4),
        createGridItem('Tag 5', 5),
        createGridItem('Tag 6', 6),
        createGridItem('Tag 7', 7),
        createGridItem('Tag 8', 8),
        createGridItem('Tag 9', 9),
        createGridItem('Tag 10', 10),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Auto-Fit with Dense Content</div>
      <div class="autofit-info">
        auto-fit: "m" with more items - See how the grid adapts to content<br />
        🔄 Each column maintains minimum width while maximizing space usage
      </div>
      ${renderGrid({ autoFit: 'm', gap: 'm' } as ColGridProps, [
        createGridItem('Item 1', 1),
        createGridItem('Item 2', 2),
        createGridItem('Item 3', 3),
        createGridItem('Item 4', 4),
        createGridItem('Item 5', 5),
        createGridItem('Item 6', 6),
        createGridItem('Item 7', 7),
        createGridItem('Item 8', 8),
        createGridItem('Item 9', 9),
        createGridItem('Item 10', 10),
        createGridItem('Item 11', 11),
        createGridItem('Item 12', 12),
      ])}
    </div>
  `,
};

/**
 * Grid Areas Examples
 * Demonstrates named grid areas for semantic layout structure
 * Uses the areas prop to define layout templates and area prop on grid items
 */
export const GridAreas: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">Classic Website Layout</div>
      <div class="areas-info">
        areas: "header-sidebar-main"<br />
        🏗️ Creates: header (full width), sidebar (left), main content (right)
      </div>
      ${renderGrid({ areas: 'header-sidebar-main', gap: 'm' } as ColGridProps, [
        createGridItem('Header', 1, { area: 'header' }),
        createGridItem('Sidebar', 2, { area: 'sidebar' }),
        createGridItem('Main Content', 3, { area: 'main' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Simple Header-Main Layout</div>
      <div class="areas-info">
        areas: "header-main"<br />
        🏗️ Creates: header (top), main (bottom) - full width each
      </div>
      ${renderGrid({ areas: 'header-main', gap: 'l' } as ColGridProps, [
        createGridItem('Page Header', 1, { area: 'header' }),
        createGridItem('Main Content Area', 2, { area: 'main' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Dashboard Simple Layout</div>
      <div class="areas-info">
        areas: "dashboard-simple"<br />
        🏗️ Creates: nav (left), header + main (right column stack)
      </div>
      ${renderGrid({ areas: 'dashboard-simple', gap: 'm' } as ColGridProps, [
        createGridItem('Navigation', 1, { area: 'nav' }),
        createGridItem('App Header', 2, { area: 'header' }),
        createGridItem('Dashboard Content', 3, { area: 'main' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Article Layout</div>
      <div class="areas-info">
        areas: "article-layout"<br />
        🏗️ Creates: header (full width), content + sidebar (middle), footer (full width)
      </div>
      ${renderGrid({ areas: 'article-layout', gap: 's' } as ColGridProps, [
        createGridItem('Article Title', 1, { area: 'header' }),
        createGridItem('Article Content', 2, { area: 'content' }),
        createGridItem('Table of Contents', 3, { area: 'sidebar' }),
        createGridItem('Article Footer', 4, { area: 'footer' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Main-Sidebar Layout</div>
      <div class="areas-info">
        areas: "main-sidebar"<br />
        🏗️ Creates: simple two-column layout (main left, sidebar right)
      </div>
      ${renderGrid({ areas: 'main-sidebar', gap: 'xl' } as ColGridProps, [
        createGridItem('Main Content', 1, { area: 'main' }),
        createGridItem('Sidebar Widget', 2, { area: 'sidebar' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Form Layout</div>
      <div class="areas-info">
        areas: "form-layout"<br />
        🏗️ Creates: title (full width), form + sidebar (middle), actions (full width)
      </div>
      ${renderGrid({ areas: 'form-layout', gap: 'm' } as ColGridProps, [
        createGridItem('Create New User', 1, { area: 'title' }),
        createGridItem('Form Fields', 2, { area: 'form' }),
        createGridItem('Help & Tips', 3, { area: 'sidebar' }),
        createGridItem('Save / Cancel Buttons', 4, { area: 'actions' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Complex Dashboard Layout</div>
      <div class="areas-info">
        areas: "dashboard-complex"<br />
        🏗️ Creates: nav (left), header (top right), main + aside (center right), footer (bottom)
      </div>
      ${renderGrid({ areas: 'dashboard-complex', gap: 's' } as ColGridProps, [
        createGridItem('Navigation', 1, { area: 'nav' }),
        createGridItem('Dashboard Header', 2, { area: 'header' }),
        createGridItem('Main Dashboard', 3, { area: 'main' }),
        createGridItem('Widgets', 4, { area: 'aside' }),
        createGridItem('Status & Info', 5, { area: 'footer' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Full Application Layout</div>
      <div class="areas-info">
        areas: "app-layout"<br />
        🏗️ Creates: header (full width), sidebar + main + aside (middle), footer (full width)
      </div>
      ${renderGrid({ areas: 'app-layout', gap: 'm' } as ColGridProps, [
        createGridItem('App Header & Navigation', 1, { area: 'header' }),
        createGridItem('Side Menu', 2, { area: 'sidebar' }),
        createGridItem('Main Application', 3, { area: 'main' }),
        createGridItem('Activity Feed', 4, { area: 'aside' }),
        createGridItem('App Footer & Credits', 5, { area: 'footer' }),
      ])}
    </div>
  `,
};

/**
 * Column Spanning Examples
 * Demonstrates how grid items can span multiple columns using col-span prop
 * Shows both basic spanning and responsive spanning behavior
 */
export const ColumnSpanning: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">Basic Column Spanning</div>
      <div class="span-info">6-column grid with items spanning 2, 3, and 4 columns</div>
      ${renderGrid({ cols: '6', gap: 'm' } as ColGridProps, [
        createGridItem('Span 2', 1, { colSpan: '2' }),
        createGridItem('Single', 2),
        createGridItem('Span 3', 3, { colSpan: '3' }),
        createGridItem('Single', 4),
        createGridItem('Single', 5),
        createGridItem('Span 4', 6, { colSpan: '4' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Full Width Spanning</div>
      <div class="span-info">Using col-span="full" to span entire grid width (4 columns)</div>
      ${renderGrid({ cols: '4', gap: 'l' } as ColGridProps, [
        createGridItem('Full Width Header', 1, { colSpan: 'full' }),
        createGridItem('Quarter 1', 2),
        createGridItem('Quarter 2', 3),
        createGridItem('Quarter 3', 4),
        createGridItem('Quarter 4', 5),
        createGridItem('Full Width Footer', 6, { colSpan: 'full' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Mixed Spanning Patterns</div>
      <div class="span-info">
        Complex layout with different span combinations in a 5-column grid
      </div>
      ${renderGrid({ cols: '5', gap: 'm' } as ColGridProps, [
        createGridItem('Span 3', 1, { colSpan: '3' }),
        createGridItem('Span 2', 2, { colSpan: '2' }),
        createGridItem('Single', 3),
        createGridItem('Span 4', 4, { colSpan: '4' }),
        createGridItem('Span 2', 5, { colSpan: '2' }),
        createGridItem('Single', 6),
        createGridItem('Span 2', 7, { colSpan: '2' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Responsive Column Spanning</div>
      <div class="span-info">
        📱 Mobile: span 2 → 📱 Small: span 3 → 💻 Medium: span 4 → 🖥️ Large: span 6<br />
        🔄 Resize browser to see spanning change across breakpoints
      </div>
      ${renderGrid({ cols: '2', sm: '3', md: '4', lg: '6', gap: 'l' } as ColGridProps, [
        createGridItem('Responsive Full Width', 1, { colSpan: '2', sm: '3', md: '4', lg: '6' }),
        createGridItem('Item 1', 2),
        createGridItem('Item 2', 3),
        createGridItem('Item 3', 4),
        createGridItem('Item 4', 5),
        createGridItem('Item 5', 6),
        createGridItem('Item 6', 7),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Card Layout with Featured Item</div>
      <div class="span-info">
        Real-world example: Featured card spans 2 columns, regular cards span 1
      </div>
      ${renderGrid({ cols: '4', gap: 'l' } as ColGridProps, [
        createGridItem('Featured Article', 1, { colSpan: '2' }),
        createGridItem('Article 1', 2),
        createGridItem('Article 2', 3),
        createGridItem('Article 3', 4),
        createGridItem('Article 4', 5),
        createGridItem('Article 5', 6),
        createGridItem('Article 6', 7),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Progressive Spanning</div>
      <div class="span-info">
        Demonstration of items with different span values (1, 2, 3, 4, 5, 6)
      </div>
      ${renderGrid({ cols: '6', gap: 's' } as ColGridProps, [
        createGridItem('1 col', 1, { colSpan: '1' }),
        createGridItem('2 cols', 2, { colSpan: '2' }),
        createGridItem('3 cols', 3, { colSpan: '3' }),
        createGridItem('4 cols', 4, { colSpan: '4' }),
        createGridItem('2 cols', 5, { colSpan: '2' }),
        createGridItem('5 cols', 6, { colSpan: '5' }),
        createGridItem('1 col', 7, { colSpan: '1' }),
        createGridItem('6 cols', 8, { colSpan: '6' }),
      ])}
    </div>
  `,
};

/**
 * Row Spanning Examples
 * Demonstrates how grid items can span multiple rows using row-span prop
 * Shows vertical spanning and mixed row/column spanning combinations
 */
export const RowSpanning: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">Basic Row Spanning</div>
      <div class="row-info">3-column, 3-row grid with items spanning 2 and 3 rows</div>
      ${renderGrid({ cols: '3', rows: '3', gap: 'm' } as ColGridProps, [
        createGridItem('Span 2 Rows', 1, { rowSpan: '2' }),
        createGridItem('Normal', 2),
        createGridItem('Span 3 Rows', 3, { rowSpan: '3' }),
        createGridItem('Normal', 4),
        createGridItem('Normal', 5),
        createGridItem('Normal', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Sidebar Layout with Row Spanning</div>
      <div class="row-info">Sidebar spans full height (3 rows), content area has stacked items</div>
      ${renderGrid({ cols: '4', rows: '3', gap: 'l' } as ColGridProps, [
        createGridItem('Sidebar Menu', 1, { rowSpan: '3' }),
        createGridItem('Header', 2),
        createGridItem('Header', 3),
        createGridItem('Header', 4),
        createGridItem('Content 1', 5),
        createGridItem('Content 2', 6),
        createGridItem('Content 3', 7),
        createGridItem('Footer 1', 8),
        createGridItem('Footer 2', 9),
        createGridItem('Footer 3', 10),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Mixed Row and Column Spanning</div>
      <div class="row-info">Complex layout combining both row-span and col-span properties</div>
      ${renderGrid({ cols: '4', rows: '4', gap: 'm' } as ColGridProps, [
        createGridItem('Featured<br />2×2 Block', 1, { colSpan: '2', rowSpan: '2' }),
        createGridItem('Item 1', 2),
        createGridItem('Tall<br />Sidebar', 3, { rowSpan: '4' }),
        createGridItem('Item 2', 4),
        createGridItem('Item 3', 5),
        createGridItem('Item 4', 6),
        createGridItem('Item 5', 7),
        createGridItem('Wide Footer', 8, { colSpan: '2' }),
        createGridItem('Item 6', 9),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Dashboard Panel Layout</div>
      <div class="row-info">
        Real-world example: Chart spans 2 rows, metrics panels stack alongside
      </div>
      ${renderGrid({ cols: '3', rows: '3', gap: 'l' } as ColGridProps, [
        createGridItem('Main Chart<br />or Graph', 1, { colSpan: '2', rowSpan: '2' }),
        createGridItem('Metric 1', 2),
        createGridItem('Metric 2', 3),
        createGridItem('Summary 1', 4),
        createGridItem('Summary 2', 5),
        createGridItem('Summary 3', 6),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Magazine-Style Layout</div>
      <div class="row-info">Article layout with main story spanning multiple rows and columns</div>
      ${renderGrid({ cols: '4', rows: '4', gap: 's' } as ColGridProps, [
        createGridItem('Lead Story<br />(3×2)', 1, { colSpan: '3', rowSpan: '2' }),
        createGridItem('Ad<br />Space', 2, { rowSpan: '2' }),
        createGridItem('Story 1', 3),
        createGridItem('Story 2', 4),
        createGridItem('Story 3', 5),
        createGridItem('Story 4', 6),
        createGridItem('Story 5', 7),
        createGridItem('Story 6', 8),
        createGridItem('Story 7', 9),
        createGridItem('Story 8', 10),
      ])}
    </div>
  `,
};

/**
 * Complex Layout Examples
 * Real-world examples combining multiple grid features: responsive design,
 * column/row spanning, grid areas, gaps, and mixed content types
 */
export const ComplexLayout: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <div class="story-section">
      <div class="story-title">E-commerce Homepage Layout</div>
      <div class="complex-info">
        <strong>Complex responsive layout featuring:</strong><br />
        • Hero banner (full width on mobile, 2/3 width on desktop)<br />
        • Featured product sidebar (stacks below hero on mobile)<br />
        • Product grid (1→2→3→4 columns responsive)<br />
        • Newsletter signup (spans full width)<br />
        🔄 <em>Resize browser to see responsive behavior</em>
      </div>
      ${renderGrid({ cols: '1', sm: '2', md: '3', lg: '4', gap: 'l' } as ColGridProps, [
        createGridItem('Hero Banner<br />Featured Products & Offers', 1, {
          colSpan: '1',
          sm: '2',
          md: '2',
          lg: '3',
        }),
        createGridItem('Featured<br />Categories', 2, { colSpan: '1', md: '1', lg: '1' }),
        createGridItem('Product 1', 3, { colSpan: '1' }),
        createGridItem('Product 2', 4, { colSpan: '1' }),
        createGridItem('Product 3', 5, { colSpan: '1' }),
        createGridItem('Product 4', 6, { colSpan: '1' }),
        createGridItem('Product 5', 7, { colSpan: '1' }),
        createGridItem('Product 6', 8, { colSpan: '1' }),
        createGridItem('Newsletter Signup', 9, {
          colSpan: '1',
          sm: '2',
          md: '3',
          lg: '4',
        }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Application Dashboard</div>
      <div class="complex-info">
        <strong>Enterprise dashboard layout featuring:</strong><br />
        • Navigation sidebar (full height, responsive width)<br />
        • Header with user info (spans remaining width)<br />
        • Main chart area (large central focus)<br />
        • Metrics panels (responsive grid)<br />
        • Activity feed (sidebar on large screens)
      </div>
      ${renderGrid({ cols: '1', md: '4', lg: '6', rows: '4', gap: 'm' } as ColGridProps, [
        createGridItem('Navigation<br />Menu', 1, { colSpan: '1', md: '1', lg: '1', rowSpan: '4' }),
        createGridItem('Dashboard Header & User Info', 2, { colSpan: '1', md: '3', lg: '4' }),
        createGridItem('Activity<br />Feed', 3, { colSpan: '1', lg: '1', rowSpan: '3' }),
        createGridItem('Main Chart<br />Analytics', 4, {
          colSpan: '1',
          md: '2',
          lg: '2',
          rowSpan: '2',
        }),
        createGridItem('KPI 1<br />Revenue', 5, { colSpan: '1', md: '1', lg: '2' }),
        createGridItem('KPI 2<br />Users', 6, { colSpan: '1', md: '1', lg: '1' }),
        createGridItem('KPI 3<br />Orders', 7, { colSpan: '1', md: '1', lg: '1' }),
        createGridItem('Recent<br />Activity', 8, { colSpan: '1', md: '2', lg: '2' }),
        createGridItem('System<br />Status', 9, { colSpan: '1', md: '1', lg: '1' }),
        createGridItem('Notifications', 10, { colSpan: '1', md: '1', lg: '1' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">News Magazine Layout</div>
      <div class="complex-info">
        <strong>Editorial layout combining:</strong><br />
        • Lead story (prominent placement, spans multiple columns)<br />
        • Secondary stories (mixed column widths)<br />
        • Advertisement spaces (strategic placement)<br />
        • Category sections (responsive grouping)<br />
        📰 <em>Mimics traditional newspaper/magazine grid systems</em>
      </div>
      ${renderGrid({ cols: '2', md: '4', lg: '6', rows: '3', gap: 's' } as ColGridProps, [
        createGridItem('Breaking News<br />Lead Story with Image', 1, {
          colSpan: '2',
          md: '3',
          lg: '4',
          rowSpan: '2',
        }),
        createGridItem('Advertisement<br />Space', 2, { colSpan: '2', md: '1', lg: '2' }),
        createGridItem('Politics<br />Story', 3),
        createGridItem('Weather<br />Widget', 4, { colSpan: '1', md: '1', lg: '1' }),
        createGridItem('Sports<br />News', 5),
        createGridItem('Tech<br />Update', 6),
        createGridItem('Business<br />Report', 7),
        createGridItem('Culture<br />Review', 8),
        createGridItem('Opinion & Editorial Section', 9, { colSpan: '2', md: '2', lg: '3' }),
        createGridItem('Classified Ads & Subscriptions', 10, { colSpan: '2', md: '2', lg: '3' }),
      ])}
    </div>

    <div class="story-section">
      <div class="story-title">Social Media Feed Layout</div>
      <div class="complex-info">
        <strong>Dynamic content layout featuring:</strong><br />
        • Pinned post (full width, highlighted)<br />
        • Mixed post sizes (text, images, videos)<br />
        • Sponsored content (strategic placement)<br />
        • Responsive masonry-like arrangement<br />
        📱 <em>Adapts from single column to multi-column layout</em>
      </div>
      ${renderGrid({ cols: '1', sm: '2', lg: '3', gap: 'm' } as ColGridProps, [
        createGridItem('📌 Pinned Post: Important Announcement', 1, {
          colSpan: '1',
          sm: '2',
          lg: '3',
        }),
        createGridItem('📝 Text Post<br />Quick update...', 2),
        createGridItem('📷 Photo Post<br />Large image content', 3, {
          colSpan: '1',
          sm: '2',
          lg: '1',
        }),
        createGridItem('💬 Status<br />Feeling good!', 4),
        createGridItem('📺 Sponsored<br />Video Ad', 5, { colSpan: '1', sm: '2', lg: '1' }),
        createGridItem('🔗 Link Share<br />Interesting article', 6),
        createGridItem('📊 Poll<br />What do you think?', 7),
        createGridItem('🎥 Video Post<br />Live stream recap', 8, {
          colSpan: '1',
          sm: '1',
          lg: '2',
        }),
        createGridItem('📝 Long Post<br />Detailed story...', 9),
        createGridItem('🎵 Music<br />Now playing...', 10),
      ])}
    </div>
  `,
};
