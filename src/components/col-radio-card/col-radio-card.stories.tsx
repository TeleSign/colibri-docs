import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  title: string;
  description: string;
  customContent: boolean;
  value: string;
  group: string;
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
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the radio card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    title: {
      control: 'text',
      description: 'Title text for the radio card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    description: {
      control: 'text',
      description: 'Description text for the radio card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    customContent: {
      control: 'boolean',
      description: 'Enables custom content slot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
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
    },
  },
  args: {
    checked: false,
    disabled: false,
    title: 'Card Title',
    description: 'Card description text',
    customContent: false,
    value: '',
    group: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ checked, disabled, title, description, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      title=${title}
      description=${description}
      value=${value}
    ></col-radio-card>
  `,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled, title, description, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      title=${title}
      description=${description}
      value=${value}
    ></col-radio-card>
  `,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ checked, disabled, title, description, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      title=${title}
      description=${description}
      value=${value}
    ></col-radio-card>
  `,
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: ({ checked, disabled, title, description, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      title=${title}
      description=${description}
      value=${value}
    ></col-radio-card>
  `,
};

export const WithCustomIcon: Story = {
  render: ({ checked, disabled, title, description, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      title=${title}
      description=${description}
      value=${value}
    >
      <col-icon name="emoji-circle" slot="checked-icon"></col-icon>
    </col-radio-card>
  `,
};

export const CustomContent: Story = {
  args: {
    customContent: true,
  },
  render: ({ checked, disabled, customContent, value }) => html`
    <col-radio-card
      ?checked=${checked}
      ?disabled=${disabled}
      ?customContent=${customContent}
      value=${value}
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
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 800px;">
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
    </div>
  `,
};

export const CustomContentGroup: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 800px;">
      <col-radio-card group="themes" value="light" checked customContent>
        <div style="padding: 16px 0; text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">☀️</div>
          <h3 style="margin: 0 0 8px 0;">Light Theme</h3>
          <p style="margin: 0;">Bright and clean interface</p>
        </div>
      </col-radio-card>
      <col-radio-card group="themes" value="dark" customContent>
        <div style="padding: 16px 0; text-align: center;">
          <div style="font-size: 24px; margin-bottom: 8px;">🌙</div>
          <h3 style="margin: 0 0 8px 0;">Dark Theme</h3>
          <p style="margin: 0;">Easy on the eyes at night</p>
        </div>
      </col-radio-card>
    </div>
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
      <div>
        <div style="margin-bottom: 16px;">
          <strong>Selected option: </strong><span id="selected-card-value">option1</span>
        </div>
        <div
          style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 800px;"
        >
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
