import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import Tooltip from '.';

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  argTypes: {
    color: {
      control: 'select',
      description: 'Background color of tooltip',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'info',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'secondary' },
      },
    },
    title: {
      control: 'text',
      description: 'Content of the tooltip',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

type Story = StoryObj<typeof Tooltip>;

const Default: Story = {
  args: {
    title: 'This is a tooltip',
    children: <p>Hover me</p>,
  },
};

export { Default };

export default meta;
