import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
}

const meta = {
  title: 'Atoms/Radio Button',
  component: 'col-radio-button',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    argTypes: {
    }
  },
} satisfies ColibriStoryMeta<StoryArgs>

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: () =>
    html`
      <div>
        <col-radio-button></col-radio-button>
      </div>
    `
}

export const Label: Story = {
  render: () =>
    html`
      <div>
        <col-radio-button>With Label</col-radio-button>
      </div>
    `
}
