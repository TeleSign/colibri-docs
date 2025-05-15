import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
}

const meta = {
  title: 'Atoms/Radio',
  component: 'col-radio',
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
        <col-radio></col-radio>
      </div>
    `
}

export const Label: Story = {
  render: () =>
    html`
      <div>
        <col-radio>With Label</col-radio>
      </div>
    `
}
