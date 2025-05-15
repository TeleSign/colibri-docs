import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  title: string;
  description: string;
  customContent: boolean;
}

const meta = {
  title: 'Atoms/CheckboxCard',
  component: 'col-checkbox-card',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    argTypes: {
      checked: {
        control: 'boolean',
        description: 'Controls the checked state of the checkbox card',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      disabled: {
        control: 'boolean',
        description: 'Disables the checkbox card',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
      title: {
        control: 'text',
        description: 'Title text for the checkbox card',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '""' },
        },
      },
      description: {
        control: 'text',
        description: 'Description text for the checkbox card',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '""' },
        },
      },
      customContent: {
        control: 'boolean',
        description: 'Enables custom content slot',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' },
        },
      },
    }
  },
  args: {
    checked: false,
    disabled: false,
    title: 'Card Title',
    description: 'Card description text',
    customContent: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ checked, disabled, title, description }) =>
    html`
      <div>
        <col-checkbox-card
          ?checked=${checked}
          ?disabled=${disabled}
          title=${title}
          description=${description}
        ></col-checkbox-card>
      </div>
    `
}

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: ({ checked, disabled, title, description }) =>
    html`
      <div>
        <col-checkbox-card
          ?checked=${checked}
          ?disabled=${disabled}
          title=${title}
          description=${description}
        ></col-checkbox-card>
      </div>
    `
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: ({ checked, disabled, title, description }) =>
    html`
      <div>
        <col-checkbox-card
          ?checked=${checked}
          ?disabled=${disabled}
          title=${title}
          description=${description}
        ></col-checkbox-card>
      </div>
    `
}

export const CustomContent: Story = {
  args: {
    customContent: true,
  },
  render: ({ checked, disabled, customContent }) =>
    html`
      <div>
        <col-checkbox-card
          ?checked=${checked}
          ?disabled=${disabled}
          ?customContent=${customContent}
        >
          <div style="padding: 8px 0;">
            <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
            <p style="margin: 0;">You can add any custom content here</p>
          </div>
        </col-checkbox-card>
      </div>
    `
}
