import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
  disabled: boolean;
  title: string;
  description: string;
  customContent: boolean;
};

const meta = {
  title: 'Atoms/Checkbox Card',
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
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox card',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox card',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
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
      control: 'boolean',
      description: 'Enables custom content slot',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    checked: false,
    disabled: false,
    title: 'Card Title',
    description: 'Card description text',
    customContent: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderCheckboxCard: Story['render'] = args => html`
  <col-checkbox-card
    ?checked=${args.checked}
    ?disabled=${args.disabled}
    title=${args.title}
    description=${args.description}
  ></col-checkbox-card>
`;

export const Default: Story = {
  render: renderCheckboxCard,
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  render: renderCheckboxCard,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: renderCheckboxCard,
};

export const CustomContent: Story = {
  args: {
    customContent: true,
  },
  render: ({ checked, disabled, customContent }) => html`
    <col-checkbox-card ?checked=${checked} ?disabled=${disabled} ?customContent=${customContent}>
      <div style="padding: 8px 0;">
        <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
        <p style="margin: 0;">You can add any custom content here</p>
      </div>
    </col-checkbox-card>
  `,
};
