import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from '.';

const meta: Meta<typeof Skeleton> = {
  title: 'Core/Skeleton',
  component: Skeleton,
  argTypes: {
    animation: {
      control: 'select',
      description: 'Animation of skeleton',
      options: ['pulse', 'wave', false],
      table: {
        defaultValue: { summary: false },
      },
    },
    height: {
      control: { type: 'number' },
      description: 'Height of the skeleton',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 52 },
      },
    },
    width: {
      control: { type: 'number' },
      description: 'Width of the skeleton',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },
    variant: {
      control: 'select',
      description: 'Shape of the skeleton',
      options: ['rectangular', 'circular', 'rounded', ''],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'rectangular' },
      },
    },
  },
};

type Story = StoryObj<typeof Skeleton>;

const Default: Story = {
  args: {
    height: 52,
    width: 300,
  },
};

export { Default };

export default meta;
