import { html, css } from 'lit';
import { icons } from '@telesign/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { removeStyleTags } from '@/utils/formatters';
import { disableControls } from '@/utils/helpers';

type StoryArgs = {
  name: string;
  color: string;
  size: string | number;
  search?: string;
};

const meta = {
  title: 'Atoms/Icons',
  component: 'col-icon',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: removeStyleTags,
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: icons,
      description: 'The name of the icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'lock' },
        category: 'Core',
      },
    },
    color: {
      control: 'color',
      description: 'The color of the icon. Can be any valid CSS color value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
        category: 'Core',
      },
    },
    size: {
      control: 'text',
      description: 'The size of the icon. Can be specified in `px`, `rem`, or `em`',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '24px' },
        category: 'Core',
      },
    },
    search: {
      control: 'text',
      description: 'Search icons by name',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Search/Filter',
      },
    },
  },
  args: {
    name: 'home',
    color: 'currentColor',
    size: '24px',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Styles for the icon stories using Lit's css template literal.
 * These styles are scoped to the stories and won't affect other components.
 */
const styles = css`
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .icon-name {
    font-size: 12px;
    text-align: center;
    font-family: var(--col-typography-font-family-primary);
  }

  .results-summary {
    margin-bottom: 20px;
    padding: 16px 20px;
    background: #f8f9fa;
    border-radius: 8px;
    color: #6c757d;
    font-size: 13px;
    border-left: 4px solid #007bff;
    font-family: var(--col-typography-font-family-primary);
  }
  .search-instructions {
    margin-bottom: 12px;
    padding: 8px 12px;
    background: #e3f2fd;
    border-radius: 6px;
    color: #1565c0;
    font-size: 13px;
    border: 1px solid #bbdefb;
  }
  .search-instructions strong {
    color: #0d47a1;
    font-weight: 600;
  }
  .results-count {
    font-weight: 500;
    color: #495057;
  }
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
  }
`;

/**
 * Default story showing a single icon with controls for name, color, and size.
 * Use the controls panel to experiment with different values.
 */
export const Default: Story = {
  argTypes: disableControls(meta.argTypes, 'search'),
  render: args => html`
    <style>
      ${styles}
    </style>
    <col-icon name=${args.name} color=${args.color} size=${args.size}></col-icon>
  `,
};

/**
 * This story showcases all available icons in the library.
 * Icons are displayed in a responsive grid layout with names underneath.
 * The layout is controlled by the __sb parameter in the default export.
 */
export const AllIcons: Story = {
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
  argTypes: disableControls(meta.argTypes, 'name'),
  render: args => {
    const searchTerm = args.search?.toLowerCase() || '';
    const filteredIcons = icons.filter(icon => icon.toLowerCase().includes(searchTerm));

    return html`
      <style>
        ${styles}
      </style>
      <div class="results-summary">
        <div class="search-instructions">
          <strong>💡 Tip:</strong> Use the <strong>search</strong> control in the
          <strong>search/filter</strong> section of the controls panel to find specific icons
        </div>
        <div class="results-count">
          Showing <strong>${filteredIcons.length}</strong> of <strong>${icons.length}</strong> icons
          ${args.search ? ` matching "${args.search}"` : ''}
        </div>
      </div>
      <div class="icons-grid">
        ${filteredIcons.map(
          (icon: string) => html`
            <div class="icon-item">
              <col-icon name=${icon} size=${args.size} color=${args.color}></col-icon>
              <span class="icon-name">${icon}</span>
            </div>
          `
        )}
      </div>
    `;
  },
};
