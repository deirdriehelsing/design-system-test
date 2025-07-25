import type { Meta, StoryObj } from '@storybook/react';

import CircularProgress from '.';

(CircularProgress as React.FunctionComponent).displayName = 'CircularProgress';

const meta: Meta<typeof CircularProgress> = {
  title: 'Core/Circular Progress',
  component: CircularProgress,
  argTypes: {
    color: {
      control: 'select',
      defaultValue: 'secondary',
      description: 'The color of the component.',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'elementType' },
        defaultValue: { summary: 'secondary' },
      },
    },
    disableShrink: {
      control: 'boolean',
      defaultValue: false,
      description:
        'If true, the shrink animation is disabled. This only works if variant is indeterminate.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    size: {
      control: { min: 0, step: 1, type: 'number' },
      description:
        "The size of the component. If using a number, the pixel unit is assumed. If using a string, you need to provide the CSS unit, e.g '3rem'.",
      defaultValue: 40,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 40 },
      },
    },
    thickness: {
      control: { min: 0, step: 0.1, type: 'number' },
      description: 'The thickness of the circle.',
      defaultValue: 3.6,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 3.6 },
      },
    },
    value: {
      control: { min: 0, max: 100, step: 1, type: 'range' },
      description: 'The value of the progress indicator for the determinate variant.',
      defaultValue: 0,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    variant: {
      control: 'select',
      options: ['indeterminate', 'determinate'],
      defaultValue: 'indeterminate',
      description: 'The variant to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'indeterminate' },
      },
    },
  },
};

type Story = StoryObj<typeof CircularProgress>;

const Default: Story = {};

const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};

const Determinate: Story = {
  args: {
    value: 50,
    variant: 'determinate',
  },
};

export { Default, Indeterminate, Determinate };

export default meta;
