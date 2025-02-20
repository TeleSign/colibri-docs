import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

import { ColCard, getThemeVar, CARD_VARIANTS } from '@tls-ds/colibri';

export default {
  title: 'Components/Composition/Card',
  tags: ['autodocs'],
  component: 'col-card',
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(CARD_VARIANTS),
      description: 'Defines the card variant to be used',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: CARD_VARIANTS.MAIN,
        },
      },
    },
  },
  args: {
    variant: CARD_VARIANTS.MAIN,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#ccc' },
      ],
    },
  },
} as Meta;

export const Default: StoryFn<Partial<ColCard>> = ({ variant = CARD_VARIANTS.MAIN }) => {
  return html`
    <col-card variant=${variant}>
      <div class="header" slot="header">
        <col-icon
          name="fingerprint"
          color="${getThemeVar('colors.primary.color')}"
          size="28px"
        ></col-icon>
        <span>Digital Identity</span>
      </div>
      <div>A one-stop-shop to store and register communication content for different channels</div>
      <div slot="footer">
        <col-button>New Campaign</col-button>
      </div>
    </col-card>
  `;
};

export const Product: StoryFn<Partial<ColCard>> = () => {
  return html`
    <col-card variant="product">
      <div class="header" slot="header">
        <span>Product Name Pill</span>
        <span>Title</span>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
      <div slot="footer">
        <col-button variant="outlined" color="secondary" size="small">Secondary button</col-button>
      </div>
    </col-card>
  `;
};

export const Channel: StoryFn<Partial<ColCard>> = () => {
  return html`
    <col-card variant="channel">
      <div class="header" slot="header">
        <col-icon
          name="message"
          color="${getThemeVar('colors.black.color')}"
          size="20px"
        ></col-icon>
        <span>TAG</span>
        <span
          >Channel name
          <span
            ><col-icon
              name="check-circle"
              color="${getThemeVar('status.success.color')}"
              size="20px"
            ></col-icon>
            Active
          </span></span
        >
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </div>
      <div slot="footer">
        <col-button variant="outlined" color="secondary" size="small">Secondary button</col-button>
      </div>
    </col-card>
  `;
};
