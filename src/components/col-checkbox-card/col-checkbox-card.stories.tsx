import { html, css, nothing } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { icons } from '@telesign/colibri-icons/icons-list';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  title: string;
  description: string;
  customContent: boolean;
  indeterminate: boolean;
  withIcon: boolean;
  iconName: string;
};

const meta = {
  title: 'Forms/Checkbox Card',
  component: 'col-checkbox-card',
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
      description: 'Name of the checkbox card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox card',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'disabled', neq: false },
    },
    title: {
      control: 'text',
      description: 'Title text for the checkbox card',
      table: {
        type: { summary: 'string' },
        category: 'core',
        defaultValue: { summary: '""' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text for the checkbox card',
      table: {
        type: { summary: 'string' },
        category: 'core',
        defaultValue: { summary: '""' },
      },
    },
    customContent: {
      name: 'customcontent',
      control: 'boolean',
      description: 'Enables custom content slot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'customContent', neq: false },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Sets the checkbox card to an indeterminate state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'indeterminate', neq: false },
    },
    withIcon: {
      control: 'boolean',
      description:
        'Whether to show an icon when the checkbox card is checked. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'withIcon', neq: false },
    },
    iconName: {
      control: 'select',
      options: icons,
      description:
        'Name of the icon to show when the checkbox card is checked. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'withIcon', neq: false },
    },
  },
  args: {
    name: 'Checkbox Card',
    checked: false,
    disabled: false,
    title: 'Card Title',
    description: 'Card description text',
    customContent: false,
    indeterminate: false,
    withIcon: false,
    iconName: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const styles = css`
  .checkbox-card-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .checkbox-card-group-vertical {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }

  .checkbox-card-group-header {
    margin-bottom: 12px;
  }

  .toggle-button {
    padding: 8px 16px;
    background-color: var(--col-colors-ui-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: var(--col-typography-font-family-primary);
    font-size: 14px;
  }

  .toggle-button:hover {
    background-color: var(--col-colors-ui-primary-dark);
  }

  .toggle-button:active {
    background-color: var(--col-colors-ui-primary-dark);
  }
`;

const RenderCheckboxCard: Story['render'] = ({
  checked,
  disabled,
  title,
  description,
  name,
  indeterminate,
  withIcon,
  iconName,
}) => html`
  <col-checkbox-card
    name=${name}
    title=${title}
    description=${description}
    ?checked=${checked}
    ?disabled=${disabled}
    ?indeterminate=${indeterminate}
  >
    ${withIcon
    ? html`<col-icon name=${iconName} slot="checked-icon" size="12" color="white"></col-icon>`
    : nothing}
  </col-checkbox-card>
`;

export const Default: Story = {
  args: {
    title: 'Card Title',
    description: 'Card description text',
  },
  render: RenderCheckboxCard,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: RenderCheckboxCard,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: RenderCheckboxCard,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: RenderCheckboxCard,
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
  render: RenderCheckboxCard,
};

export const WithCustomIcon: Story = {
  args: {
    withIcon: true,
    iconName: 'emoji-circle',
  },
  render: RenderCheckboxCard,
};

export const CustomContent: Story = {
  args: {
    customContent: true,
  },
  render: ({ checked, disabled, customContent }) => html`
    <col-checkbox-card ?checked=${checked} ?disabled=${disabled} ?customcontent=${customContent}>
      <div style="padding: 8px 0;">
        <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
        <p style="margin: 0;">You can add any custom content here</p>
      </div>
    </col-checkbox-card>
  `,
};

export const CardGroup: Story = {
  parameters: {
    __sb: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
    },
  },
  render: () => html`
    <col-checkbox-card
      name="feature1"
      title="Feature 1"
      description="Essential feature for basic users"
    ></col-checkbox-card>
    <col-checkbox-card
      name="feature2"
      title="Feature 2"
      description="Advanced feature for power users"
    ></col-checkbox-card>
    <col-checkbox-card
      name="feature3"
      title="Feature 3"
      description="Premium feature for enterprise users"
    ></col-checkbox-card>
  `,
};

export const CustomContentGroup: Story = {
  parameters: {
    __sb: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  render: () => html`
    <col-checkbox-card name="theme1" customcontent>
      <div style="padding: 16px 0; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 8px;">☀️</div>
        <h3 style="margin: 0 0 8px 0;">Light Theme</h3>
        <p style="margin: 0;">Bright and clean interface</p>
      </div>
    </col-checkbox-card>
    <col-checkbox-card name="theme2" customcontent>
      <div style="padding: 16px 0; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 8px;">🌙</div>
        <h3 style="margin: 0 0 8px 0;">Dark Theme</h3>
        <p style="margin: 0;">Easy on the eyes at night</p>
      </div>
    </col-checkbox-card>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    let checked = false;

    const toggleState = () => {
      checked = !checked;
      const checkbox = document.querySelector('#controlled-checkbox-card') as HTMLInputElement;
      checkbox.checked = checked;
      const stateDisplay = document.querySelector('#state-display') as HTMLInputElement;
      stateDisplay.textContent = checked ? 'Checked' : 'Unchecked';
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="checkbox-card-group">
        <div class="checkbox-card-group-header">
          <strong>Current state: </strong><span id="state-display">Unchecked</span>
        </div>
        <div class="checkbox-card-group-content">
          <col-checkbox-card
            title="Checkbox Card"
            description="Checkbox Card description"
            id="controlled-checkbox-card"
            @change=${toggleState}
          >
          </col-checkbox-card>
        </div>
        <div>
          <button class="toggle-button" @click=${toggleState}>Toggle state externally</button>
        </div>
      </div>
    `;
  },
};
