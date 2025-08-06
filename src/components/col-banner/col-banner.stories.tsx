import { html, nothing, render } from 'lit';
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
  title: 'Molecules/Banner',
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
        <col-button color="primary" variant="plain"> Button </col-button>
        <col-button color="primary" variant="outlined"> Button </col-button>
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
        <col-button variant="plain"> Accept </col-button>
        <col-button color="danger"> Delete </col-button>
      </col-group>
    </col-banner>`,
};

export const WithDuration: Story = {
  args: {
    variant: 'info',
    duration: 10,
  },
  render: args =>
    html`<col-banner
      variant=${args.variant}
      duration=${ifDefined(args.duration)}
      @banner-closed=${args.onBannerClosed}
    >
      <span slot="title">Longer Title to see a very long banner displayed</span>
    </col-banner>`,
};

export const InteractiveExample: Story = {
  render: () => {
    let container: HTMLElement | null;
    let showInfoBanner = false;
    let showDangerBanner = false;
    let showSuccessBanner = false;

    const onSubmit = (e: Event) => {
      e.preventDefault();
      let form = document.getElementById('form1') as HTMLElement;
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        showDangerBanner = !showDangerBanner;
      } else {
        showInfoBanner = !showInfoBanner;
      }
      updateContent();
    };

    const submitResend = (e: Event) => {
      e.preventDefault();
      showInfoBanner = false;
      setTimeout(() => {
        showSuccessBanner = true;
        updateContent();
      }, 1000);
    };

    const updateContent = () => {
      if (container) {
        const content = html`<div>
          <h3>Change your Password</h3>
          ${showDangerBanner
            ? html`<col-banner variant="danger">
                <span slot="title">Error</span>
                <span>Please review the email you entered.</span>
              </col-banner>`
            : nothing}
          ${showSuccessBanner
            ? html`<col-banner variant="success">
                <span slot="title">Success</span>
                <span>Email resent to your mail successfully</span>
                <col-group slot="actions">
                  <col-button variant="plain"> Accept </col-button>
                </col-group>
              </col-banner>`
            : nothing}
          ${showInfoBanner
            ? html`<col-banner variant="info">
                <span slot="title">Information</span>
                <span>Please check your email inbox for a restore your password mail.</span>
                <div slot="actions">
                  <col-button variant="plain"> Accept </col-button>
                  <col-button color="primary" variant="outlined" @click=${submitResend}>
                    Resend
                  </col-button>
                </div>
              </col-banner>`
            : nothing}
          <form @submit=${onSubmit} id="form1" class="form-container">
            <col-text-field
              id="email"
              name="email"
              label="Email"
              input-type="text"
              value="john.doe@example.com"
              pattern="^\\S+@\\S+\\.\\S+$"
              error-message="Please enter a valid email address."
              validation-timing="input"
              helper="We will use this to restore your password."
            ></col-text-field>
            <col-group><col-button color="primary" type="submit">Send</col-button></col-group>
          </form>
        </div>`;
        render(content, container);
      }
    };

    const initialTemplate = html`<div class="story-container" style="width: 500px;"></div>`;

    setTimeout(() => {
      container = document.querySelector('.story-container');
      updateContent();
    }, 0);

    return initialTemplate;
  },
};
