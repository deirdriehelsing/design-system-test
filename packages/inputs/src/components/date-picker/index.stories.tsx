import type { Meta, StoryObj } from '@storybook/react';

import DateCalendarSkeleton from '../date-calendar-skeleton';
import DatePicker from '.';
import React from 'react';

function generateDate(numberDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + numberDays);
  return date;
}

const meta: Meta<typeof DatePicker> = {
  argTypes: {
    enabledDates: {
      control: 'array',
      description:
        'Pass an array of dates to enable only those dates in the calendar. All other dates will be disabled.',
      table: {
        type: { summary: 'Date[]' },
      },
    },
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
  component: DatePicker,
  parameters: {
    docs: {
      description: {
        component:
          'The Date Picker component lets users select a date. It is based on the [Material UI Date Picker](https://mui.com/components/date-picker/).',
      },
    },
  },
  title: 'Inputs/Date Picker',
};

type Story = StoryObj<typeof DatePicker<Date>>;

const Default: Story = {};

const EnabledDates: Story = {
  args: {
    enabledDates: [
      generateDate(1),
      generateDate(3),
      generateDate(4),
      generateDate(6),
      generateDate(7),
      generateDate(8),
    ],
  },
};

const Loading: Story = {
  args: {
    loading: true,
    renderLoading: () => <DateCalendarSkeleton />,
  },
};

const WithShouldDisableDate: Story = {
  args: {
    enabledDates: undefined,
    shouldDisableDate: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to use the `shouldDisableDate` prop to disable weekends.',
      },
    },
  },
};

export { Default, EnabledDates, WithShouldDisableDate, Loading };

export default meta;
