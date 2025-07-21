import { html, nothing } from 'lit';
import { action } from '@storybook/addon-actions';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { icons } from '@telesign/colibri-icons/icons-list';
import { getEnumValues, TAG_VARIANTS } from '@telesign/colibri';

type StoryArgs = {
  variant: string;
  text: string;
  disabled: boolean;
  readonly?: boolean;
  category?: string;
  draggable?: boolean;
  multiSelect: boolean;
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
        defaultValue: { summary: 'Option' },
      },
      if: { arg: 'text', neq: '' },
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
      if: { arg: 'disabled', neq: false },
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
      if: { arg: 'readonly', neq: false },
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
      if: { arg: 'multi-select', neq: false },
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
      action: 'remove',
      description: 'Fired when the component loses focus.',
      table: {
        category: 'Events',
        type: { summary: 'CustomEvent<{ value: string }>' },
      },
      if: { arg: 'remove', neq: false },
    },
  },
  args: {
    variant: 'gray',
    disabled: false,
    multiSelect: false,
    readonly: false,
    draggable: false,
    category: 'Default',
    onRemove: action('tag-selected'),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ disabled, variant, multiSelect, readonly, category, draggable, onRemove }) =>
    html` <col-tag
      category=${category}
      variant=${variant}
      ?disabled=${disabled}
      ?multi-select=${multiSelect}
      ?readonly=${readonly}
      ?draggable=${draggable}
      .onRemove=${onRemove}
    ></col-tag>`,
};
