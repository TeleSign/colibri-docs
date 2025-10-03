import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type StoryArgs = {
  open: Boolean;
  disabled: Boolean;
  placement: 'start' | 'end';
  keepopen: Boolean;
};

const meta = {
  title: 'Actions/Dropdown',
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
    placement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Determines the placement of the content displayed inside the dropdown',
      table: {
        type: {
          summary: `'start' | 'end'`,
        },
        defaultValue: { summary: 'end' },
        category: 'Core',
      },
    },
    keepopen: {
      control: 'boolean',
      description: 'Whether the dropdown should stay open when an item is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
  },
  args: {
    placement: 'start',
    disabled: false,
    open: false,
    keepopen: false,
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
  render: ({ disabled, open, placement, keepopen }) => html`
    <col-dropdown placement=${placement} ?open=${open} ?disabled=${disabled} ?keepopen=${keepopen}>
      <col-button color="primary" slot="trigger">Toggle</col-button>
      <div role="menuitem">
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
      <col-dropdown placement=${args.placement} ?open=${args.open} ?disabled=${args.disabled}>
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
    placement: 'end',
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
    <col-dropdown
      placement=${args.placement}
      ?open=${args.open}
      ?disabled=${args.disabled}
      ?keepopen=${args.keepopen}
    >
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
    placement: 'start',
  },
  parameters: {
    __sb: {
      height: '150px',
    },
  },
  render: args => html`
    <col-dropdown
      placement=${args.placement}
      ?open=${args.open}
      ?disabled=${args.disabled}
      ?keepopen=${args.keepopen}
    >
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
    placement: 'start',
  },
  parameters: {
    __sb: {
      height: '300px',
    },
  },
  render: args => html`
    <col-dropdown
      placement=${args.placement}
      ?open=${args.open}
      ?disabled=${args.disabled}
      ?keepopen=${args.keepopen}
    >
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
    placement: 'end',
  },
  render: args => html`
    <col-dropdown placement=${args.placement} ?open=${args.open} ?disabled=${args.disabled}>
      <col-button color="success" slot="trigger"> Toogle </col-button>
    </col-dropdown>
  `,
};

export const AutoCloseDefault: Story = {
  tags: ['!dev'],
  args: {
    open: true,
    keepopen: false,
    placement: 'start',
  },
  parameters: {
    __sb: {
      height: '200px',
    },
  },
  render: args => html`
    <col-dropdown placement=${args.placement} ?open=${args.open} ?keepopen=${args.keepopen}>
      <col-button color="primary" slot="trigger">
        Auto-close Demo
        <col-icon name="chevron-down"></col-icon>
      </col-button>
      <ul>
        <li>Click me - will close dropdown</li>
        <li>Click me too - will also close</li>
        <p>Regular text - won't close dropdown</p>
      </ul>
    </col-dropdown>
  `,
};

export const KeepOpenDemo: Story = {
  tags: ['!dev'],
  args: {
    open: true,
    keepopen: true,
    placement: 'start',
  },
  parameters: {
    __sb: {
      height: '200px',
    },
  },
  render: args => html`
    <col-dropdown placement=${args.placement} ?open=${args.open} ?keepopen=${args.keepopen}>
      <col-button color="primary" slot="trigger">
        Keep Open Demo
        <col-icon name="chevron-down"></col-icon>
      </col-button>
      <ul>
        <li>Click me - stays open!</li>
        <li>Click me too - still open!</li>
        <p>Regular text - won't close either</p>
      </ul>
    </col-dropdown>
  `,
};

export const ColibriAutoClose: Story = {
  tags: ['!dev'],
  args: {
    open: true,
    keepopen: false,
    placement: 'start',
  },
  parameters: {
    __sb: {
      height: '200px',
    },
  },
  render: args => html`
    <col-dropdown placement=${args.placement} ?open=${args.open} ?keepopen=${args.keepopen}>
      <col-button color="primary" slot="trigger">
        Colibri Components
        <col-icon name="chevron-down"></col-icon>
      </col-button>
      <col-list-menu>
        <col-list-menu-item value="option1">Option 1 - closes via event</col-list-menu-item>
        <col-list-menu-item value="option2">Option 2 - closes via event</col-list-menu-item>
        <col-list-menu-item value="option3">Option 3 - closes via event</col-list-menu-item>
      </col-list-menu>
    </col-dropdown>
  `,
};
