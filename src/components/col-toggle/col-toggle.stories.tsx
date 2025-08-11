import { html } from 'lit';
import { fn } from '@storybook/test';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  name: string;
  checked: boolean;
  disabled: boolean;
  labelLeft: boolean;
  onClick: () => void;
};

const meta = {
  title: 'Atoms/Toggle',
  component: 'col-toggle',
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
      description: 'Name of the toggle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
        category: 'core',
      },
    },
    checked: {
      control: 'boolean',
      description: 'Controls the checked state of the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'checked', neq: false },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'core',
      },
      if: { arg: 'disabled', neq: false },
    },
    labelLeft: {
      control: 'boolean',
      description: 'Enables the label to be positioned on the left side of the toggle',
      table: {
        type: { summary: 'boolean' },
        category: 'core',
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'labelLeft', neq: false },
    },
    onClick: {
      action: 'clicked',
      description: 'Fired when the toggle state changes.',
      table: {
        category: 'Events',
        type: { summary: '{ checked: boolean }' },
      },
    },
  },
  args: {
    name: 'toggle',
    checked: false,
    disabled: false,
    labelLeft: false,
    onClick: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ name, checked, disabled, labelLeft }) => html`
    <col-toggle
      name=${name}
      ?checked=${checked}
      ?disabled=${disabled}
      ?labelLeft=${labelLeft}
    ></col-toggle>
  `,
};
