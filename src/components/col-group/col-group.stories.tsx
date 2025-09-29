import { html, nothing, TemplateResult } from 'lit';
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
  title: 'Layouts/Group',
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
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'label', neq: '' },
    },
    helper: {
      control: 'text',
      description: 'Helper text displayed below the group',
      table: {
        category: 'Core',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
      if: { arg: 'helper', neq: '' },
    },
    role: {
      control: 'text',
      description: 'ARIA role for the group container',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'group' },
      },
      if: { arg: 'role', neq: 'group' },
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of grouped items',
      table: {
        category: 'Core',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
      if: { arg: 'orientation', neq: '' },
    },
    withoutGap: {
      name: 'withoutgap',
      control: 'boolean',
      description: 'Removes gap between grouped items',
      table: {
        category: 'Core',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      if: { arg: 'withoutGap', neq: false },
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

const renderGroup = (args: StoryArgs, children: TemplateResult[]) => html`
  <col-group
    label=${args.label || nothing}
    helper=${args.helper || nothing}
    role=${args.role || nothing}
    orientation=${args.orientation || nothing}
    ?withoutGap=${args.withoutGap}
  >
    ${children}
  </col-group>
`;

/**
 * Default horizontal group with buttons
 */
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    role: 'group',
  },
  render: args =>
    renderGroup(args, [
      html`<col-button variant="default" color="success">Save</col-button>
        <col-button variant="default" color="danger">Cancel</col-button>
        <col-button variant="default" color="primary">Reset</col-button>`,
    ]),
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
  render: args =>
    renderGroup(args, [
      html`<col-checkbox>Email notifications</col-checkbox>
        <col-checkbox>SMS notifications</col-checkbox>
        <col-checkbox>Push notifications</col-checkbox>`,
    ]),
};

/**
 * Horizontal group without gaps between items
 */
export const WithoutGap: Story = {
  args: {
    withoutGap: true,
    orientation: 'horizontal',
  },
  render: args =>
    renderGroup(args, [
      html`<col-checkbox-button>Day</col-checkbox-button>
        <col-checkbox-button>Week</col-checkbox-button>
        <col-checkbox-button>Month</col-checkbox-button>
        <col-checkbox-button>Year</col-checkbox-button>`,
    ]),
};

/**
 * Radio button group with proper ARIA role
 */
export const RadioGroup: Story = {
  args: {
    label: 'Select Plan',
    role: 'radiogroup',
    orientation: 'vertical',
    withoutGap: true,
  },
  render: args =>
    renderGroup(args, [
      html`<col-radio-button group="plan" value="basic">Basic - $9/month</col-radio-button>
        <col-radio-button group="plan" value="pro">Pro - $19/month</col-radio-button>
        <col-radio-button group="plan" value="enterprise"
          >Enterprise - Contact us</col-radio-button
        >`,
    ]),
};

/**
 * Nested groups for complex layouts
 */
export const NestedGroups: Story = {
  args: {
    orientation: 'vertical',
    label: 'Form Actions',
    helper: 'Additional options',
  },
  render: args => html`
    <col-group orientation=${args.orientation} label=${args.label} helper=${args.helper}>
      <col-group orientation="horizontal">
        <col-button variant="default" color="success">Submit</col-button>
        <col-button variant="default" color="primary">Save Draft</col-button>
      </col-group>
      <col-group orientation="horizontal">
        <col-button variant="default" color="danger" size="small">Reset Form</col-button>
        <col-button variant="default" color="primary" size="small">Export Data</col-button>
      </col-group>
    </col-group>
  `,
};
