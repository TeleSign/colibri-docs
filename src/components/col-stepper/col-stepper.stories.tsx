import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils';

type StoryArgs = {
  orientation: 'horizontal' | 'vertical';
  ariaLabel: string;
};

const meta = {
  title: 'Navigation/Stepper',
  component: 'col-stepper',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Defines the layout direction of the steps.',
      table: {
        category: 'Core',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Provides an accessible label for the stepper group.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'stepper' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
    ariaLabel: 'Step Progress',
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;
type Story = ColibriStory<StoryArgs>;

const renderStepper: Story['render'] = args => html`
  <col-stepper orientation=${args.orientation} aria-label=${args.ariaLabel}>
    <col-step step="1" label="Step 1" state="pending" orientation=${args.orientation} ?hasconnector=${true}></col-step>
    <col-step step="2" label="Step 2" state="active" orientation=${args.orientation} ?hasconnector=${true}></col-step>
    <col-step step="3" label="Step 3" state="completed" orientation=${args.orientation} ?hasconnector=${true}></col-step>
    <col-step step="4" label="Step 4" state="error" orientation=${args.orientation} ?hasconnector=${true}></col-step>
    <col-step step="5" label="Step 5" state="completed_error" orientation=${args.orientation}></col-step>
  </col-stepper>
`;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: renderStepper,
};

export const Horizontal: Story = {
  name: 'Horizontal layout',
  args: {
    orientation: 'horizontal',
  },
  render: renderStepper,
};

export const Vertical: Story = {
  name: 'Vertical layout',
  args: {
    orientation: 'vertical',
  },
  render: renderStepper,
};

export const WithCustomLabel: Story = {
  name: 'Custom accessible label',
  args: {
    ariaLabel: 'User registration steps',
  },
  render: renderStepper,
};
