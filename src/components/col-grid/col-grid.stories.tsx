import { html, nothing, css, TemplateResult } from 'lit';
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
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
      description: 'Number of columns in the grid',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rows: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.rows],
      description: 'Number of rows in the grid',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    gap: {
      control: { type: 'select' },
      options: ['', ...LAYOUT_VALIDATION_ARRAYS.gaps],
      description: 'Gap between grid items (both column and row)',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    colGap: {
      control: { type: 'select' },
      options: ['', ...LAYOUT_VALIDATION_ARRAYS.gaps],
      description: 'Gap between columns only',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    rowGap: {
      control: { type: 'select' },
      options: ['', ...LAYOUT_VALIDATION_ARRAYS.gaps],
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
      options: ['', ...GRID_VALIDATION_ARRAYS.autofit],
      description: 'Auto-fit grid with minimum column size',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    areas: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.areas],
      description: 'Named grid areas template',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    sm: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for small screens and up (320px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    md: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for medium screens and up (769px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    lg: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for large screens and up (960px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    xl: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
      description: 'Columns for extra large screens and up (1152px+)',
      table: {
        category: 'Responsive',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    xxl: {
      control: { type: 'select' },
      options: ['', ...GRID_VALIDATION_ARRAYS.columns],
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
    min-height: 60px;
    background: var(--col-theme-primary-base);
    border: 1px solid var(--col-theme-primary-lighter);
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
    <div class="grid-item grid-item-${itemNumber}">${content}</div>
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
