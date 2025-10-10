import { css, html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  active: boolean;
  position: 'left' | 'right';
  size: 'small' | 'medium' | 'large';
  width?: number;
  nofocustrap: boolean;
  headerContent?: string;
  footerContent?: string;
  mainContent?: string;
  onOverlayClickOutside?: () => void;
};

const meta = {
  title: 'Overlays/Drawer',
  component: 'col-drawer',
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
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'The edge from which the drawer slides',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Preset drawer width (small: 448px, medium: 640px, large: 960px)',
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
    nofocustrap: {
      control: 'boolean',
      description: 'Disable focus trapping within the drawer',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    headerContent: {
      control: 'text',
      description: 'Content for the drawer header slot',
      table: {
        category: 'Slots',
        type: { summary: 'string' },
      },
    },
    footerContent: {
      control: 'text',
      description: 'Content for the drawer footer slot',
      table: {
        category: 'Slots',
        type: { summary: 'string' },
      },
    },
    mainContent: {
      control: 'text',
      description: 'Main content of the drawer',
      table: {
        category: 'Slots',
        type: { summary: 'string' },
      },
    },
    onOverlayClickOutside: {
      action: 'overlay-click-outside',
      description: 'Event fired when clicking outside the drawer',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    active: false,
    position: 'right',
    size: 'small',
    nofocustrap: false,
    headerContent: '',
    footerContent: '',
    mainContent: 'This is the drawer content. Click outside or press Escape to close.',
    onOverlayClickOutside: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Basic drawer render function
 */
const renderDrawer: Story['render'] = ({
  active,
  position,
  size,
  width,
  nofocustrap,
  headerContent,
  footerContent,
  mainContent,
  onOverlayClickOutside,
}) => {
  const ID = `drawer-${new Date().getTime()}`;
  const handleButtonClick = () => {
    const drawer = document.getElementById(ID);
    if (drawer) {
      drawer.setAttribute('active', 'true');
    }
  };

  return html`
    <div>
      <col-button color="primary" @click=${handleButtonClick}>Open Drawer</col-button>

      <col-drawer
        id=${ID}
        ?active=${active}
        position=${position}
        size=${size}
        width=${width || null}
        ?nofocustrap=${nofocustrap}
        @overlay-click-outside=${onOverlayClickOutside}
      >
        ${headerContent ? html` <div slot="header">${headerContent}</div> ` : ''} ${mainContent}
        ${footerContent ? html` <div slot="footer">${footerContent}</div> ` : ''}
      </col-drawer>
    </div>
  `;
};

/**
 * Default story showing a basic drawer
 */
export const Default: Story = {
  args: {
    active: false,
    position: 'right',
    size: 'small',
    mainContent: 'This is the drawer content. Click outside or press Escape to close.',
  },
  render: renderDrawer,
};

/**
 * Drawer sliding from the left
 */
export const LeftPosition: Story = {
  args: {
    active: false,
    position: 'left',
    size: 'small',
    mainContent: 'This drawer slides in from the left side of the screen.',
  },
  render: renderDrawer,
};

/**
 * Medium sized drawer
 */
export const MediumSize: Story = {
  args: {
    active: false,
    position: 'right',
    size: 'medium',
    mainContent: 'This is a medium-sized drawer (640px wide).',
  },
  render: renderDrawer,
};

/**
 * Large sized drawer
 */
export const LargeSize: Story = {
  args: {
    active: false,
    position: 'right',
    size: 'large',
    mainContent:
      'This is a large drawer (960px wide). Perfect for displaying forms or detailed content.',
  },
  render: renderDrawer,
};

/**
 * Drawer with custom width
 */
export const CustomWidth: Story = {
  args: {
    active: false,
    position: 'right',
    width: 500,
    mainContent: 'This drawer has a custom width of 500px.',
  },
  render: renderDrawer,
};

/**
 * Drawer with header and footer
 */
export const WithHeaderFooter: Story = {
  args: {
    active: false,
    position: 'right',
    size: 'small',
    headerContent: '',
    footerContent: '',
    mainContent: '',
  },
  render: ({ active, position, size, width, nofocustrap, onOverlayClickOutside }) => {
    const handleButtonClick = () => {
      const drawer = document.getElementById('drawer-header-footer');
      if (drawer) {
        drawer.setAttribute('active', 'true');
      }
    };

    const handleClose = () => {
      const drawer = document.getElementById('drawer-header-footer');
      if (drawer) {
        drawer.removeAttribute('active');
      }
    };

    return html`
      <div>
        <col-button color="primary" @click=${handleButtonClick}>
          Open Drawer with Header & Footer
        </col-button>

        <col-drawer
          id="drawer-header-footer"
          ?active=${active}
          position=${position}
          size=${size}
          width=${width || null}
          ?nofocustrap=${nofocustrap}
          @overlay-click-outside=${onOverlayClickOutside}
        >
          <col-modal-header slot="header" title="Drawer Title" @on-close=${handleClose}>
            <col-button slot="actions" aria-label="Full screen">
              <col-icon name="three-dots-vertical" size="16"></col-icon>
            </col-button>
          </col-modal-header>

          <div>
            <h3>Main Content Area</h3>
            <p>This drawer demonstrates the use of header and footer slots.</p>
            <p>The header includes a title and close button.</p>
            <p>The footer contains action buttons.</p>
          </div>

          <col-modal-footer slot="footer" description="This is helper text">
            <col-button slot="actions-left">Tertiary</col-button>
            <col-button slot="actions" @click=${handleClose}>Secondary</col-button>
            <col-button slot="actions" color="primary" @click=${handleClose}>Primary</col-button>
          </col-modal-footer>
        </col-drawer>
      </div>
    `;
  },
};

const navStylesExample = css`
  .navExample {
    padding: 20px;
  }

  .listExample {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .listItemExample {
    margin-bottom: 16px;
  }

  .itemExample {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
  }
`;

/**
 * Navigation drawer example
 */
export const NavigationDrawer: Story = {
  args: {
    active: false,
    position: 'left',
    size: 'small',
  },
  render: ({ active, position, size, nofocustrap, onOverlayClickOutside }) => {
    const handleButtonClick = () => {
      const drawer = document.getElementById('drawer-navigation');
      if (drawer) {
        drawer.setAttribute('active', 'true');
      }
    };

    const handleClose = () => {
      const drawer = document.getElementById('drawer-navigation');
      if (drawer) {
        drawer.removeAttribute('active');
      }
    };

    return html`
      <style>
        ${navStylesExample}
      </style>
      <div>
        <col-button color="primary" @click=${handleButtonClick}>
          <col-icon name="six-dots"></col-icon>
          Open Navigation
        </col-button>

        <col-drawer
          id="drawer-navigation"
          ?active=${active}
          position=${position}
          size=${size}
          ?nofocustrap=${nofocustrap}
          @overlay-click-outside=${onOverlayClickOutside}
        >
          <col-modal-header
            slot="header"
            title="Navigation"
            @on-close=${handleClose}
          ></col-modal-header>

          <nav class="navExample">
            <ul class="listExample">
              <li class="listItemExample">
                <a href="#" class="itemExample">
                  <col-icon name="home"></col-icon>
                  <span>Home</span>
                </a>
              </li>
              <li class="listItemExample">
                <a href="#" class="itemExample">
                  <col-icon name="person"></col-icon>
                  <span>Profile</span>
                </a>
              </li>
              <li class="listItemExample">
                <a href="#" class="itemExample">
                  <col-icon name="settings"></col-icon>
                  <span>Settings</span>
                </a>
              </li>
              <li class="listItemExample">
                <a href="#" class="itemExample">
                  <col-icon name="alert-circle"></col-icon>
                  <span>Help</span>
                </a>
              </li>
            </ul>
          </nav>
        </col-drawer>
      </div>
    `;
  },
};

/**
 * Form drawer example
 */
export const FormDrawer: Story = {
  args: {
    active: false,
    position: 'right',
    size: 'medium',
  },
  render: ({ active, position, size, nofocustrap, onOverlayClickOutside }) => {
    const handleButtonClick = () => {
      const drawer = document.getElementById('drawer-form-focus');
      if (drawer) {
        drawer.setAttribute('active', 'true');
      }
    };

    const handleClose = () => {
      const drawer = document.getElementById('drawer-form-focus');
      if (drawer) {
        drawer.removeAttribute('active');
      }
    };

    return html`
      <div>
        <col-button color="primary" @click=${handleButtonClick}>Edit User Details</col-button>

        <col-drawer
          id="drawer-form-focus"
          ?active=${active}
          position=${position}
          size=${size}
          ?nofocustrap=${nofocustrap}
          @overlay-click-outside=${onOverlayClickOutside}
        >
          <col-modal-header
            slot="header"
            title="Edit User"
            @on-close=${handleClose}
          ></col-modal-header>

          <form>
            <div>
              <col-text-field
                label="With Label"
                input-type="text"
                variant="outline"
                placeholder="Enter text here..."
                validation-timing="blur"
              >
              </col-text-field>
            </div>

            <div>
              <col-text-field
                label="With Label"
                input-type="text"
                variant="outline"
                placeholder="Enter text here..."
                validation-timing="blur"
              >
              </col-text-field>
            </div>

            <div>
              <col-text-field
                label="With Label"
                input-type="text"
                variant="outline"
                placeholder="Enter text here..."
                validation-timing="blur"
              >
              </col-text-field>
            </div>

            <div>
              <col-text-field
                label="With Label"
                input-type="text"
                variant="outline"
                placeholder="Enter text here..."
                validation-timing="blur"
              >
              </col-text-field>
            </div>
          </form>

          <col-modal-footer slot="footer">
            <col-button slot="actions" color="secondary" @click=${handleClose}>Cancel</col-button>
            <col-button slot="actions" color="primary" @click=${handleClose}>
              Save Changes
            </col-button>
          </col-modal-footer>
        </col-drawer>
      </div>
    `;
  },
};

/**
 * Multiple drawers example
 */
export const MultipleDrawers: Story = {
  parameters: {
    __sb: {
      display: 'flex',
      gap: '16px',
    },
  },
  render: () => {
    const handleLeftClick = () => {
      const drawer = document.querySelector('#leftDrawer');
      if (drawer) {
        drawer.setAttribute('active', 'true');
      }
    };

    const handleRightClick = () => {
      const drawer = document.querySelector('#rightDrawer');
      if (drawer) {
        drawer.setAttribute('active', 'true');
      }
    };

    return html`
      <col-button @click=${handleLeftClick}>Open Left Drawer</col-button>
      <col-button @click=${handleRightClick}>Open Right Drawer</col-button>

      <col-drawer id="leftDrawer" position="left" size="small">
        <div>
          <h3>Left Drawer</h3>
          <p>This drawer slides in from the left.</p>
        </div>
      </col-drawer>

      <col-drawer id="rightDrawer" position="right" size="small">
        <div>
          <h3>Right Drawer</h3>
          <p>This drawer slides in from the right.</p>
        </div>
      </col-drawer>
    `;
  },
};
