import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type StoryArgs = {
  open: Boolean;
  disabled: Boolean;
  align: 'start' | 'end';
};

const meta = {
  title: 'Atoms/Dropdown',
  component: 'col-dropdown',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'State declaring if the dropdown is open by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a dropdown is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Determines the aligment of the content displayed inside the dropdown',
      table: {
        type: {
          summary: `'start' | 'end'`,
        },
        defaultValue: { summary: 'end' },
        category: 'Core',
      },
    },
  },
  args: {
    disabled: false,
    open: false,
    align: 'start',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ disabled, open, align }) => html`
    <col-dropdown ?open=${open} ?disabled=${disabled} align=${align}>
      <button slot="trigger">Toggle</button>
      <div>Content</div>
    </col-dropdown>
  `,
};

export const DefaultWithComponents: Story = {
  render: ({ disabled, open, align }) => html`
    <div style="height: 150px;">
      <col-dropdown ?open=${open} ?disabled=${disabled} align=${align}>
        <col-button color="primary" slot="trigger">
          Dropdown
          <col-icon name="chevron-down"></col-icon>
        </col-button>
        <ul>
          <p>Content 1</p>
          <p>Content 2</p>
          <p>Content 3</p>
        </ul>
      </col-dropdown>
    </div>
  `,
};

export const SmallListItems: Story = {
  args: {
    open: true,
    disabled: false,
    align: 'end',
  },
  render: args => html`
    <div style="height: 100px; margin-left: 45%;">
      <col-dropdown ?open=${args.open} ?disabled=${args.disabled} align=${args.align}>
        <col-button color="primary" slot="trigger">
          Click me
          <col-icon name="chevron-down"></col-icon>
        </col-button>
        <p>Content 1</p>
      </col-dropdown>
    </div>
  `,
};

export const MediumListItems: Story = {
  args: {
    open: true,
    disabled: true,
    align: 'start',
  },
  render: args => html`
    <div style="height: 270px;">
      <col-dropdown ?open=${args.open} ?disabled=${args.disabled} align=${args.align}>
        <col-button color="default" slot="trigger"> Button with large text and no Icon </col-button>
        <ul>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Content 1</p>
          <p>consectetur adipiscing elit</p>
          <p>Content 2</p>
          <p>sed do eiusmod tempor incididunt ut labore</p>
          <p>Content 3</p>
        </ul>
      </col-dropdown>
    </div>
  `,
};

export const Disabled: Story = {
  args: {
    open: false,
    disabled: true,
    align: 'end',
  },
  render: args => html`
    <col-dropdown ?open=${args.open} ?disabled=${args.disabled} align=${args.align}>
      <col-button color="success" slot="trigger"> Toogle </col-button>
    </col-dropdown>
  `,
};
