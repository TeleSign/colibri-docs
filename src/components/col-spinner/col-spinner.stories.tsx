import { html, render as LitRenderer, nothing } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { SPINNER_SIZES } from '@telesign/colibri';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  accessibilityText: string;
  size: SPINNER_SIZES;
};

const meta = {
  title: 'Feedback/Spinner',
  component: 'col-spinner',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    accessibilityText: {
      name: 'accessibility-text',
      control: 'text',
      description: 'The text that is read on screen-readers to indicate loading/busy state',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
      },
    },
    size: {
      control: 'select',
      options: Object.values(SPINNER_SIZES),
      description: 'The size the spinner should be: 16, 24 or 48',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '16' },
      },
    },
  },
  args: {
    size: SPINNER_SIZES.SMALL,
    accessibilityText: 'Loading',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderSpinner: Story['render'] = ({ accessibilityText, size }) => html`
  <col-spinner accessibility-text=${accessibilityText} size=${size}></col-spinner>
`;

/**
 * Default story showing a small Spinner
 */
export const Default: Story = {
  render: ({ accessibilityText, size }) => html`
    <col-spinner size=${size} accessibility-text=${accessibilityText}></col-spinner>
  `,
};

/**
 * This story showcases a medium size ColSpinner
 */
export const MediumSpinner: Story = {
  render: renderSpinner,
  args: {
    size: SPINNER_SIZES.MEDIUM,
  },
};

/**
 * This story showcases a large size ColSpinner
 */
export const LargeSpinner: Story = {
  render: renderSpinner,
  args: {
    size: SPINNER_SIZES.LARGE,
  },
};

/**
 * This story showcases a ColSpinner in a ColButton
 */
export const ButtonWithSpinner: Story = {
  render: () => {
    let isLoading = false;
    const container = document.createElement('div');
    const load = () => {
      isLoading = true;
      update();

      setTimeout(() => {
        isLoading = false;
        update();
      }, 2000);
    };

    const update = () => {
      LitRenderer(
        html`
          <col-button
            name="load-button"
            color="primary"
            variant="outlined"
            ?disabled=${isLoading}
            @click=${load}
          >
            ${isLoading ? 'Loading...' : 'Get more results'}
            ${isLoading ? html`<col-spinner></col-spinner>` : nothing}
          </col-button>
        `,
        container
      );
    };

    update();
    return container;
  },
  parameters: {
    docs: {
      source: {
        code: `// in the JS file we add out state and event handler
    let isLoading = false;
    const load = () => {
      isLoading = true;
      update();

      setTimeout(() => {
        isLoading = false;
        update();
      }, 2000);
    };

    // html
    <col-button
        name="load-button"
        color="primary"
        variant="outlined"
        ?disabled=\${isLoading}
        @click=\${load}
    >
        \${isLoading ? 'Loading...' : 'Get more results'}
        \${isLoading ? html\`<col-spinner></col-spinner>\` : nothing}
    </col-button>`,
      },
    },
  },
};
