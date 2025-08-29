import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  active: boolean;
  layout: 'default' | 'noheader' | 'nofooter';
  size: 'small' | 'medium' | 'large' | 'full';
  height?: number;
  width?: number;
  preventclose: boolean;
  onDialogClose: () => void;
  onDialogPrevented: () => void;
  onDialogAction: () => void;
};

const meta = {
  title: 'Organisms/Dialog',
  component: 'col-dialog',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    __sb: {
      minHeight: '400px',
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Controls whether the drawer is visible',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    layout: {
      control: 'select',
      options: ['default', 'noheader', 'nofooter'],
      description: 'Defines whether the dialog has no header, no footer or contains both',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description:
        'Preset drawer width (small: 448px, medium: 640px, large: 960px, full: 1280px) and height (small, medium, large: 311px, full: 720px)',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'small' },
      },
    },
    width: {
      control: 'number',
      description: 'Custom width in pixels (overrides size preset)',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    height: {
      control: 'number',
      description: 'Custom height in pixels (overrides size preset)',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onDialogAction: {
      action: 'dialog-action',
      description: 'Fired for cancel and confirm actions within the dialog',
      table: {
        category: 'Events',
      },
    },
    onDialogClose: {
      action: 'dialog-close',
      description: 'Fired when dialog closes',
      table: {
        category: 'Events',
      },
    },
    onDialogPrevented: {
      action: 'dialog-prevented',
      description: 'Fired when a close action is prevented',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    active: false,
    layout: 'default',
    size: 'small',
    onDialogPrevented: fn(),
    onDialogClose: fn(),
    onDialogAction: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default story showing a basic dialog
 */
export const Default: Story = {
  render: ({ active, layout, size, width, onDialogAction, onDialogClose, onDialogPrevented }) => {
    const ID = `dialog-${new Date().getTime()}`;
    const handleButtonClick = () => {
      const dialog = document.getElementById(ID);
      if (dialog) {
        dialog.setAttribute('active', 'true');
      }
    };

    return html`
      <div>
        <col-button @click=${handleButtonClick}>Open Dialog</col-button>

        <col-dialog
          id=${ID}
          ?active=${active}
          layout=${layout}
          size=${size}
          width=${width || null}
          height=${width || null}
          @dialog-action=${onDialogAction}
          @dialog-close=${onDialogClose}
          @dialog-prevented=${onDialogPrevented}
        >
          <col-modal-header slot="header" title="Dialog"></col-modal-header>

          <p>Basic paragraph to see the dialog content</p>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel" color="secondary">Cancel</col-button>
            <col-button slot="actions" data-action="confirm" color="primary">Save</col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};
