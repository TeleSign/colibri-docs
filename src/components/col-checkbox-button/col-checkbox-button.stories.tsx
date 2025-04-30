import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
}

const meta = {
  title: 'Atoms/CheckboxButton',
  component: 'col-checkbox-button',
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
        <col-checkbox-button></col-checkbox-button>
      </div>
    `
}

export const Label: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox-button label="With Label"></col-checkbox-button>
      </div>
    `
}

export const WithIcon: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox-button customLabel>
          <div slot="icon">
            <col-icon name="emoji-circle"></col-icon>
          </div>
          <span slot="label">With icons</span>
        </col-checkbox-button>
      </div>
    `
}
