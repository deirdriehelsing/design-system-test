import type { Meta, StoryObj } from '@storybook/react';

import FilterMenu from '.';

const meta: Meta<typeof FilterMenu> = {
  component: FilterMenu,
  title: 'Inputs/Filter Menu',
  argTypes: {
    color: {
      control: 'select',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
    },
    columnCount: {
      control: {
        type: 'range',
        max: 5,
        min: 1,
        step: 1,
      },
      defaultValue: 2,
    },
    label: {
      control: 'text',
    },
    options: {
      control: 'object',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

type Story = StoryObj<typeof FilterMenu>;

const Default: Story = {
  args: {
    label: 'Grades',
    options: [
      { label: 'Graduate Student', value: '1' },
      { label: 'Pre-Kindergarten ', value: '2' },
      { label: 'Kindergarten', value: '3' },
      { label: 'Kindergarten', value: '4' },
      { label: '1st Grade', value: '5' },
      { label: '2st Grade', value: '6' },
      { label: '3st Grade', value: '7' },
      { label: '4st Grade', value: '8' },
      { label: '5st Grade', value: '9' },
      { label: '6st Grade', value: '10' },
    ],
  },
};

const Multiple: Story = {
  args: {
    ...Default.args,
    columnCount: 2,
    multiple: true,
  },
};

export { Default, Multiple };

export default meta;
