import { html, nothing } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString, disableControls, getDisabledControlsForVariant } from '@/utils';
import {
  TYPOGRAPHY_VARIANTS,
  TYPOGRAPHY_ELEMENTS,
  TYPOGRAPHY_DISPLAY_SIZES,
  ALIGNMENTS,
  STATES,
} from '@telesign/colibri';

type StoryArgs = {
  text: string;
  variant: TYPOGRAPHY_VARIANTS | '';
  element: TYPOGRAPHY_ELEMENTS | '';
  size: TYPOGRAPHY_DISPLAY_SIZES | '';
  state: STATES | '';
  align: ALIGNMENTS | '';
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
      options: Object.values(TYPOGRAPHY_VARIANTS),
      description: 'The variant of the typography for styling the text.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: TYPOGRAPHY_VARIANTS.DISPLAY },
        category: 'Core',
      },
    },
    element: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_ELEMENTS),
      description:
        'Defines the HTML element. For `heading` variant, the text size adjusts to the HTML heading level (`h1` through `h6`).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: TYPOGRAPHY_ELEMENTS.P },
        category: 'Core',
      },
    },
    size: {
      control: 'select',
      options: Object.values(TYPOGRAPHY_DISPLAY_SIZES),
      description:
        'The size of the typography. For `display` variant all options are available (`xl`, `lg`, `md`, `sm`), while for `link` variant only `md` and `sm` are available.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: TYPOGRAPHY_DISPLAY_SIZES.MEDIUM },
        category: 'Core',
      },
    },
    align: {
      control: 'select',
      options: Object.values(ALIGNMENTS),
      description: 'The text alignment.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ALIGNMENTS.START },
        category: 'Styling',
      },
    },
    state: {
      control: 'select',
      options: Object.values(STATES),
      description: 'The state of the typography. Only available for a `helper` variant.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: STATES.DEFAULT },
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
      description: 'URL when the typography is a `link` variant.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'https://example.com' },
        category: 'Link',
      },
    },
    newTab: {
      control: 'boolean',
      description: 'Opens the `link` in a new tab.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Link',
      },
    },
    downloadable: {
      control: 'boolean',
      description: 'Makes the `link` download a file.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Link',
      },
    },
    downloadFilename: {
      control: 'text',
      description: 'Suggested filename when downloading a file from the `link` variant.',
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
        'Size of the slotted icon, mapping to the `size` prop of the `Icon` component. Only available for `heading`, `subheading`, and `label` variants. Refer to [Icon documentation](./?path=/docs/atoms-icons--overview) for more details.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '12px' },
        category: 'Slots',
      },
    },
    iconName: {
      control: 'text',
      description:
        'Name of the slotted icon mapping to the `name` prop of the `Icon` component. Only available for `heading`, `subheading`, and `label` variants. Refer to [Icon documentation](./?path=/docs/atoms-icons--overview) for more details.',
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
    variant: TYPOGRAPHY_VARIANTS.DISPLAY,
    element: TYPOGRAPHY_ELEMENTS.P,
    size: TYPOGRAPHY_DISPLAY_SIZES.MEDIUM,
    state: STATES.DEFAULT,
    align: ALIGNMENTS.START,
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
    variant: TYPOGRAPHY_VARIANTS.HEADING,
    element: TYPOGRAPHY_ELEMENTS.H1,
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
    variant: TYPOGRAPHY_VARIANTS.HEADING,
    element: TYPOGRAPHY_ELEMENTS.H1,
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
    variant: TYPOGRAPHY_VARIANTS.SUBHEADING,
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
    variant: TYPOGRAPHY_VARIANTS.SUBHEADING,
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
    variant: TYPOGRAPHY_VARIANTS.DISPLAY,
    size: TYPOGRAPHY_DISPLAY_SIZES.EXTRA_LARGE,
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
    variant: TYPOGRAPHY_VARIANTS.LABEL,
    element: TYPOGRAPHY_ELEMENTS.LABEL,
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
    variant: TYPOGRAPHY_VARIANTS.LABEL,
    element: TYPOGRAPHY_ELEMENTS.LABEL,
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
    variant: TYPOGRAPHY_VARIANTS.LABEL,
    element: TYPOGRAPHY_ELEMENTS.LABEL,
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
    variant: TYPOGRAPHY_VARIANTS.LABEL,
    element: TYPOGRAPHY_ELEMENTS.LABEL,
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
    variant: TYPOGRAPHY_VARIANTS.HELPER,
    state: STATES.DEFAULT,
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
    variant: TYPOGRAPHY_VARIANTS.HELPER,
    state: STATES.ERROR,
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
    variant: TYPOGRAPHY_VARIANTS.LINK,
    element: TYPOGRAPHY_ELEMENTS.A,
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
    variant: TYPOGRAPHY_VARIANTS.LINK,
    element: TYPOGRAPHY_ELEMENTS.A,
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
    variant: TYPOGRAPHY_VARIANTS.LINK,
    element: TYPOGRAPHY_ELEMENTS.A,
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
    variant: TYPOGRAPHY_VARIANTS.CAPTION,
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
    variant: TYPOGRAPHY_VARIANTS.CODE,
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
    variant: TYPOGRAPHY_VARIANTS.DISPLAY,
    ellipsis: true,
    maxLines: 2,
  },
  argTypes: disableControls(...getDisabledControlsForVariant('display')),
  render: (args, context) => html`
    <div style="width: 400px">${renderTypography(args, context)}</div>
  `,
};
