import { html } from 'lit';
import { fn } from '@storybook/test';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import hljs from 'highlight.js/lib/core';
import '@/_storybook/components/FormDemo';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  labelfirst: boolean;
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
    labelfirst: {
      control: 'boolean',
      description: 'Enables the label to be positioned on the left side of the toggle',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'labelfirst', neq: false },
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
    labelfirst: false,
    change: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ name, checked, disabled, labelfirst }) => html`
    <col-toggle
      name=${name}
      ?checked=${checked}
      ?disabled=${disabled}
      ?labelfirst=${labelfirst}
    ></col-toggle>
  `,
};

export const WithLabel: Story = {
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelfirst=${args.labelfirst}
    >
      Enable Notifications
    </col-toggle>
  `,
};

export const WithLeftSideLabel: Story = {
  args: {
    labelfirst: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelfirst=${args.labelfirst}
    >
      Receive Email Updates
    </col-toggle>
  `,
};

export const WithHelpText: Story = {
  args: {
    labelfirst: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelfirst=${args.labelfirst}
    >
      Show Online Status
      <span slot="help-text">This is a helper text</span>
    </col-toggle>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
    labelfirst: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelfirst=${args.labelfirst}
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
      ?labelfirst=${args.labelfirst}
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
    labelfirst: true,
  },
  render: args => html`
    <col-toggle
      name=${args.name}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      ?labelfirst=${args.labelfirst}
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
    docs: {
      source: {
        transform: (code: string) => {
          const formMatch = code.match(/<form[^>]*slot="form"[^>]*>[\s\S]*?<\/form>/);
          return formatCodeString(formMatch?.[0] || '');
        },
      },
    },
  },
  render: () => {
    const formId = 'toggle-form-example';
    const outputId = 'toggle-form-output';
    const isInDocs = window.location.search.includes('viewMode=docs');
    const codeSnippet = hljs.highlightAuto(`
      // Handle form submit with FormValidationController
      form.addEventListener('submit', (event) => {
        // Check if validation was already prevented
        if (event.defaultPrevented) {
          console.log('Form submission blocked by validation');
          return;
        }

        // Prevent page reload
        event.preventDefault();

        // Process form data only if validation passed
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        console.log('Form submitted successfully:', formValues);
      });

      // Handle form reset - FormResetController handles component reset automatically
      form.addEventListener('reset', () => {
        // Only handle UI cleanup - components reset automatically
        // A custom message or action can be added here
        console.log('Form reset completed');
      });
    `).value;

    return html`
      <form-demo
        form-id="${formId}"
        output-id="${outputId}"
        title="Account Settings"
        code-snippet="${codeSnippet}"
        code-theme="dark"
      >
        <form slot="form" id="${formId}" class="form-container">
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
            <col-toggle name="enable-notifications-toggle" id="enable-notifications-toggle">
              Enable Notifications
            </col-toggle>
            <col-toggle name="mfa-toggle" id="mfa-toggle">Two-Factor Authentication</col-toggle>
          </col-group>
          <col-group>
            <col-button type="submit" color="primary" ?disabled=${isInDocs}>Save</col-button>
            <col-button type="reset" color="primary" variant="outlined" ?disabled=${isInDocs}>
              Reset
            </col-button>
          </col-group>
        </form>
      </form-demo>
    `;
  },
};
