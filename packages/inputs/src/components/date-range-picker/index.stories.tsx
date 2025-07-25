import type { Meta, StoryObj } from '@storybook/react';

import DateRangePicker from '.';

const meta: Meta<typeof DateRangePicker> = {
  argTypes: {
    label: {
      control: 'text',
      description: 'Placeholder text for the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the input is loading',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    timezone: {
      control: 'text',
      description: 'The timezone to use for the date',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
  },
  component: DateRangePicker,
  parameters: {
    docs: {
      description: {
        component:
          'The Date Range Picker component lets users select a date range. It is based on the [Material UI Date Range Picker](https://mui.com/x/react-date-pickers/date-range-picker/).',
      },
    },
  },
  title: 'Inputs/Date Range Picker',
};

type Story = StoryObj<typeof DateRangePicker>;

const Default: Story = {};

const SingleInput: Story = {
  args: {
    useSingleInput: true,
  },
};

const SingleInputWithFormatting: Story = {
  args: {
    useSingleInput: true,
    slotProps: {
      field: {
        format: 'ccc, MMM dd',
      },
    },
  },
};

export { Default, SingleInput, SingleInputWithFormatting };

export default meta;
