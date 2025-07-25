import type { Meta, StoryObj } from '@storybook/react';

import DateCalendarSkeleton from '.';

const meta: Meta<typeof DateCalendarSkeleton> = {
  argTypes: {},
  component: DateCalendarSkeleton,
  parameters: {
    docs: {
      description: {
        component:
          'The Date Calendar Skeleton component for loading indication in a DatePicker or DateCalendar.',
      },
    },
  },
  title: 'Inputs/Date Calendar Skeleton',
};

type Story = StoryObj<typeof DateCalendarSkeleton>;

const Default: Story = {};

export { Default };

export default meta;
