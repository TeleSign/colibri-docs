import { html, css } from 'lit';
import { icons } from '@telesign/colibri-icons/icons-list';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { removeStyleTags } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  color: string;
  size: string | number;
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
    __sb: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '16px',
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
      },
    },
    color: {
      control: 'color',
      description: 'The color of the icon. Can be any valid CSS color value',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
      },
    },
    size: {
      control: 'text',
      description: 'The size of the icon. Can be specified in px, rem, or em',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '24px' },
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
  }
`;

/**
 * Default story showing a single icon with controls for name, color, and size.
 * Use the controls panel to experiment with different values.
 */
export const Default: Story = {
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
  render: () => html`
    <style>
      ${styles}
    </style>
    ${icons.map(
      (icon: string) => html`
        <div class="icon-item">
          <col-icon name=${icon} size="32px"></col-icon>
          <span class="icon-name">${icon}</span>
        </div>
      `
    )}
  `,
};
