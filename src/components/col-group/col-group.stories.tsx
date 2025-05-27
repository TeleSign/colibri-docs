import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';

type StoryArgs = {
  label: string;
  helper: string;
  role: string;
  orientation: 'horizontal' | 'vertical';
  withoutGap: boolean;
};

const meta = {
  title: 'Atoms/Group',
  component: 'col-group',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the group',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    role: {
      control: 'text',
      description: 'ARIA role for the group container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'group' },
      },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of grouped items',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    withoutGap: {
      control: 'boolean',
      description: 'Removes gap between grouped items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    label: '',
    helper: '',
    role: 'group',
    orientation: 'horizontal',
    withoutGap: false,
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

/**
 * Default horizontal group with buttons
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => html`
    <col-group
      .label=${args.label}
      .helper=${args.helper}
      .role=${args.role}
      .orientation=${args.orientation}
      .withoutGap=${args.withoutGap}
    >
      <col-button variant="primary">Save</col-button>
      <col-button variant="secondary">Cancel</col-button>
      <col-button variant="tertiary">Reset</col-button>
    </col-group>
  `,
};

/**
 * Vertical group with label and helper text
 */
export const VerticalWithLabel: Story = {
  args: {
    orientation: 'vertical',
    label: 'Notification Settings',
    helper: 'Choose how you want to receive notifications',
  },
  render: args => html`
    <col-group
      .label=${args.label}
      .helper=${args.helper}
      .role=${args.role}
      .orientation=${args.orientation}
      .withoutGap=${args.withoutGap}
    >
      <col-checkbox>Email notifications</col-checkbox>
      <col-checkbox>SMS notifications</col-checkbox>
      <col-checkbox>Push notifications</col-checkbox>
    </col-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-group
  orientation="vertical"
  label="Notification Settings"
  helper="Choose how you want to receive notifications"
>
  <col-checkbox>Email notifications</col-checkbox>
  <col-checkbox>SMS notifications</col-checkbox>
  <col-checkbox>Push notifications</col-checkbox>
</col-group>`,
      },
    },
  },
};

/**
 * Horizontal group without gaps between items
 */
export const WithoutGap: Story = {
  args: {
    withoutGap: true,
    orientation: 'horizontal',
  },
  render: args => html`
    <col-group
      .label=${args.label}
      .helper=${args.helper}
      .role=${args.role}
      .orientation=${args.orientation}
      .withoutGap=${args.withoutGap}
    >
      <col-checkbox-button>Day</col-checkbox-button>
      <col-checkbox-button>Week</col-checkbox-button>
      <col-checkbox-button>Month</col-checkbox-button>
      <col-checkbox-button>Year</col-checkbox-button>
    </col-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-group withoutGap>
      <col-checkbox-button>Day</col-checkbox-button>
      <col-checkbox-button>Week</col-checkbox-button>
      <col-checkbox-button>Month</col-checkbox-button>
      <col-checkbox-button>Year</col-checkbox-button>
</col-group>`,
      },
    },
  },
};

/**
 * Radio button group
 */
export const RadioGroup: Story = {
  args: {
    label: 'Select Plan',
    role: 'radiogroup',
    orientation: 'vertical',
    withoutGap: true,
  },
  render: args => html`
    <col-group
      .label=${args.label}
      .helper=${args.helper}
      .role=${args.role}
      .orientation=${args.orientation}
      .withoutGap=${args.withoutGap}
    >
      <col-radio-button name="plan" value="basic">Basic - $9/month</col-radio-button>
      <col-radio-button name="plan" value="pro">Pro - $19/month</col-radio-button>
      <col-radio-button name="plan" value="enterprise">Enterprise - Contact us</col-radio-button>
    </col-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-group
  label="Select Plan"
  role="radiogroup"
  orientation="vertical"
>
  <col-radio name="plan" value="basic">Basic - $9/month</col-radio>
  <col-radio name="plan" value="pro">Pro - $19/month</col-radio>
  <col-radio name="plan" value="enterprise">Enterprise - Contact us</col-radio>
</col-group>`,
      },
    },
  },
};

/**
 * Nested groups for complex layouts
 */
export const NestedGroups: Story = {
  args: {},
  render: () => html`
    <col-group orientation="vertical" label="Form Actions">
      <col-group orientation="horizontal">
        <col-button variant="primary">Submit</col-button>
        <col-button variant="secondary">Save Draft</col-button>
      </col-group>
      <col-group orientation="horizontal" helper="Additional options">
        <col-button variant="tertiary" size="small">Reset Form</col-button>
        <col-button variant="tertiary" size="small">Export Data</col-button>
      </col-group>
    </col-group>
  `,
  parameters: {
    docs: {
      source: {
        code: `<col-group orientation="vertical" label="Form Actions">
  <col-group orientation="horizontal">
    <col-button variant="primary">Submit</col-button>
    <col-button variant="secondary">Save Draft</col-button>
  </col-group>
  <col-group orientation="horizontal" helper="Additional options">
    <col-button variant="tertiary" size="small">Reset Form</col-button>
    <col-button variant="tertiary" size="small">Export Data</col-button>
  </col-group>
</col-group>`,
      },
    },
  },
};
