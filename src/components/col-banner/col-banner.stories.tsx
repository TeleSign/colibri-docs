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
