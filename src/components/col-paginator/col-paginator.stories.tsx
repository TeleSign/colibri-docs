import { html } from 'lit';
import type { ColibriStoryMeta, ColibriStory } from '@/types/storybook';
import { formatCodeString } from '@/utils/formatters';
import { fn } from '@storybook/test';

type StoryArgs = {
  length: Number;
  value: Number;
  disabled: Boolean;
  align: 'center' | 'start' | 'end';
  responsive: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  sizeConfig: {
    pageItemWidth?: number;
    navButtonWidth?: number;
    gap?: number;
    ellipsisWidth?: number;
    padding?: number;
  };
  onPageChange?: () => void;
};

const meta = {
  title: 'Data Visualization/Paginator',
  component: 'col-paginator',
  parameters: {
    docs: {
      source: {
        excludeDecorators: true,
        transform: formatCodeString,
      },
    },
  },
  argTypes: {
    length: {
      control: 'number',
      description: 'Defines the number of pages of the paginator',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    value: {
      control: 'number',
      description: 'Determines the default selected page (within length prop limit)',
      table: {
        category: 'Core',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'State declaring if a paginator is disabled or not',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Core',
      },
    },
    align: {
      control: 'select',
      options: ['center', 'start', 'end'],
      description: 'Determines the aligment that be displayed the paginator',
      table: {
        type: {
          summary: `'center' | 'start' | 'end'`,
        },
        defaultValue: { summary: 'center' },
        category: 'Core',
      },
    },
    responsive: {
      control: 'object',
      description: 'Defines the responsive breakpoints to determine de container width',
      table: {
        type: { summary: '{}' },
        defaultValue: {
          summary: `{ sm: 3, md: 5 lg: 7, xl: 9, 2xl: 11}`,
        },
        category: 'Core',
      },
    },
    sizeConfig: {
      name: 'size-config',
      control: 'object',
      description: 'Defines the size of the paginator to calculate available width',
      table: {
        type: { summary: '{}' },
        defaultValue: {
          summary: `{ pageItemWidth: 38, navButtonWidth: 38, gap: 4, ellipsisWidth: 30, padding: 0}`,
        },
        category: 'Core',
      },
    },
    onPageChange: {
      action: 'clicked',
      description: 'Callback function that is called when the pages or the arrows are clicked.',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    length: 4,
    value: 1,
    disabled: false,
    align: 'center',
    responsive: {
      sm: 3,
      md: 5,
      lg: 7,
      xl: 9,
      '2xl': 11,
    },
    sizeConfig: {
      pageItemWidth: 38,
      navButtonWidth: 38,
      gap: 1,
      ellipsisWidth: 30,
      padding: 0,
    },
    onPageChange: fn(),
  },
} satisfies ColibriStoryMeta<StoryArgs>;

export default meta;

type Story = ColibriStory<StoryArgs>;

const renderPaginator: Story['render'] = ({
  length,
  value,
  disabled,
  align,
  responsive,
  sizeConfig,
  onPageChange,
}) =>
  html`<col-paginator
    length=${length}
    value=${value}
    align=${align}
    ?disabled=${disabled}
    .responsive=${responsive}
    .sizeConfig=${sizeConfig}
    @page-change=${onPageChange}
  ></col-paginator>`;

export const Default: Story = {
  render: renderPaginator,
};

export const DisablePaginator: Story = {
  render: renderPaginator,
  args: {
    length: 2,
    disabled: true,
  },
};

export const CustomAlignPaginator: Story = {
  render: renderPaginator,
  args: {
    length: 8,
    value: 5,
    align: 'end',
  },
};

export const CustomResponsiveConfig: Story = {
  render: renderPaginator,
  args: {
    length: 50,
    value: 20,
    responsive: {
      sm: 5,
      md: 7,
      lg: 11,
    },
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-paginator length="50" value="20" responsive='{"sm": 5, "md": 7, "lg": 11}'>`
        ),
      },
    },
  },
};

export const CustomSizeConfig: Story = {
  render: renderPaginator,
  args: {
    length: 10,
    value: 9,
    sizeConfig: {
      pageItemWidth: 60,
      navButtonWidth: 50,
      gap: 10,
    },
  },
  parameters: {
    docs: {
      source: {
        code: formatCodeString(
          `<col-paginator length="50" value="20" size-config='{"pageItemWidth": 60, "navButtonWidth": 50, "gap": 10}'>`
        ),
      },
    },
  },
};
