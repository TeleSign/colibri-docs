import { html } from 'lit';
import { ColibriStory, ColibriStoryMeta } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  checked: boolean;
}

const meta = {
  title: 'Atoms/CheckboxCard',
  component: 'col-checkbox-card',
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
        <col-checkbox-card title="Title" description="This is a heading's page"></col-checkbox-card>
      </div>
    `
}

export const Checked: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox-card checked title="Title" description="This is a heading's page"></col-checkbox-card>
      </div>
    `
}

export const CustomContent: Story = {
  render: () =>
    html`
      <div>
        <col-checkbox-card customContent>
          <div style="padding: 8px 0;">
            <h3 style="margin: 0 0 8px 0;">Custom Content</h3>
            <p style="margin: 0;">You can add any custom content here</p>
          </div>
        </col-checkbox-card>
      </div>
    `
}
