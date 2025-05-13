import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { SampleText } from './col-typography.mdx';

type StoryArgs = {
  variant: string;
  element: string;
  size: string;
  state: string;
  align: string;
  required: boolean;
  disabled: boolean;
  ellipsis: boolean;
  maxLines: number;
  href: string;
  newTab: boolean;
  downloadable: boolean;
  downloadFilename: string;
  iconSize: string;
};

const meta = {
  title: 'Atoms/Typography',
  component: 'col-typography',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },

  argTypes: {
    variant: {
      control: 'select',
      options: ['caption', 'code', 'display', 'heading', 'helper', 'label', 'link', 'subheading'],
      description: 'The variant of the typography for styling the text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'display' },
        category: 'Core',
      },
    },
    element: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'label', 'div'],
      description: 'The HTML element to render.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'p' },
        category: 'Core',
      },
    },
    size: {
      control: 'select',
      options: ['extra-large', 'large', 'medium', 'small'],
      description:
        'The size of the typography. Only used with `heading`, `display` and `link` variants.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
        category: 'Core',
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'inherit'],
      description: 'The text alignment.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'start' },
        category: 'Styling',
      },
    },
    state: {
      control: 'select',
      options: ['default', 'error'],
      description: 'The state of the typography. Only used with `helper` variant.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
        category: 'Styling',
      },
    },
    required: {
      control: 'boolean',
      description: 'Shows a required indicator when used with `label` variant.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'Sets the typography to a disabled state. Only used with `label` and `link` variants.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    ellipsis: {
      control: 'boolean',
      description: 'Truncates text with an ellipsis when it overflows.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
    },
    maxLines: {
      control: 'number',
      description: 'Maximum number of lines to show before truncating with ellipsis.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Behavior',
      },
    },
    href: {
      control: 'text',
      description: 'URL when the typography is a link.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Link',
      },
    },
    newTab: {
      control: 'boolean',
      description: 'Opens the link in a new tab.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Link',
      },
    },
    downloadable: {
      control: 'boolean',
      description: 'Makes the link download a file.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Link',
      },
    },
    downloadFilename: {
      control: 'text',
      description: 'Suggested filename when downloading a file from the link.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Link',
      },
    },
    iconSize: {
      control: 'text',
      description: 'Size of the slotted icon.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '12px' },
        category: 'Slots',
      },
    },
  },
  args: {
    variant: 'heading',
    element: 'h1',
    size: 'large',
    state: 'default',
    align: 'start',
    required: false,
    disabled: false,
    ellipsis: true,
    maxLines: 1,
    href: '',
    newTab: false,
    downloadable: false,
    downloadFilename: '',
    iconSize: '12px',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: args => html`
    <col-typography
      variant=${args.variant}
      element=${args.element}
      align=${args.align}
      ?ellipsis=${args.ellipsis}
      >Hello World
    </col-typography>
  `,
};

export const Heading: Story = {
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element}>${SampleText}</col-typography>
  `,
};

export const HeadingWithIcon: Story = {
  args: {
    variant: 'heading',
    element: 'h1',
    iconSize: '30px',
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element}
      >${SampleText}
      <col-icon slot="icon" name="info-circle" size=${args.iconSize}></col-icon>
    </col-typography>
  `,
};

export const Subheading: Story = {
  args: {
    variant: 'subheading',
  },
  render: args => html` <col-typography variant=${args.variant}>${SampleText}</col-typography> `,
};

export const SubheadingWithIcon: Story = {
  args: {
    variant: 'subheading',
  },
  render: args => html`
    <col-typography variant=${args.variant}
      >${SampleText}
      <col-icon slot="icon" name="info-circle" size="12px"></col-icon>
    </col-typography>
  `,
};

export const Display: Story = {
  args: {
    variant: 'display',
    size: 'extra-large',
  },
  render: args => html`
    <col-typography variant=${args.variant} size=${args.size}>${SampleText}</col-typography>
  `,
};

export const Label: Story = {
  args: {
    variant: 'label',
    element: 'label',
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element}>${SampleText}</col-typography>
  `,
};

export const LabelWithIcon: Story = {
  args: {
    variant: 'label',
    element: 'label',
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element}
      >${SampleText}
      <col-icon slot="icon" name="info-circle" size="12px"></col-icon>
    </col-typography>
  `,
};

export const LabelWithRequiredIndicator: Story = {
  args: {
    variant: 'label',
    element: 'label',
    required: true,
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element} ?required=${args.required}
      >${SampleText}</col-typography
    >
  `,
};

export const LabelWithDisabledState: Story = {
  args: {
    variant: 'label',
    element: 'label',
    disabled: true,
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element} ?disabled=${args.disabled}
      >${SampleText}</col-typography
    >
  `,
};

export const Helper: Story = {
  args: {
    variant: 'helper',
    state: 'default',
  },
  render: args => html`
    <col-typography variant=${args.variant} state=${args.state}>${SampleText} </col-typography>
  `,
};

export const HelperWithError: Story = {
  args: {
    variant: 'helper',
    state: 'error',
  },
  render: args => html`
    <col-typography variant=${args.variant} state=${args.state}>${SampleText}</col-typography>
  `,
};

export const Link: Story = {
  args: {
    variant: 'link',
    element: 'a',
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element}>${SampleText}</col-typography>
  `,
};

export const LinkWithDisabledState: Story = {
  args: {
    variant: 'link',
    element: 'a',
    disabled: true,
  },
  render: args => html`
    <col-typography variant=${args.variant} element=${args.element} ?disabled=${args.disabled}
      >${SampleText}
    </col-typography>
  `,
};

export const Caption: Story = {
  args: {
    variant: 'caption',
  },
  render: args => html` <col-typography variant=${args.variant}>${SampleText} </col-typography> `,
};

export const Code: Story = {
  args: {
    variant: 'code',
  },
  render: args => html` <col-typography variant=${args.variant}>${SampleText} </col-typography> `,
};
