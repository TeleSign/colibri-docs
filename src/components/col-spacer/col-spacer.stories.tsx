import { html, css } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { createStoryCollection } from '@/utils/helpers';

const meta = {
  title: 'Helpers/Spacer',
  component: 'col-spacer',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {},
} satisfies ColibriStoryMeta<{}>;

export default meta;

type Story = ColibriStory<{}>;

/**
 * Styles for the spacer stories
 */
const styles = css`
  .demo-container {
    border: 1px solid var(--col-colors-stroke-default-light);
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1rem;
    background: var(--col-colors-ui-default);
  }

  .flex-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }

  .demo-item {
    padding: 0.5rem 1rem;
    background: var(--col-theme-primary-base);
    color: white;
    border-radius: 4px;
    font-family: var(--col-typography-font-family-primary);
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .spacer-highlight {
    background: rgba(255, 193, 7, 0.2);
    border: 1px dashed #ffc107;
    min-height: 2px;
    border-radius: 2px;
  }

  .story-title {
    font-family: var(--col-typography-font-family-primary);
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    font-family: var(--col-typography-font-family-primary);
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

/**
 * Default story showing basic spacer usage
 */
export const Default: Story = {
  render: () => html`
    <style>
      ${styles}
    </style>
    <div class="demo-container">
      <div class="flex-container">
        <div class="demo-item">Left Item</div>
        <col-spacer class="spacer-highlight"></col-spacer>
        <div class="demo-item">Right Item</div>
      </div>
    </div>
  `,
};

/**
 * Toolbar Layout Examples
 */
export const ToolbarLayouts: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <style>
      ${styles}
    </style>

    <div class="demo-container">
      <div class="story-title">Basic Toolbar Layout</div>
      <div class="description">Spacer pushes the last item to the right</div>
      <div class="flex-container">
        <div class="demo-item">Logo</div>
        <div class="demo-item">Menu</div>
        <col-spacer></col-spacer>
        <div class="demo-item">User Profile</div>
      </div>
    </div>

    <div class="demo-container">
      <div class="story-title">Multiple Spacers</div>
      <div class="description">Multiple spacers distribute space evenly</div>
      <div class="flex-container">
        <div class="demo-item">Left</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Center</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Right</div>
      </div>
    </div>

    <div class="demo-container">
      <div class="story-title">Form Actions</div>
      <div class="description">Spacer separates primary and secondary actions</div>
      <div class="flex-container">
        <div class="demo-item">Help</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Cancel</div>
        <div class="demo-item">Save</div>
      </div>
    </div>
  `,
};

/**
 * Navigation Examples
 */
export const NavigationExamples: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => html`
    <style>
      ${styles}
    </style>

    <div class="demo-container">
      <div class="story-title">App Header</div>
      <div class="description">Brand on left, navigation in center, actions on right</div>
      <div class="flex-container">
        <div class="demo-item">Brand</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Home</div>
        <div class="demo-item">About</div>
        <div class="demo-item">Contact</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Login</div>
      </div>
    </div>

    <div class="demo-container">
      <div class="story-title">Breadcrumb Navigation</div>
      <div class="description">Breadcrumbs on left, actions on right</div>
      <div class="flex-container">
        <col-breadcrumb>
          <col-breadcrumb-item>Home</col-breadcrumb-item>
          <col-breadcrumb-item current>Event</col-breadcrumb-item>
        </col-breadcrumb>
        <col-spacer></col-spacer>
        <div class="demo-item">Edit</div>
        <div class="demo-item">Share</div>
      </div>
    </div>
  `,
};

/**
 * All Examples Combined
 */
export const AllExamples: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () =>
    createStoryCollection([
      { title: 'Basic Usage', content: () => Default.render!({}) },
      { title: 'Toolbar Layouts', content: () => ToolbarLayouts.render!({}) },
      { title: 'Navigation Examples', content: () => NavigationExamples.render!({}) },
    ]),
};

// Hidden individual stories for MDX Canvas usage
export const BasicUsage: Story = {
  parameters: { controls: { disable: true } },
  render: () => Default.render!({}),
  tags: ['!dev'],
};

export const ToolbarLayout: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <style>
      ${styles}
    </style>
    <div class="demo-container">
      <div class="flex-container">
        <div class="demo-item">Logo</div>
        <div class="demo-item">Menu</div>
        <col-spacer></col-spacer>
        <div class="demo-item">User Profile</div>
      </div>
    </div>
  `,
  tags: ['!dev'],
};

export const MultipleSpacers: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <style>
      ${styles}
    </style>
    <div class="demo-container">
      <div class="flex-container">
        <div class="demo-item">Left</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Center</div>
        <col-spacer></col-spacer>
        <div class="demo-item">Right</div>
      </div>
    </div>
  `,
  tags: ['!dev'],
};
