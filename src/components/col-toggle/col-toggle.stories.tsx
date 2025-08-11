import { html } from 'lit';
import { fn } from '@storybook/test';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  labelLeft: boolean;
  change: () => void;
};

const meta = {
  title: 'Atoms/Toggle',
  component: 'col-toggle',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'disabled', neq: false },
    },
    labelLeft: {
      control: 'boolean',
      description: 'Enables the label to be positioned on the left side of the toggle',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'labelLeft', neq: false },
    },
    change: {
      action: 'clicked',
      description: 'Fired when the toggle state changes.',
      table: {
        category: 'Events',
        type: { summary: '{ checked: boolean }' },
      },
    },
  },
  args: {
    name: 'toggle',
    checked: false,
    disabled: false,
    labelLeft: false,
    change: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ name, checked, disabled, labelLeft }) => html`
    <col-toggle
      name=${name}
      ?checked=${checked}
      ?disabled=${disabled}
      ?labelLeft=${labelLeft}
    ></col-toggle>
  `,
};

export const WithLabel: Story = {
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Enable Notifications
    </col-toggle>
  `,
};

export const WithLeftLabel: Story = {
  args: {
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Receive Email Updates
    </col-toggle>
  `,
};

export const WithHelpText: Story = {
  args: {
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Show Online Status
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Enable Animations
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Dark Mode
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    labelLeft: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelLeft=${args.labelLeft}
    >
      Two-Factor Authentication
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const InteractiveFormExample: Story = {
  name: 'Interactive Form Example',
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const formId = 'toggle-form';
    const outputId = 'form-output';
    const isInDocs = window.location.search.includes('viewMode=docs');

    let enableNotificationChecked = false;
    let mfaChecked = false;

    const script = `
      const form = document.getElementById('${formId}');
      const output = document.getElementById('${outputId}');
      const isInDocs = ${isInDocs};

      if (!isInDocs) {
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          if (!form.checkValidity()) {
            const firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) firstInvalid.focus();
            return;
          }
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          output.textContent = JSON.stringify(data, null, 2);
        });

        form.addEventListener('reset', () => {
          output.textContent = 'Submit the form to see the data here';
        });
      }
    `;

    return html`
      <style>
        .storybook-card {
          background: #f5f6fa;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(16, 30, 54, 0.04);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .storybook-flex {
          display: flex;
          gap: 2rem;
        }
        .storybook-col {
          flex: 1 1 0;
        }
        .storybook-code {
          background: #23272f;
          color: #fff;
          border-radius: 8px;
          padding: 1rem;
          font-family: 'Fira Mono', 'Consolas', 'Menlo', monospace;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          white-space: pre-wrap;
          overflow-x: auto;
        }
        #${outputId} {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          overflow-x: auto;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .storybook-flex {
            flex-direction: column;
            gap: 1.5rem;
          }
          .storybook-card {
            padding: 1rem;
          }
        }
      </style>
      <div class="storybook-card">
        ${!isInDocs
          ? html`
              <div class="storybook-flex">
                <div class="storybook-col">
                  <h3>Account Settings</h3>
                  <form id="${formId}" class="form-container">
                    <col-typography variant="subheading">Personal Data</col-typography>
                    <col-text-field
                      label="Enter your email"
                      id="email"
                      name="email"
                      input-type="text"
                      variant="outline"
                      placeholder="Enter a valid email address"
                      pattern="[^@]+@[^@]+.[a-zA-Z]{2,}"
                      validation-timing="input"
                      value="johndoe@mail.com"
                      required
                    >
                    </col-text-field>
                    <col-typography variant="subheading">Preferences</col-typography>
                    <col-group orientation="vertical">
                      <col-toggle
                        name="enable-notifications-toggle"
                        id="enable-notifications-toggle"
                        @change=${() => (enableNotificationChecked = !enableNotificationChecked)}
                      >
                        Enable Notifications
                      </col-toggle>
                      <col-toggle
                        name="mfa-toggle"
                        id="mfa-toggle"
                        @change=${() => (mfaChecked = !mfaChecked)}
                      >
                        Two-Factor Authentication
                      </col-toggle>
                    </col-group>
                    <col-group>
                      <col-button type="submit" color="primary" ?disabled=${isInDocs}
                        >Save</col-button
                      >
                      <col-button
                        type="reset"
                        color="primary"
                        variant="outlined"
                        ?disabled=${isInDocs}
                        >Reset</col-button
                      >
                    </col-group>
                  </form>
                </div>
                <div class="storybook-col">
                  <h3>Form Data</h3>
                  <div class="storybook-code">
                    <pre>
// Handle form submit
const form = event.target as HTMLFormElement;
const formData = new FormData(form);
const formValues = Object.fromEntries(formData.entries());
                    </pre
                    >
                  </div>
                  <h3>Form Output</h3>
                  <pre id="${outputId}">Submit the form to see the data here</pre>
                  <script>
                    ${script};
                  </script>
                </div>
              </div>
            `
          : html`
              <h3>Account Settings</h3>
              <form id="${formId}" class="form-container">
                <col-typography variant="subheading">Personal Data</col-typography>
                <col-text-field
                  label="Enter your email"
                  input-type="text"
                  id="email"
                  variant="outline"
                  placeholder="Enter a valid email address"
                  pattern="[^@]+@[^@]+.[a-zA-Z]{2,}"
                  validation-timing="input"
                  value="johndoe@mail.com"
                  required
                >
                </col-text-field>
                <col-typography variant="subheading">Preferences</col-typography>
                <col-group orientation="vertical">
                  <col-toggle
                    name="toggle"
                    id="enable-notifications-toggle"
                    @change=${() => (enableNotificationChecked = !enableNotificationChecked)}
                  >
                    Enable Notifications
                  </col-toggle>
                  <col-toggle
                    name="mfa-toggle"
                    id="mfa-toggle"
                    @change=${() => (mfaChecked = !mfaChecked)}
                  >
                    Two-Factor Authentication
                  </col-toggle>
                </col-group>
                <col-group>
                  <col-button type="submit" color="primary" ?disabled=${isInDocs}>Save</col-button>
                  <col-button type="reset" color="primary" variant="outlined" ?disabled=${isInDocs}
                    >Reset</col-button
                  >
                </col-group>
              </form>
            `}
      </div>
    `;
  },
};
