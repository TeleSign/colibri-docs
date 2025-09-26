import { css, html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  description: string;
  customDescription: boolean;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

const meta = {
  title: 'Layouts/Modal Footer',
  component: 'col-modal-footer',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    description: {
      control: 'text',
      description: 'The footer description text',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    customDescription: {
      control: 'boolean',
      description: 'Enable custom description mode for full control over left content',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    primaryButtonText: {
      control: 'text',
      description: 'Primary action button text. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
    },
    secondaryButtonText: {
      control: 'text',
      description: 'Secondary action button text. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
    },
    onPrimaryClick: {
      action: 'primary-click',
      description: 'Primary button click handler',
      table: {
        category: 'Events',
      },
    },
    onSecondaryClick: {
      action: 'secondary-click',
      description: 'Secondary button click handler',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    description: '',
    customDescription: false,
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
    onPrimaryClick: fn(),
    onSecondaryClick: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const styles = css`
    .example-main {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
  .example-content {
    padding: 20px;
    background: #f5f5f5;
  }
  .example-description {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const renderModalFooter: Story['render'] = ({
  description,
  customDescription,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
}) => html`
  <style>
    ${styles}
  </style>
  <div class="example-main">
    <div class="example-content">
      <p>Modal content goes here...</p>
    </div>
    <col-modal-footer
      description=${description}
      ?custom-description=${customDescription}
    >
      <col-button slot="actions" color="secondary" @click=${onSecondaryClick}>
        ${secondaryButtonText}
      </col-button>
      <col-button slot="actions" color="primary" @click=${onPrimaryClick}>
        ${primaryButtonText}
      </col-button>
    </col-modal-footer>
  </div>
`;

/**
 * Default story showing a basic modal footer with action buttons
 */
export const Default: Story = {
  args: {
    description: '',
    primaryButtonText: 'Save',
    secondaryButtonText: 'Cancel',
  },
  render: renderModalFooter,
};

/**
 * Modal footer with description text
 */
export const WithDescription: Story = {
  args: {
    description: '2 items selected',
    primaryButtonText: 'Delete',
    secondaryButtonText: 'Cancel',
  },
  render: renderModalFooter,
};

/**
 * Modal footer with single action button
 */
export const SingleAction: Story = {
  args: {
    description: '',
  },
  render: ({ description, customDescription, primaryButtonText, onPrimaryClick }) => html`
    <style>
      ${styles}
    </style>
    <div class="example-main">
      <div class="example-content">
        <p>Modal content goes here...</p>
      </div>
      <col-modal-footer
        description=${description}
        ?custom-description=${customDescription}
      >
        <col-button slot="actions" color="primary" @click=${onPrimaryClick}>
          ${primaryButtonText || 'Close'}
        </col-button>
      </col-modal-footer>
    </div>
  `,
};

/**
 * Modal footer with custom description content
 */
export const CustomDescription: Story = {
  args: {
    customDescription: true,
  },
  render: ({ customDescription, onPrimaryClick, onSecondaryClick }) => html`
    <style>
      ${styles}
    </style>
    <div class="example-main">
      <div class="example-content">
        <p>Modal content goes here...</p>
      </div>
      <col-modal-footer ?custom-description=${customDescription}>
        <div class="example-description">
          <col-icon name="info-circle" style="color: #2196F3;"></col-icon>
          <span>
            Your changes will be saved automatically
          </span>
        </div>
        <col-button slot="actions" color="secondary" @click=${onSecondaryClick}>
          Cancel
        </col-button>
        <col-button slot="actions" color="primary" @click=${onPrimaryClick}>
          Continue
        </col-button>
      </col-modal-footer>
    </div>
  `,
};

/**
 * Modal footer without actions (description only)
 */
export const DescriptionOnly: Story = {
  args: {
    description: 'Processing... Please wait',
  },
  render: ({ description, customDescription }) => html`
    <style>
      ${styles}
    </style>
    <div class="example-main">
      <div class="example-content">
        <p>Modal content goes here...</p>
      </div>
      <col-modal-footer
        description=${description}
        ?custom-description=${customDescription}
      >
      </col-modal-footer>
    </div>
  `,
};
