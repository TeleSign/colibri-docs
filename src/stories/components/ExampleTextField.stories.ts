/**
 * This is an example story for Storybook documentation.
 * It demonstrates the usage patterns and documentation structure
 * that should be followed in the actual stories.
 *
 * @important
 * This is a temporary implementation for documentation purposes.
 * TODO: Delete this file once the real TextField component implementation begins.
 */

import { html } from 'lit';
import '@/common/ExampleTextField';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';

type StoryArgs = {
  type: 'text' | 'password';
  label: string;
  chartCount?: number;
  tokens?: Record<string, unknown>;
  theme: string;
  showIcons: boolean;
  showHelperText: boolean;
};

const meta = {
  title: 'Molecules/Example/TextField',
  component: 'example-text-field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
An example implementation of a text field component that demonstrates the expected API, styling capabilities, and behavior patterns.

**To be deleted once the real TextField component implementation begins.**
        `,
      },
      source: {
        excludeDecorators: true,
        transform: (code: string): string => {
          let transformedCode = code.replace(/<style>[\s\S]*?<\/style>\s*/, '');
          const lines = transformedCode.split('\n').filter(line => line.trim() !== '');
          if (lines.length === 0) {
            return transformedCode;
          }
          const firstLine = lines[0].trim();
          const lastLine = lines[lines.length - 1].trim();
          const innerLines = lines.slice(1, -1).map(line => '  ' + line.trim());
          return [firstLine, ...innerLines, lastLine].join('\n');
        },
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'Input type',
      table: {
        defaultValue: {
          summary: 'text',
        },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    chartCount: {
      control: 'number',
      description: 'Maximum number of characters allowed',
    },
    tokens: {
      control: 'object',
      description: 'Custom tokens for styling the component',
    },
    theme: {
      control: 'text',
      description: 'Theme mode for the component',
    },
    showIcons: {
      control: 'boolean',
      description: 'Flag to show icons in the component',
    },
    showHelperText: {
      control: 'boolean',
      description: 'Flag to show helper text',
    },
  },
  args: {
    type: 'text',
    label: 'Default Input',
    theme: 'light',
    showIcons: false,
    showHelperText: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

const renderTemplate = (args: StoryArgs) => html`
  <example-text-field
    type=${args.type}
    label=${args.label}
    .chartCount=${args.chartCount}
    mode=${args.theme}
    .tokens=${args.tokens}
  >
    ${args.showIcons
      ? html`
          <span slot="icon-left" class="icon-left">👈</span>
          <span slot="icon-right" class="icon-right">👉</span>
        `
      : ''}
    ${args.showHelperText ? html`<span slot="helper-text">Helper text</span>` : ''}
  </example-text-field>
`;

export const Default: ColibriStory<StoryArgs> = {
  render: renderTemplate,
};

export const WithCharacterCount: ColibriStory<StoryArgs> = {
  render: renderTemplate,
  args: {
    ...Default.args,
    chartCount: 100,
    showHelperText: false,
  },
};

export const Password: ColibriStory<StoryArgs> = {
  render: renderTemplate,
  args: {
    ...Default.args,
    type: 'password',
    showHelperText: false,
  },
};

export const WithIcons: ColibriStory<StoryArgs> = {
  render: renderTemplate,
  args: {
    ...Default.args,
    showIcons: true,
    showHelperText: false,
  },
};

export const WithHelperText: ColibriStory<StoryArgs> = {
  render: renderTemplate,
  args: {
    ...Default.args,
    showIcons: false,
    showHelperText: true,
  },
};

export const WithCustomTokens: ColibriStory<StoryArgs> = {
  render: renderTemplate,
  args: {
    ...Default.args,
    showIcons: false,
    showHelperText: false,
    tokens: {
      colors: {
        border: {
          default: '#ff69b4', // Hot pink
        },
        background: {
          default: '#fff0f5', // Light pink
        },
        text: {
          default: '#c71585', // Medium violet red
        },
        icon: {
          default: '#db7093', // Pale violet red
        },
        helper: {
          default: '#ff69b4', // Hot pink
        },
        label: {
          default: '#c71585', // Medium violet red
        },
      },
    },
  },
};
