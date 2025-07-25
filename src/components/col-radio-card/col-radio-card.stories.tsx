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
  value: string;
  group: string;
  withIcon: boolean;
  iconName: string;
};

const meta = {
  title: 'Atoms/Radio Card',
  component: 'col-radio-card',
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
      description: 'Name of the radio card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the radio card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'disabled', neq: false },
    },
    title: {
      control: 'text',
      description: 'Title text for the radio card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Card Title"' },
        category: 'core',
      },
    },
    description: {
      control: 'text',
      description: 'Description text for the radio card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Card description text"' },
        category: 'core',
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
    value: {
      control: 'text',
      description: 'Value of the radio card when selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    group: {
      control: 'text',
      description: 'Group name for related radio cards',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
      if: { arg: 'group', neq: '' },
    },
    withIcon: {
      control: 'boolean',
      description:
        'Whether to show an icon when the radio card is checked. **Storybook control only, not a component prop.**',
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
        'Name of the icon to show when the radio card is checked. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
      if: { arg: 'withIcon', neq: false },
    },
  },
  args: {
    name: '',
    checked: false,
    disabled: false,
    title: 'Card Title',
    description: 'Card description text',
    customContent: false,
    value: '',
    group: '',
    withIcon: false,
    iconName: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const styles = css`
  .radio-card-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 800px;
    font-family: var(--col-typography-font-family-primary);
  }
  .radio-card-group-vertical {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: var(--col-typography-font-family-primary);
  }
  .radio-card-group-header {
    margin-bottom: 12px;
  }
`;

export const RenderCard: Story['render'] = ({
  checked,
  disabled,
  title,
  description,
  value,
  withIcon,
  iconName,
}) => html`
  <col-radio-card
    value=${value}
    title=${title}
    description=${description}
    ?checked=${checked}
    ?disabled=${disabled}
  >
    ${withIcon ? html`<col-icon name=${iconName} slot="checked-icon"></col-icon>` : nothing}
  </col-radio-card>
`;

export const Default: Story = {
  args: {
    value: 'default',
  },
  render: RenderCard,
};

export const Checked: Story = {
  args: {
    checked: true,
    value: 'checked',
  },
  render: RenderCard,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled',
  },
  render: RenderCard,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    value: 'disabled-checked',
  },
  render: RenderCard,
};

export const WithCustomIcon: Story = {
  args: {
    value: 'with-custom-icon',
    withIcon: true,
    iconName: 'emoji-circle',
  },
  render: RenderCard,
};

export const CustomContent: Story = {
  args: {
    customContent: true,
    value: 'custom-content',
  },
  render: ({ checked, disabled, customContent, value }) => html`
    <col-radio-card
      value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      ?customcontent=${customContent}
    >
      <div style="padding: 8px 0;">
        <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
        <p style="margin: 0;">You can add any custom content here</p>
        <div style="display: flex; align-items: center; margin-top: 8px;">
          <col-icon name="star"></col-icon>
          <span style="margin-left: 4px;">5.0 Rating</span>
        </div>
      </div>
    </col-radio-card>
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
    <col-radio-card
      group="plans"
      value="basic"
      checked
      title="Basic Plan"
      description="Essential features for individuals"
    ></col-radio-card>
    <col-radio-card
      group="plans"
      value="pro"
      title="Professional Plan"
      description="Advanced features for small teams"
    ></col-radio-card>
    <col-radio-card
      group="plans"
      value="enterprise"
      title="Enterprise Plan"
      description="Complete solution for large organizations"
    ></col-radio-card>
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
    <col-radio-card group="themes" value="light" checked customcontent>
      <div style="padding: 16px 0; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 8px;">☀️</div>
        <h3 style="margin: 0 0 8px 0;">Light Theme</h3>
        <p style="margin: 0;">Bright and clean interface</p>
      </div>
    </col-radio-card>
    <col-radio-card group="themes" value="dark" customcontent>
      <div style="padding: 16px 0; text-align: center;">
        <div style="font-size: 24px; margin-bottom: 8px;">🌙</div>
        <h3 style="margin: 0 0 8px 0;">Dark Theme</h3>
        <p style="margin: 0;">Easy on the eyes at night</p>
      </div>
    </col-radio-card>
  `,
};

export const InteractiveExample: Story = {
  render: () => {
    const updateSelection = (e: Event) => {
      const selectedCard = e.target as HTMLElement;
      const valueDisplay = document.querySelector('#selected-card-value');
      const selectedValue = selectedCard.getAttribute('value');
      if (valueDisplay) {
        valueDisplay.textContent = selectedValue || 'none';
      }
    };

    return html`
      <style>
        ${styles}
      </style>
      <div class="radio-card-group-vertical">
        <div class="radio-card-group-header">
          <strong>Selected option: </strong><span id="selected-card-value">option1</span>
        </div>
        <div class="radio-card-group">
          <col-radio-card
            group="options"
            value="option1"
            checked
            title="Option 1"
            description="First choice description"
            @change=${updateSelection}
          ></col-radio-card>
          <col-radio-card
            group="options"
            value="option2"
            title="Option 2"
            description="Second choice description"
            @change=${updateSelection}
          ></col-radio-card>
          <col-radio-card
            group="options"
            value="option3"
            title="Option 3"
            description="Third choice description"
            @change=${updateSelection}
          ></col-radio-card>
        </div>
      </div>
    `;
  },
};
