import { html, render } from 'lit';
import { fn } from '@storybook/test';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { getEnumValues, TAG_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  variant: string;
  text: string;
  disabled: boolean;
  readonly?: boolean;
  category?: string;
  draggable?: boolean;
  multiselect: boolean;
  onRemove?: () => void;
  onTagSelected?: () => void;
  onTagRemoved?: () => void;
};

const variantSummary = Object.values(TAG_VARIANTS)
  .map(variant => `'${variant}'`)
  .join(' | ');

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
          summary: variantSummary,
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
      control: 'boolean',
      description: 'Makes the tag read only.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiselect: {
      control: 'boolean',
      description: 'Fires the styles to display a selected tag.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    draggable: {
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
      action: 'tag-removed-callback',
      description: 'Callback function called when tag is removed via onRemove property',
      table: {
        category: 'Callback',
      },
    },
    onTagSelected: {
      action: 'tag-selected',
      description: 'Event fired when tag is selected',
      table: {
        category: 'Events',
      },
    },
    onTagRemoved: {
      action: 'tag-removed',
      description: 'Event fired when tag is removed',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    variant: 'gray',
    text: 'Option',
    disabled: false,
    multiselect: false,
    readonly: false,
    draggable: false,
    category: 'Default',
    onRemove: fn(),
    onTagSelected: fn(),
    onTagRemoved: fn(),
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
    ?multiselect=${args.multiselect}
    ?readonly=${args.readonly}
    ?draggable=${args.draggable}
    .onRemove=${args.onRemove}
    @tag-selected=${args.onTagSelected}
    @tag-removed=${args.onTagRemoved}
  ></col-tag>`;

const renderTagWithIcon: Story['render'] = args =>
  html`<col-tag
    text=${args.text}
    category=${args.category}
    variant=${args.variant}
    ?disabled=${args.disabled}
    ?multiselect=${args.multiselect}
    ?readonly=${args.readonly}
    ?draggable=${args.draggable}
    .onRemove=${args.onRemove}
    @tag-selected=${args.onTagSelected}
    @tag-removed=${args.onTagRemoved}
  >
    <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
  </col-tag>`;

export const Default: Story = {
  render: ({
    disabled,
    variant,
    text,
    multiselect,
    readonly,
    category,
    draggable,
    onRemove,
    onTagSelected,
    onTagRemoved,
  }) =>
    html` <col-tag
      text=${text}
      category=${category}
      variant=${variant}
      ?disabled=${disabled}
      ?multiselect=${multiselect}
      ?readonly=${readonly}
      ?draggable=${draggable}
      .onRemove=${onRemove}
      @tag-selected=${onTagSelected}
      @tag-removed=${onTagRemoved}
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
        ?multiselect=${args.multiselect}
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
      </col-tag>
      <col-tag
        text="Custom Option 2"
        category=${args.category}
        variant="cobalt"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
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
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="cobalt"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
        <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon
      ></col-tag>
      <col-tag
        text=${args.text + 'orange'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="orange"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
      </col-tag>
      <col-tag
        text=${args.text + 'teal'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="teal"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
        <col-icon slot="icon" name="emoji-circle" size="16px"></col-icon
      ></col-tag>
      <col-tag
        text=${args.text + 'rose'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="rose"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
      </col-tag>
    </col-group>
    <col-group role="group">
      <col-tag
        text=${args.text + 'cyan'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="cyan"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
      </col-tag>
      <col-tag
        text=${args.text + 'gray'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="gray"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
        ><col-icon slot="icon" name="emoji-circle" size="16px"></col-icon>
      </col-tag>
      <col-tag
        text=${args.text + 'lime'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="lime"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
      >
      </col-tag>
      <col-tag
        text=${args.text + 'purple'}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?multiselect=${args.multiselect}
        category=${args.category}
        variant="purple"
        .onRemove=${args.onRemove}
        @tag-selected=${args.onTagSelected}
        @tag-removed=${args.onTagRemoved}
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

export const multiselect: Story = {
  args: {
    text: 'Tag disabled with variant ',
    category: 'Custom Category',
    variant: TAG_VARIANTS.TEAL,
    multiselect: true,
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
  render: () => {
    let isRemoved = false;
    let container;
    const isInDocs = window.location.search.includes('viewMode=docs');

    const onRemove = () => {
      isRemoved = true;
      updateContent();
    };

    const updateContent = () => {
      if (container) {
        const newContent = isRemoved
          ? html`<col-group orientation="vertical">
              <col-typography variant="label" element="label">
                <col-icon slot="icon" name="check" size="12px"></col-icon>Tag removed successfully
              </col-typography>
              <col-button variant="primary" @click=${resetTag}>Restore Tag</col-button>
            </col-group>`
          : html`<col-tag
              variant="orange"
              text="Click my close button"
              .onRemove=${onRemove}
            ></col-tag>`;

        render(newContent, container);
      }
    };

    const resetTag = () => {
      isRemoved = false;
      updateContent();
    };

    const initialTemplate = html`<div class="story-container"></div>`;

    setTimeout(() => {
      container = document.querySelector('.story-container');
      updateContent();
    }, 0);

    return initialTemplate;
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(`<div class="story-container">
          isRemoved
          ? <col-group orientation="vertical">
              <col-typography variant="label" element="label">
                <col-icon slot="icon" name="check" size="12px"></col-icon>Tag removed successfully
              </col-typography>
              <col-button variant="primary" @click={resetTag}>Restore Tag</col-button>
            </col-group>
          : <col-tag variant="orange" text="Click my close button" .onRemove={onRemove} ></col-tag>
          </div>`),
      },
    },
  },
};
