import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
}

const meta = {
  title: 'Atoms/Checkbox',
  component: 'col-checkbox',
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
        <col-checkbox indeterminate></col-checkbox>
      </div>
    `
}

export const Label: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox>With Label</col-checkbox>
      </div>
    `
}

export const WithIcon: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox customLabel>
          <div slot="label">
            <col-icon name="emoji-circle"></col-icon>
            With icons
          </div>
        </col-checkbox>
      </div>
    `
}
