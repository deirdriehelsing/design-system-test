import type { Meta, StoryObj } from '@storybook/react';

import MultiInputTimeRangeField from '.';

const meta: Meta<typeof MultiInputTimeRangeField> = {
  argTypes: {
    startTimeInputLabel: {
      control: 'text',
      description: 'Label for the start time input',
      table: {
        type: { summary: 'string' },
      },
    },
    endTimeInputLabel: {
      control: 'text',
      description: 'Label for the end time input',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  component: MultiInputTimeRangeField,
  parameters: {
    docs: {
      description: {
        component:
          'The MultiInputTimeRangeField component lets users select a time range. It is based on the [Material UI MultiInputTimeRangeField](https://mui.com/x/react-date-pickers/time-range-field/).',
      },
    },
  },
  title: 'Inputs/Multi Input Time Range Field',
};

type Story = StoryObj<typeof MultiInputTimeRangeField>;

const Default: Story = {};

const WithLabels: Story = {
  args: {
    startTimeInputLabel: 'From',
    endTimeInputLabel: 'To',
  },
};

const With24HoursFormat: Story = {
  args: {
    ampm: false,
  },
};

export { Default, WithLabels, With24HoursFormat };

export default meta;
