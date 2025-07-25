import type { Meta, StoryObj } from '@storybook/react';

import { House as HouseIcon } from '@phosphor-icons/react';
import IconButton from '.';
import React from 'react';

const meta: Meta<typeof IconButton> = {
  title: 'Core/Icon Button',
  component: IconButton,
  argTypes: {
    color: {
      control: 'select',
      description: 'The color of the component. ',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'default',
        'error',
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    edge: {
      control: 'select',
      description:
        'If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape).',
      options: ['start', 'end', false],
      table: {
        type: { summary: 'boolean|string' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the component (`small` is equivalent to the dense button styling).',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      description: 'The variant of the component.',
      options: ['icon', 'outlined'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

type Story = StoryObj<typeof IconButton>;

const Default: Story = {
  args: {
    children: <HouseIcon />,
    color: 'default',
  },
};

const Outline: Story = {
  args: {
    children: <HouseIcon />,
    color: 'default',
    variant: 'outlined',
  },
};

export { Default, Outline };

export default meta;
