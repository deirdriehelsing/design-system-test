import type { Meta, StoryObj } from '@storybook/react';

import LazyDatePicker from '.';

function generateDate(numberDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + numberDays);
  return date;
}

const meta: Meta<typeof LazyDatePicker> = {
  title: 'Inputs/Lazy Date Picker',
  component: LazyDatePicker,
  argTypes: {
    enabledDates: {
      control: 'array',
      description:
        'Pass an array of dates to enable only those dates in the calendar. All other dates will be disabled.',
      table: {
        type: { summary: 'Date[]' },
      },
    },
    fallbackTextFieldClassName: {
      control: 'text',
      description: 'CSS class for styling the fallback text field',
      table: {
        type: { summary: 'string' },
      },
    },
    shouldDisableDate: {
      control: 'object',
      description: 'Function to disable certain dates',
      table: {
        type: { summary: '(date: Date) => boolean' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Lazy Date Picker component demonstrates a lazy loaded variant of the Date Picker. Initially, a custom-styled TextField is shown as a fallback. When the user interacts with the TextField (or its calendar icon), the actual Date Picker component is lazy loaded and displayed.',
      },
    },
  },
};

type Story = StoryObj<typeof LazyDatePicker>;

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

export { Default, EnabledDates, WithShouldDisableDate };
export default meta;
