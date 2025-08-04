import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { fn } from '@storybook/test';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';
import { BANNER_VARIANTS, getEnumValues } from '@telesign/colibri';

type StoryArgs = {
  variant: string;
  duration?: number;
  onBannerClosed: () => void;
};

const variantSummary = Object.values(BANNER_VARIANTS)
  .map(variant => `'${variant}'`)
  .join(' | ');

const meta = {
  title: 'Atoms/Banner',
  component: 'col-banner',
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
      options: getEnumValues(BANNER_VARIANTS),
      description: 'The visual variant of the banner.',
      table: {
        category: 'Core',
        type: {
          summary: variantSummary,
        },
        defaultValue: { summary: 'info' },
      },
      if: { arg: 'variant', neq: '' },
    },
    duration: {
      control: 'number',
      description:
        'The banner visibility time before it automatically closes. **If not specified the banner never closes**',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
      },
      if: { arg: 'duration', neq: '' },
    },
    onBannerClosed: {
      action: 'banner-closed',
      description: 'Event fired when banner is removed',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    variant: 'info',
    onBannerClosed: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

export const Default: Story = {
  render: ({ variant, duration, onBannerClosed }) =>
    html` <col-banner
      variant=${variant}
      duration=${ifDefined(duration)}
      @banner-closed=${onBannerClosed}
    >
      <span slot="title">Title</span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      <col-group slot="actions">
        <col-button color="primary" variant="outlined"> Button </col-button>
        <col-button color="primary" variant="plain"> Button </col-button>
      </col-group>
    </col-banner>`,
};

export const OnlyContent: Story = {
  args: {
    variant: 'success',
  },
  render: args =>
    html`<col-banner
      variant=${args.variant}
      duration=${ifDefined(args.duration)}
      @banner-closed=${args.onBannerClosed}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </col-banner>`,
};

export const WithContentActions: Story = {
  args: {
    variant: 'warning',
  },
  render: args =>
    html`<col-banner
      variant=${args.variant}
      duration=${ifDefined(args.duration)}
      @banner-closed=${args.onBannerClosed}
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      <div slot="actions">
        <col-button variant="plain"> Accept </col-button>
        <col-button color="danger"> Decline </col-button>
      </div>
    </col-banner>`,
};

export const WithTitleContentActions: Story = {
  args: {
    variant: 'danger',
  },
  parameters: {
    __sb: {
      width: '250px',
    },
  },
  render: args =>
    html`<col-banner
      variant=${args.variant}
      duration=${ifDefined(args.duration)}
      @banner-closed=${args.onBannerClosed}
    >
      <span slot="title">Longer Title</span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
      <col-group slot="actions">
        <col-button color="danger"> Delete </col-button>
        <col-button variant="plain"> Cancel </col-button>
      </col-group>
    </col-banner>`,
};
