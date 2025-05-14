import { html, nothing } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString, disableControls, getDisabledControlsForVariant } from '@/utils';

type StoryArgs = {
  text: string;
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
  iconVisible: boolean;
  iconSize: string;
  iconName?: string;
};

const SampleText = 'Lorem ipsum dolor sit amet';

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
    text: {
      control: 'text',
      description: 'The text to display in the typography.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: SampleText },
        category: 'Core',
      },
    },
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
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'a',
        'div',
        'kbd',
        'span',
        'code',
        'label',
        'caption',
      ],
      description:
        'Defines the HTML element. For `heading` variant, the text size adjusts to the HTML heading level (`h1` through `h6`).',
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
        'The size of the typography. Only available for `display` and `link` variants (options: `extra-large`, `large`, `medium`, `small`).',
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
      description: 'The state of the typography. Only available for a `helper` variant.',
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
        'Sets the typography to a disabled state. Only available for a `label` and `link` variants.',
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
        defaultValue: { summary: 'https://example.com' },
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
        defaultValue: { summary: 'example.pdf' },
        category: 'Link',
      },
    },
    iconVisible: {
      control: 'boolean',
      description:
        'Controls visibility of the icon in the slot, solely for documentation preview purposes, **not a component prop.**',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Slots',
      },
    },
    iconSize: {
      control: 'text',
      description:
        'Size of the slotted icon, mapping to the `size` prop of the `Icon` component. Only available for `heading`, `subheading`, and `label` variants. Refer to [Icon documentation](../?path=/docs/atoms-icons--overview) for more details.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '12px' },
        category: 'Slots',
      },
    },
    iconName: {
      control: 'text',
      description:
        'Name of the slotted icon mapping to the `name` prop of the `Icon` component. Only available for `heading`, `subheading`, and `label` variants. Refer to [Icon documentation](../?path=/docs/atoms-icons--overview) for more details.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info-circle' },
        category: 'Slots',
      },
    },
  },
  args: {
    text: '',
    variant: '',
    element: '',
    size: '',
    state: '',
    align: '',
    required: false,
    disabled: false,
    ellipsis: false,
    maxLines: undefined,
    href: '',
    newTab: false,
    downloadable: false,
    downloadFilename: '',
    iconVisible: false,
    iconSize: '',
    iconName: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Reusable render function for typography component
 */
const renderTypography: Story['render'] = args => html`
  <col-typography
    variant=${args.variant}
    element=${args.element || nothing}
    size=${args.size || nothing}
    state=${args.state || nothing}
    align=${args.align || nothing}
    maxLines=${args.maxLines || nothing}
    href=${args.href || nothing}
    downloadFilename=${args.downloadFilename || nothing}
    ?newTab=${args.newTab}
    ?downloadable=${args.downloadable}
    ?required=${args.required}
    ?disabled=${args.disabled}
    ?ellipsis=${args.ellipsis}
  >
    ${args.text}
    ${args.iconVisible
      ? html` <col-icon slot="icon" name=${args.iconName} size=${args.iconSize}></col-icon>`
      : nothing}
  </col-typography>
`;

/**
 * Default typography with adjustable controls
 */
export const Default: Story = {
  args: {
    text: SampleText,
    variant: 'display',
    element: 'p',
    size: 'medium',
    state: 'default',
    align: 'start',
    iconVisible: true,
    iconName: 'info-circle',
    iconSize: '20px',
  },
  render: renderTypography,
};

/**
 * Standard heading variant for page titles and section headers
 */
export const Heading: Story = {
  args: {
    text: SampleText,
    variant: 'heading',
    element: 'h1',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('heading')),
  render: renderTypography,
};

/**
 * Heading with informational icon
 */
export const HeadingWithIcon: Story = {
  args: {
    text: SampleText,
    variant: 'heading',
    element: 'h1',
    iconVisible: true,
    iconName: 'info-circle',
    iconSize: '30px',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('heading', true)),
  render: renderTypography,
};

/**
 * Subheading for section subtitles
 */
export const Subheading: Story = {
  args: {
    text: SampleText,
    variant: 'subheading',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('subheading')),
  render: renderTypography,
};

/**
 * Subheading with informational icon
 */
export const SubheadingWithIcon: Story = {
  args: {
    text: SampleText,
    variant: 'subheading',
    iconVisible: true,
    iconName: 'info-circle',
    iconSize: '12px',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('subheading', true)),
  render: renderTypography,
};

/**
 * Display variant for large, prominent text elements
 */
export const Display: Story = {
  args: {
    text: SampleText,
    variant: 'display',
    size: 'extra-large',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('display')),
  render: renderTypography,
};

/**
 * Label variant for form fields
 */
export const Label: Story = {
  args: {
    text: SampleText,
    variant: 'label',
    element: 'label',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('label')),
  render: renderTypography,
};

/**
 * Label with informational icon
 */
export const LabelWithIcon: Story = {
  args: {
    text: SampleText,
    variant: 'label',
    element: 'label',
    iconVisible: true,
    iconName: 'info-circle',
    iconSize: '12px',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('label', true)),
  render: renderTypography,
};

/**
 * Label with required indicator
 */
export const LabelWithRequiredIndicator: Story = {
  args: {
    text: SampleText,
    variant: 'label',
    element: 'label',
    required: true,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('label')),
  render: renderTypography,
};

/**
 * Label in disabled state
 */
export const LabelWithDisabledState: Story = {
  args: {
    text: SampleText,
    variant: 'label',
    element: 'label',
    disabled: true,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('label')),
  render: renderTypography,
};

/**
 * Helper text for providing additional context
 */
export const Helper: Story = {
  args: {
    text: SampleText,
    variant: 'helper',
    state: 'default',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('helper')),
  render: renderTypography,
};

/**
 * Helper text in error state
 */
export const HelperWithError: Story = {
  args: {
    text: SampleText,
    variant: 'helper',
    state: 'error',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('helper')),
  render: renderTypography,
};

/**
 * Link for interactive text elements
 */
export const Link: Story = {
  args: {
    text: SampleText,
    variant: 'link',
    element: 'a',
    href: 'https://example.com',
    newTab: true,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('link')),
  render: renderTypography,
};

/**
 * Link in disabled state
 */
export const LinkWithDisabledState: Story = {
  args: {
    text: SampleText,
    variant: 'link',
    element: 'a',
    href: 'https://example.com',
    disabled: true,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('link')),
  render: renderTypography,
};

/**
 * Link with download functionality
 */
export const LinkWithDownloadFilename: Story = {
  args: {
    text: SampleText,
    variant: 'link',
    element: 'a',
    href: '/assets/example.pdf',
    downloadable: true,
    downloadFilename: 'example.pdf',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('link')),
  render: renderTypography,
};

/**
 * Caption for smaller supporting text
 */
export const Caption: Story = {
  args: {
    text: SampleText,
    variant: 'caption',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('caption')),
  render: renderTypography,
};

/**
 * Code for displaying inline code snippets
 */
export const Code: Story = {
  args: {
    text: SampleText,
    variant: 'code',
  },
  argTypes: disableControls(...getDisabledControlsForVariant('code')),
  render: renderTypography,
};

/**
 * Demonstrates text truncation with ellipsis
 */
export const TextTruncation: Story = {
  args: {
    text: 'This is a very long text that demonstrates truncation with ellipsis when content exceeds the specified number of lines. The text will be cut off and an ellipsis will be shown at the end.',
    variant: 'display',
    ellipsis: true,
    maxLines: 2,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('display')),
  render: (args, context) => html`
    <div style="width: 400px">${renderTypography(args, context)}</div>
  `,
};
