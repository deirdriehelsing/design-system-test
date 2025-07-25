import type { Meta, StoryObj } from '@storybook/react';

import Box from '../box';
import LinearProgress from '.';
import React from 'react';

(LinearProgress as React.FunctionComponent).displayName = 'LinearProgress';

const meta: Meta<typeof LinearProgress> = {
  title: 'Core/Linear Progress',
  component: LinearProgress,
  argTypes: {
    color: {
      control: 'select',
      defaultValue: 'accent01',
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
        'neutral',
      ],
      table: {
        type: { summary: 'elementType' },
        defaultValue: { summary: 'accent01' },
      },
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium'],
    },
    value: {
      control: { min: 0, max: 100, step: 1, type: 'range' },
      description: 'The value of the progress indicator for the determinate variant.',
      defaultValue: 0,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    valueBuffer: {
      control: { min: 0, max: 100, step: 1, type: 'range' },
      description: 'The value for the buffer variant.',
      defaultValue: 0,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    variant: {
      control: 'select',
      options: ['indeterminate', 'determinate', 'buffer', 'query'],
      defaultValue: 'indeterminate',
      description: 'The variant to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'indeterminate' },
      },
    },
  },
  decorators: [(Story) => <Box style={{ width: '500px' }}>{Story()}</Box>],
};

type Story = StoryObj<typeof LinearProgress>;

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

const Buffer: Story = {
  args: {
    value: 30,
    valueBuffer: 60,
    variant: 'buffer',
  },
};

const Query: Story = {
  args: {
    variant: 'query',
  },
};

export { Default, Indeterminate, Determinate, Buffer, Query };

export default meta;
