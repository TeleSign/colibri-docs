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
  preventClose: boolean;
  keepOpen: boolean;
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
    preventClose: {
      control: 'boolean',
      description:
        'Defines whether the dialog is allow to close by clicking or pressing Escape key on the overlay ',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    keepOpen: {
      control: 'boolean',
      description:
        'Defines whether the dialog closes at submit or waits for another action to be completed',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    keepOpen: false,
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
  render: ({
    active,
    layout,
    size,
    width,
    height,
    preventClose,
    keepOpen,
    onDialogAction,
    onDialogClose,
    onDialogPrevented,
  }) => {
    const ID = `basic-dialog-${new Date().getTime()}`;
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
          ?preventclose=${preventClose}
          width=${width || null}
          height=${height || null}
          ?keepopen=${keepOpen}
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

export const CustomWidthHeight: Story = {
  args: {
    width: 333,
    height: 211,
  },
  render: args => {
    const ID = `custom-width-height-dialog-${new Date().getTime()}`;
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
          ?active=${args.active}
          layout=${args.layout}
          size=${args.size}
          width=${args.width || null}
          height=${args.height || null}
          ?preventclose=${args.preventClose}
          @dialog-action=${args.onDialogAction}
          @dialog-close=${args.onDialogClose}
          @dialog-prevented=${args.onDialogPrevented}
        >
          <col-modal-header slot="header" title="Passive Dialog"></col-modal-header>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel">Cancel</col-button>
            <col-button slot="actions" data-action="confirm" color="primary">Save</col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};

export const SmallNoFooter: Story = {
  args: {
    size: 'small',
    layout: 'nofooter',
  },
  render: args => {
    const ID = `small-nofooter-dialog-${new Date().getTime()}`;
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
          ?active=${args.active}
          layout=${args.layout}
          size=${args.size}
          width=${args.width || null}
          height=${args.height || null}
          ?preventclose=${args.preventClose}
          @dialog-action=${args.onDialogAction}
          @dialog-close=${args.onDialogClose}
          @dialog-prevented=${args.onDialogPrevented}
        >
          <col-modal-header slot="header" title="Passive Dialog"></col-modal-header>

          <p>
            Presents information the user needs to be aware of concerning their current workflow.
            Contains no actions for the user to take.
          </p>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel">Cancel</col-button>
            <col-button slot="actions" data-action="confirm" color="primary">Save</col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};

export const MediumPreventClose: Story = {
  args: {
    preventClose: true,
    size: 'medium',
  },
  render: args => {
    const ID = `medium-nofooter-dialog-${new Date().getTime()}`;
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
          ?active=${args.active}
          layout=${args.layout}
          size=${args.size}
          width=${args.width || null}
          height=${args.height || null}
          ?preventclose=${args.preventClose}
          @dialog-action=${args.onDialogAction}
          @dialog-close=${args.onDialogClose}
          @dialog-prevented=${args.onDialogPrevented}
        >
          <col-modal-header
            slot="header"
            title="Dialog with Close action prevented"
          ></col-modal-header>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel">Cancel</col-button>
            <col-button slot="actions" data-action="confirm" color="primary">Save</col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};

export const LargeNoHeader: Story = {
  args: {
    layout: 'noheader',
    size: 'large',
  },
  render: args => {
    const ID = `large-nofooter-dialog-${new Date().getTime()}`;
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
          ?active=${args.active}
          layout=${args.layout}
          size=${args.size}
          width=${args.width || null}
          height=${args.height || null}
          ?preventclose=${args.preventClose}
          @dialog-action=${args.onDialogAction}
          @dialog-close=${args.onDialogClose}
          @dialog-prevented=${args.onDialogPrevented}
        >
          <col-modal-header slot="header" title="Transactional Dialog"></col-modal-header>

          <p>
            Requires an action to be taken in order for the modal to be completed and closed.
            Contains a cancel and primary action buttons.
          </p>
          <form>
            <col-text-field
              id="username"
              name="username"
              label="Username"
              required
            ></col-text-field>
          </form>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel">Cancel</col-button>
            <col-button slot="actions" data-action="confirm" color="primary">Save</col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};

export const Multiple: Story = {
  args: {
    size: 'medium',
    keepOpen: true,
  },
  render: args => {
    const ID1 = `primary-multiple-dialog-${new Date().getTime()}`;
    const ID2 = `secondary-multiple-dialog-${new Date().getTime()}`;
    const handleButtonClick = () => {
      const primaryDialog = document.getElementById(ID1);
      if (primaryDialog) {
        primaryDialog.setAttribute('active', 'true');
      }
    };

    const handleSaveButtonClick = () => {
      const secondaryDialog = document.getElementById(ID2);
      if (secondaryDialog) {
        secondaryDialog.setAttribute('active', 'true');
      }
    };

    const handleConfirmButtonClick = () => {
      const primaryDialog = document.getElementById(ID1);
      if (primaryDialog) {
        primaryDialog.removeAttribute('active');
      }
    };

    return html`
      <div>
        <col-button @click=${handleButtonClick}>Open Dialog</col-button>

        <col-dialog
          id=${ID1}
          ?active=${args.active}
          layout=${args.layout}
          size=${args.size}
          width=${args.width || null}
          height=${args.width || null}
          ?keepopen=${args.keepOpen}
          @dialog-action=${args.onDialogAction}
          @dialog-close=${args.onDialogClose}
          @dialog-prevented=${args.onDialogPrevented}
        >
          <col-modal-header slot="header" title="Transactional Dialog"></col-modal-header>

          <p>
            Requires an action to be taken in order for the modal to be completed and closed.
            Contains a cancel and primary action buttons.
          </p>
          <form>
            <col-text-field id="email" name="email" label="Email" required></col-text-field>
          </form>

          <col-modal-footer slot="footer">
            <col-button slot="actions" data-action="cancel">Cancel</col-button>
            <col-button
              slot="actions"
              data-action="confirm"
              color="primary"
              @click=${handleSaveButtonClick}
            >
              Save
            </col-button>
          </col-modal-footer>
        </col-dialog>

        <col-dialog id=${ID2} width="300" height="180">
          <col-modal-header slot="header" title="Dialog Title"></col-modal-header>
          <p>Click Confirm button to submit your data</p>
          <col-modal-footer slot="footer">
            <col-button
              slot="actions"
              data-action="confirm"
              color="primary"
              @click=${handleConfirmButtonClick}
            >
              Confirm
            </col-button>
          </col-modal-footer>
        </col-dialog>
      </div>
    `;
  },
};

export const FullIntegration: Story = {
  render: args => {
    const ID1 = `primary-full-dialog-${new Date().getTime()}`;
    const ID2 = `secondary-full-dialog-${new Date().getTime()}`;

    const handleButtonClick = () => {
      const primaryDialog = document.getElementById(ID1);
      if (primaryDialog) {
        primaryDialog.setAttribute('active', 'true');
      }
    };

    const handleSaveButtonClick = () => {
      const form = document.getElementById('dialog-form') as HTMLFormElement;
      const avatar = document.getElementById('user-avatar');
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      avatar?.setAttribute('name', data.username);
    };

    const handleNotifications = () => {
      const toggle = document.getElementById('enable-notifications-toggle');
      if (toggle?.hasAttribute('checked')) {
        const secondaryDialog = document.getElementById(ID2);
        if (secondaryDialog) {
          secondaryDialog.setAttribute('active', 'true');
        }
      }
    };

    const handleConfirmDialog = e => {
      const action = e.detail.action;
      const toggle = document.getElementById('enable-notifications-toggle');
      if (action === 'footer-confirm') {
        toggle?.removeAttribute('checked');

        const secondaryDialog = document.getElementById(ID2);
        if (secondaryDialog) {
          secondaryDialog.removeAttribute('active');
        }
      }
      if (action === 'footer-cancel' || e.type === 'dialog-close') {
        toggle?.setAttribute('checked', 'true');
      }
    };

    return html`
      <div>
        <h3>Account Settings</h3>
        <div style="width: 400px;">
          <col-typography variant="subheading">Personal Data</col-typography>
          <div style="display: flex; justify-content: space-between;">
            <col-avatar id="user-avatar" name="John Doe" variant="full"></col-avatar>
            <col-button @click=${handleButtonClick} color="primary">Change Username</col-button>
          </div>
          <col-dialog
            id=${ID1}
            ?active=${args.active}
            layout=${args.layout}
            size=${args.size}
            width=${args.width || null}
            height=${args.width || null}
            ?keepopen=${args.keepOpen}
            @dialog-action=${args.onDialogAction}
            @dialog-close=${args.onDialogClose}
            @dialog-prevented=${args.onDialogPrevented}
          >
            <col-modal-header slot="header" title="Change Personal Data"></col-modal-header>

            <p>
              Please fill the text input in order to change your username. Then click the Save
              button in order to continue.
            </p>
            <form id="dialog-form">
              <col-text-field
                id="username"
                name="username"
                label="Username"
                required
              ></col-text-field>
            </form>

            <col-modal-footer slot="footer">
              <col-button slot="actions" data-action="cancel"> Cancel </col-button>
              <col-button
                slot="actions"
                data-action="confirm"
                color="primary"
                @click=${handleSaveButtonClick}
              >
                Save
              </col-button>
            </col-modal-footer>
          </col-dialog>
        </div>
        <div style="margin-top: 10px;">
          <col-typography variant="subheading">Account Preferences</col-typography>
          <col-group orientation="vertical">
            <col-toggle
              checked
              name="enable-notifications-toggle"
              id="enable-notifications-toggle"
              @change=${handleNotifications}
            >
              Enable Notifications
            </col-toggle>
          </col-group>
          <col-dialog
            id=${ID2}
            width="300"
            height="180"
            @dialog-close=${handleConfirmDialog}
            @dialog-action=${handleConfirmDialog}
          >
            <col-modal-header slot="header" title="Dialog Title"></col-modal-header>
            <p>Are you sure you want to disable notifications for your account?</p>
            <col-modal-footer slot="footer">
              <col-button slot="actions" data-action="cancel"> Cancel </col-button>
              <col-button slot="actions" data-action="confirm" color="primary">
                Confirm
              </col-button>
            </col-modal-footer>
          </col-dialog>
        </div>
      </div>
    `;
  },
};
