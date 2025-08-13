import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  active: boolean;
  absolute: boolean;
  contained: boolean;
  persistent: boolean;
  noBackdrop: boolean;
  noCentered: boolean;
  noFocusTrap: boolean;
  zIndex?: number;
  content: string;
  onOverlayClickOutside?: () => void;
  onOverlayEscape?: () => void;
};

const meta = {
  title: 'Molecules/Overlay',
  component: 'col-overlay',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the overlay is active/visible',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    absolute: {
      control: 'boolean',
      description: 'Use absolute positioning instead of fixed',
      table: {
        category: 'Positioning',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    contained: {
      control: 'boolean',
      description: 'Contain the overlay within its parent',
      table: {
        category: 'Positioning',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    persistent: {
      control: 'boolean',
      description: 'Prevent backdrop clicks from closing the overlay',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noBackdrop: {
      name: 'no-backdrop',
      control: 'boolean',
      description: 'Hide the backdrop',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noCentered: {
      name: 'no-centered',
      control: 'boolean',
      description: 'Remove centering transforms for custom positioning',
      table: {
        category: 'Positioning',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noFocusTrap: {
      name: 'no-focus-trap',
      control: 'boolean',
      description: 'Disable focus trapping',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    zIndex: {
      name: 'z-index',
      control: 'number',
      description: 'Custom z-index value',
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    content: {
      control: 'text',
      description: 'Content to display in the overlay. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
      },
    },
    onOverlayClickOutside: {
      action: 'overlay-click-outside',
      description: 'Event fired when clicking outside the overlay',
      table: {
        category: 'Events',
      },
    },
    onOverlayEscape: {
      action: 'overlay-escape',
      description: 'Event fired when pressing Escape key',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    active: false,
    absolute: false,
    contained: false,
    persistent: false,
    noBackdrop: false,
    noCentered: false,
    noFocusTrap: false,
    content: 'Overlay content goes here. Click outside or press Escape to close.',
    onOverlayClickOutside: fn(),
    onOverlayEscape: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderOverlay: Story['render'] = ({
                                          active,
                                          absolute,
                                          contained,
                                          persistent,
                                          noBackdrop,
                                          noCentered,
                                          noFocusTrap,
                                          zIndex,
                                          content,
                                          onOverlayClickOutside,
                                          onOverlayEscape,
                                        }) => {
  const ID = `overlay-${new Date().getTime()}`;
  const handleButtonClick = () => {
    const overlay = document.getElementById(ID);
    if (overlay) {
      overlay.setAttribute('active', 'true');
    }
  };

  const handleClose = () => {
    const overlay = document.getElementById(ID);
    if (overlay) {
      overlay.removeAttribute('active');
    }
  };

  return html`
    <div style="min-height: 200px; position: relative;">
      <col-button @click=${handleButtonClick}>Open Overlay</col-button>

      ${persistent ? "Please click on close button after open overlay" : ''}

      <col-overlay
        id=${ID}
        ?active=${active}
        ?absolute=${absolute}
        ?contained=${contained}
        ?persistent=${persistent}
        ?no-backdrop=${noBackdrop}
        ?no-centered=${noCentered}
        ?no-focus-trap=${noFocusTrap}
        z-index=${zIndex || null}
        @overlay-click-outside=${onOverlayClickOutside}
        @overlay-escape=${onOverlayEscape}
      >
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          ${content}
          <div style="display: flex; align-items: center; justify-content: center; margin-top: 10px">
            <col-button slot="actions" color="primary" @click=${handleClose}>Close</col-button>
          </div>
        </div>
      </col-overlay>
    </div>
  `;
};

/**
 * Default story showing a basic overlay with backdrop
 *
 * Note: This component is used internally by other Colibri components like
 * [Drawer](/story/organisms-drawer--default) to create the backdrop and handle focus management.
 */
export const Default: Story = {
  args: {
    active: false,
    content: 'Overlay content goes here. Click outside or press Escape to close.',
  },
  render: renderOverlay,
};

/**
 * Overlay without backdrop
 */
export const NoBackdrop: Story = {
  args: {
    active: false,
    noBackdrop: true,
    content: 'This overlay has no backdrop. Click the content area or press Escape to close.',
  },
  render: renderOverlay,
};

/**
 * Persistent overlay that doesn't close on backdrop click
 */
export const Persistent: Story = {
  args: {
    active: false,
    persistent: true,
    content: 'This overlay is persistent. It won\'t close when clicking outside or Esc key. Please click on close button before to continue',
  },
  render: renderOverlay,
};

/**
 * Custom positioned overlay (not centered)
 *
 * This is how the Drawer component uses the overlay with no-centered to position content at the edge.
 * See [Drawer implementation](/story/organisms-drawer--default) for a real-world example.
 */
export const CustomPosition: Story = {
  args: {
    active: false,
    noCentered: true,
    content: 'This overlay is not centered. Custom positioning can be applied.',
  },
  render: ({ active, absolute, contained, persistent, noBackdrop, noCentered, noFocusTrap, zIndex, onOverlayClickOutside, onOverlayEscape }) => {
    const handleButtonClick = () => {
      const overlay = document.getElementById('overlay-custom-position');
      if (overlay) {
        overlay.setAttribute('active', 'true');
      }
    };

    return html`
      <div style="min-height: 200px; position: relative;">
        <col-button @click=${handleButtonClick}>Open Custom Positioned Overlay</col-button>

        <col-overlay
          id="overlay-custom-position"
          ?active=${active}
          ?absolute=${absolute}
          ?contained=${contained}
          ?persistent=${persistent}
          ?no-backdrop=${noBackdrop}
          ?no-centered=${noCentered}
          ?no-focus-trap=${noFocusTrap}
          z-index=${zIndex || null}
          @overlay-click-outside=${onOverlayClickOutside}
          @overlay-escape=${onOverlayEscape}
        >
          <div style="position: fixed; top: 20px; right: 20px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            Custom positioned content (top-right corner)
          </div>
        </col-overlay>
      </div>
    `;
  },
};

/**
 * Overlay without focus trap
 */
export const NoFocusTrap: Story = {
  args: {
    active: false,
    noFocusTrap: true,
    content: 'This overlay does not trap focus. Tab navigation will move outside the overlay.',
  },
  render: renderOverlay,
};
