import { css, html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  title: string;
  customheader: boolean;
  noclosebutton: boolean;
  iconName: string;
  badgeText: string;
  badgeVariant: string;
  actionText: string;
  onClose?: () => void;
};

const meta = {
  title: 'Layouts/Modal Header',
  component: 'col-modal-header',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The header title text',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    customheader: {
      control: 'boolean',
      description: 'Enable custom header mode for full control over layout',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noclosebutton: {
      control: 'boolean',
      description: 'Hide the default close button',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon name for the icon slot. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
      if: { arg: 'iconName', neq: '' },
    },
    badgeText: {
      control: 'text',
      description:
        'Badge text for the badge slot. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
      if: { arg: 'badgeText', neq: '' },
    },
    badgeVariant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge variant. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
      if: { arg: 'badgeText', neq: '' },
    },
    actionText: {
      control: 'text',
      description: 'Action button text. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
      if: { arg: 'actionText', neq: '' },
    },
    onClose: {
      action: 'on-close',
      description: 'Event fired when the close button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    title: 'Modal Title',
    customheader: false,
    noclosebutton: false,
    iconName: '',
    badgeText: '',
    badgeVariant: 'default',
    actionText: '',
    onClose: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const styles = css`
  .example-container {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
  }
  .example-content {
    padding: 20px;
    background: #f5f5f5;
  }
`;

const renderModalHeader: Story['render'] = ({
  title,
  customheader,
  noclosebutton,
  iconName,
  badgeText,
  badgeVariant,
  actionText,
  onClose,
}) => html`
  <style>
    ${styles}
  </style>
  <div class="example-container">
    <col-modal-header
      title=${title}
      ?customheader=${customheader}
      ?noclosebutton=${noclosebutton}
      @on-close=${onClose}
    >
      ${iconName && html`<col-icon slot="icon" name=${iconName}></col-icon>`}
      ${badgeText && html`<col-badge slot="badge" variant=${badgeVariant}>${badgeText}</col-badge>`}
      ${actionText &&
      html`
        <col-button slot="actions" size="small" color="secondary"> ${actionText} </col-button>
      `}
    </col-modal-header>
    <div class="example-content">
      <p>Modal content goes here...</p>
    </div>
  </div>
`;

/**
 * Default story showing a basic modal header with title and close button
 */
export const Default: Story = {
  args: {
    title: 'Modal Title',
  },
  render: renderModalHeader,
};

/**
 * Modal header with an icon
 */
export const WithIcon: Story = {
  args: {
    title: 'Settings',
    iconName: 'settings',
  },
  render: renderModalHeader,
};

/**
 * Modal header with a badge
 */
export const WithBadge: Story = {
  args: {
    title: 'Notifications',
    badgeText: 'New',
    badgeVariant: 'primary',
  },
  render: renderModalHeader,
};

/**
 * Modal header with action button
 */
export const WithActions: Story = {
  args: {
    title: 'Document',
    actionText: 'Edit',
  },
  render: renderModalHeader,
};

/**
 * Modal header without close button
 */
export const NoCloseButton: Story = {
  args: {
    title: 'Required Action',
    noclosebutton: true,
  },
  render: renderModalHeader,
};

/**
 * Modal header with all features
 */
export const FullFeatured: Story = {
  args: {
    title: 'Advanced Settings',
    iconName: 'settings',
    badgeText: 'Beta',
    badgeVariant: 'warning',
    actionText: 'Help',
  },
  render: renderModalHeader,
};
