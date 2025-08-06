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
      description: 'Property declaring if the dropdown is open by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Property declaring if a dropdown is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
      if: { arg: 'disabled', neq: false },
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
    align: 'start',
    disabled: false,
    open: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  parameters: {
    __sb: {
      height: '150px',
    },
  },
  render: ({ disabled, open, align }) => html`
    <col-dropdown align=${align} ?open=${open} ?disabled=${disabled}>
      <col-button color="primary" slot="trigger">Toggle</col-button>
      <div>
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </div>
    </col-dropdown>
  `,
};

export const DefaultWithComponents: Story = {
  parameters: {
    __sb: {
      height: '150px',
    },
  },
  render: args => {
    const isInDocs = window.location.search.includes('viewMode=docs');

    return html`
      <col-dropdown align=${args.align} ?open=${args.open} ?disabled=${args.disabled}>
        <col-button color="primary" slot="trigger">
          Dropdown
          <col-icon name="chevron-down"></col-icon>
        </col-button>
        ${isInDocs
          ? html`<ul role="menuitem">
              <li>Content 1</li>
              <li>Content 2</li>
              <li>Content 3</li>
            </ul>`
          : html`<ul role="menuitem" style="padding-left: 30px;">
              <li>Content 1</li>
              <li>Content 2</li>
              <li>Content 3</li>
            </ul>`}
      </col-dropdown>
    `;
  },
};

export const SmallListItems: Story = {
  args: {
    open: true,
    disabled: false,
    align: 'end',
  },
  parameters: {
    __sb: {
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'start',
    },
  },
  render: args => html`
    <col-dropdown align=${args.align} ?open=${args.open} ?disabled=${args.disabled}>
      <col-button color="primary" slot="trigger">
        Click me
        <col-icon name="chevron-down"></col-icon>
      </col-button>
      <col-list-menu role="menuitem">
        <col-list-menu-item variant="button" value="content">Content</col-list-menu-item>
        <col-list-menu-item variant="button" value="extra-content"
          >Extra Content</col-list-menu-item
        >
      </col-list-menu>
    </col-dropdown>
  `,
};

export const ColibriComponents: Story = {
  args: {
    open: false,
    disabled: false,
    align: 'start',
  },
  parameters: {
    __sb: {
      height: '150px',
    },
  },
  render: args => html`
    <col-dropdown align=${args.align} ?open=${args.open} ?disabled=${args.disabled}>
      <col-button color="primary" slot="trigger">
        Hello! Click me
        <col-icon name="chevron-down"></col-icon>
      </col-button>
      <col-list-menu role="menuitem">
        <col-list-menu-item value="content">Content</col-list-menu-item>
        <col-list-menu-item value="extra-content">Extra Content</col-list-menu-item>
      </col-list-menu>
    </col-dropdown>
  `,
};

export const MediumListItems: Story = {
  args: {
    open: true,
    disabled: true,
    align: 'start',
  },
  parameters: {
    __sb: {
      height: '300px',
    },
  },
  render: args => html`
    <col-dropdown align=${args.align} ?open=${args.open} ?disabled=${args.disabled}>
      <col-button color="primary" slot="trigger"> Button with large text and no Icon </col-button>
      <ul role="menuitem">
        <p>Lorem ipsum dolor sit amet</p>
        <p>Content 1</p>
        <p>consectetur adipiscing elit</p>
        <p>Content 2</p>
        <p>sed do eiusmod tempor incididunt ut labore</p>
        <p>Content 3</p>
      </ul>
    </col-dropdown>
  `,
};

export const Disabled: Story = {
  args: {
    open: false,
    disabled: true,
    align: 'end',
  },
  render: args => html`
    <col-dropdown align=${args.align} ?open=${args.open} ?disabled=${args.disabled}>
      <col-button color="success" slot="trigger"> Toogle </col-button>
    </col-dropdown>
  `,
};
