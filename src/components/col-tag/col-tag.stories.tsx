import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { getEnumValues, TAG_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  variant: string;
  text: string;
  disabled: Boolean;
  readonly?: Boolean;
  category?: string;
  draggable?: Boolean;
  multiSelect: Boolean;
  click: () => void;
  keydown: () => void;
  onRemove: () => void;
};

const meta = {
  title: 'Atoms/Tag',
  component: 'col-tag',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text label inside the tag.',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'Option' },
      },
      if: { arg: 'text', neq: '' },
    },
    category: {
      control: 'text',
      description: 'The category of the tag (it´s not displayed)',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'category', neq: '' },
    },
    variant: {
      control: 'select',
      options: getEnumValues(TAG_VARIANTS),
      description: 'The visual variant of the text field.',
      table: {
        category: 'Core',
        type: {
          summary: "'gray' | 'purple' | 'lime' | 'rose' | 'cobalt' | 'teal' | 'cyan' | 'orange' ",
        },
        defaultValue: { summary: 'gray' },
      },
      if: { arg: 'variant', neq: '' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tag.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readonly: {
      name: 'readonly',
      control: 'boolean',
      description: 'Makes the tag read only.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiSelect: {
      name: 'multi-select',
      control: 'boolean',
      description: 'Fires the styles to display a selected tag.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    draggable: {
      name: 'draggable',
      control: 'boolean',
      description: 'Enables to star and end the drag of the tag.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'draggable', neq: false },
    },
    onRemove: {
      action: 'removed',
      description: 'Fired when the component loses focus.',
      table: {
        category: 'State',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    click: {
      action: 'clicked',
      description: 'Fired when the component loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
    },
    keydown: {
      action: 'keydown',
      description: 'Fired when the component loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
  },
  args: {
    variant: 'gray',
    text: 'Option',
    disabled: false,
    multiSelect: false,
    readonly: false,
    draggable: false,
    category: 'Default',
    click: action('clicked'),
    keydown: action('keydown'),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderTagWithoutIcon: Story['render'] = args =>
  html`<col-tag
    text=${args.text}
    category=${args.category}
    variant=${args.variant}
    ?disabled=${args.disabled}
    ?multi-select=${args.multiSelect}
    ?readonly=${args.readonly}
    ?draggable=${args.draggable}
    @click=${args.click}
    @keydown=${args.keydown}
  ></col-tag>`;

const renderTagWithIcon: Story['render'] = args =>
  html`<col-tag
    text=${args.text}
    category=${args.category}
    variant=${args.variant}
    ?disabled=${args.disabled}
    ?multi-select=${args.multiSelect}
    ?readonly=${args.readonly}
    ?draggable=${args.draggable}
    @click=${args.multiSelect ? args.onRemove : args.click}
    @keydown=${args.keydown}
  >
    <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
  </col-tag>`;

export const Default: Story = {
  render: ({
    disabled,
    variant,
    text,
    multiSelect,
    readonly,
    category,
    draggable,
    click,
    keydown,
    onRemove,
  }) =>
    html` <col-tag
      text=${text}
      category=${category}
      variant=${variant}
      ?disabled=${disabled}
      ?multi-select=${multiSelect}
      ?readonly=${readonly}
      ?draggable=${draggable}
      @click=${multiSelect ? onRemove : click}
      @keydown=${keydown}
    ></col-tag>`,
};

export const WithCustomText: Story = {
  args: {
    text: 'Custom Option',
    variant: TAG_VARIANTS.COBALT,
    category: 'Custom Category',
  },
  render: renderTagWithoutIcon,
};

export const WithIcon: Story = {
  args: {
    text: 'New Custom Text',
    variant: TAG_VARIANTS.ROSE,
    category: 'Custom Category',
  },
  render: renderTagWithIcon,
};

export const TagGroup: Story = {
  args: {
    text: 'Custom Option',
    variant: TAG_VARIANTS.LIME,
    category: 'Custom Category',
  },
  render: args => html`
    <col-group role="listbox">
      <col-tag
        text=${args.text}
        category=${args.category}
        ?disabled=${args.disabled}
        variant=${args.variant}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
      >
      </col-tag>
      <col-tag
        text="Custom Option 2"
        category=${args.category}
        variant="cobalt"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
      >
      </col-tag>
    </col-group>
  `,
};

export const Variants: Story = {
  args: {
    text: 'Tag with variant ',
    category: 'Custom Category',
  },
  render: args => html`
    <col-group role="listbox">
      <col-tag
        text=${args.text + 'cobalt'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="cobalt"
      >
        <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon
      ></col-tag>
      <col-tag
        text=${args.text + 'orange'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="orange"
      >
      </col-tag>
      <col-tag
        text=${args.text + 'teal'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="teal"
      >
        <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon
      ></col-tag>
      <col-tag
        text=${args.text + 'rose'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="rose"
      >
      </col-tag>
    </col-group>
    <col-group role="group">
      <col-tag
        text=${args.text + 'cyan'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="cyan"
      >
      </col-tag>
      <col-tag
        text=${args.text + 'gray'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="gray"
        ><col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
      </col-tag>
      <col-tag
        text=${args.text + 'lime'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="lime"
      >
      </col-tag>
      <col-tag
        text=${args.text + 'purple'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multi-select=${args.multiSelect}
        category=${args.category}
        variant="purple"
        ><col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
      </col-tag>
    </col-group>
  `,
};

export const Disabled: Story = {
  args: {
    text: 'Tag disabled with variant ',
    category: 'Custom Category',
    variant: TAG_VARIANTS.PURPLE,
    disabled: true,
  },
  render: renderTagWithIcon,
};

export const MultiSelect: Story = {
  args: {
    text: 'Tag disabled with variant ',
    category: 'Custom Category',
    variant: TAG_VARIANTS.TEAL,
    multiSelect: true,
  },
  render: renderTagWithIcon,
};

export const ReadOnly: Story = {
  args: {
    text: 'Tag disabled with variant ',
    category: 'Custom Category',
    variant: TAG_VARIANTS.COBALT,
    readonly: true,
  },
  render: renderTagWithIcon,
};

export const Removal: Story = {
  args: {
    text: 'Tag disabled with variant ',
    category: 'Custom Category',
    variant: TAG_VARIANTS.ORANGE,
    onRemove: action('removed'),
  },
  render: renderTagWithIcon,
};
