import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type TooltipPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

type StoryArgs = {
  multiline: boolean;
  width: number;
  position: TooltipPosition;
  hideArrow: boolean;
  distance: number;
  disabled: boolean;
  showOnClick: boolean;
  triggerText: string;
  tooltipText: string;
  showIcon: boolean;
  iconName: string;
};

const meta = {
  title: 'Overlays/Tooltip',
  component: 'col-tooltip',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
    __sb: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description:
        'The preferred position of the tooltip. Supports 12 placements from FloatingUI with automatic flip/shift at viewport edges.',
      table: {
        type: {
          summary:
            'top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end',
        },
        defaultValue: { summary: 'bottom' },
        category: 'Core',
      },
    },
    width: {
      control: 'number',
      description: 'The width of the tooltip in pixels. Works with multiline content.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
        category: 'Core',
      },
    },
    multiline: {
      control: 'boolean',
      description: 'Whether the tooltip supports multiline content.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Core',
      },
      if: { arg: 'multiline', neq: false },
    },
    hideArrow: {
      control: 'boolean',
      description: 'Whether to hide the tooltip arrow.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
      if: { arg: 'hideArrow', neq: false },
    },
    distance: {
      control: 'number',
      description: 'Distance in pixels between the tooltip and trigger element (offset).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '8' },
        category: 'Core',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled (prevents showing).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
      if: { arg: 'disabled', neq: false },
    },
    showOnClick: {
      name: 'showonclick',
      control: 'boolean',
      description:
        'Whether to enable click-to-toggle behavior. Useful for touch devices or when trigger has no other click action.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Behavior',
      },
      if: { arg: 'showOnClick', neq: false },
    },
    triggerText: {
      control: 'text',
      description: 'The trigger button text. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        disable: true,
      },
      if: { arg: 'triggerText', neq: '' },
    },
    tooltipText: {
      control: 'text',
      description: 'The tooltip content text. **Storybook control only, not a component prop.**',
      table: {
        category: 'Storybook',
        disable: true,
      },
      if: { arg: 'tooltipText', neq: '' },
    },
  },
  args: {
    position: 'bottom',
    width: 300,
    multiline: true,
    hideArrow: false,
    distance: 8,
    disabled: false,
    showOnClick: false,
    triggerText: 'Hover Me',
    tooltipText: '',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderTooltip: Story['render'] = args => html`
  <col-tooltip
    width=${args.width}
    position=${args.position}
    distance=${args.distance}
    ?multiline=${args.multiline}
    ?hideArrow=${args.hideArrow}
    ?disabled=${args.disabled}
    ?showOnClick=${args.showOnClick}
  >
    <col-button variant="default" color="primary">
      ${html`<col-icon name="info-circle"></col-icon>`} ${args.triggerText}
    </col-button>
    <div slot="tooltip-content">${args.tooltipText}</div>
  </col-tooltip>
`;

/**
 * Default story showing a tooltip with all controls.
 */
export const Default: Story = {
  args: {
    tooltipText: 'Tooltip message very very large in order to see multiline',
  },
  render: renderTooltip,
};

/**
 * Single-line tooltip triggered on hover
 */
export const SinglelineTooltipHover: Story = {
  args: {
    position: 'bottom',
    multiline: false,
    tooltipText: 'Tooltip message',
  },
  render: renderTooltip,
};

/**
 * Tooltip with keyboard accessibility (focus/blur)
 */
export const KeyboardAccessibility: Story = {
  args: {
    position: 'left',
    multiline: false,
    triggerText: 'Press Tab to focus',
    tooltipText: 'Tooltip shows on focus, hides on blur',
  },
  render: renderTooltip,
};

/**
 * Large tooltip with extended width
 */
export const MultilineTooltipLargeText: Story = {
  args: {
    position: 'top',
    multiline: true,
    width: 500,
    tooltipText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  render: renderTooltip,
};

/**
 * Tooltip with extended placement options (top-start)
 */
export const ExtendedPosition: Story = {
  args: {
    position: 'top-start',
    multiline: true,
  },
  render: args => html`
    <col-tooltip
      width=${args.width}
      position=${args.position}
      distance=${args.distance}
      ?multiline=${args.multiline}
      ?hideArrow=${args.hideArrow}
      ?disabled=${args.disabled}
      ?showOnClick=${args.showOnClick}
    >
      <col-button variant="default" color="primary">
        ${html`<col-icon name="info-circle"></col-icon>`} ${args.triggerText}
      </col-button>
      <div slot="tooltip-content">
        ${`This tooltip uses ${args.position} position. Try other extended positions like "bottom-end", "left-start", etc.`}
      </div>
    </col-tooltip>
  `,
};

/**
 * Tooltip without arrow
 */
export const WithoutArrow: Story = {
  args: {
    position: 'bottom',
    hideArrow: true,
    tooltipText: 'This tooltip has no arrow',
  },
  render: renderTooltip,
};

/**
 * Tooltip with custom distance from trigger
 */
export const CustomDistance: Story = {
  args: {
    position: 'right',
    distance: 20,
    tooltipText: 'This tooltip is 20px away from the trigger',
  },
  render: renderTooltip,
};

/**
 * Disabled tooltip (won't show on hover/click/focus)
 */
export const DisabledTooltip: Story = {
  args: {
    position: 'bottom',
    disabled: true,
    triggerText: 'Disabled Tooltip',
    tooltipText: "This tooltip is disabled and won't show",
  },
  render: renderTooltip,
};

/**
 * Click-to-toggle tooltip (useful for touch devices or when trigger has no other click action)
 */
export const ClickToToggle: Story = {
  args: {
    position: 'bottom',
    showOnClick: true,
    triggerText: 'Click to Toggle',
    tooltipText: 'Click the button to show/hide this tooltip',
  },
  render: renderTooltip,
};
