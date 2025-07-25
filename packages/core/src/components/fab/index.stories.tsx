import type { Meta, StoryObj } from '@storybook/react';

import { Alien } from '@phosphor-icons/react';
import Fab from '.';
import React from 'react';

const meta: Meta<typeof Fab> = {
  title: 'Core/Fab',
  component: Fab,
  argTypes: {
    children: {
      control: false,
      description: 'The content of the component.',
      table: {
        type: { summary: 'node' },
      },
    },
    corner: {
      defaultValue: undefined,
      description: 'Corner to place the fab in',
      options: ['top', 'right', 'bottom', 'left'],
      control: 'select',
    },
  },
};

type Story = StoryObj<typeof Fab>;

const Default: Story = {
  args: {
    children: <Alien size={32} />,
  },
};

const Corner: Story = {
  args: {
    ...Default.args,
    children: <Alien size={32} />,
    corner: 'right',
  },
};

const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

const Extended: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <Alien size={32} /> Extended
      </>
    ),
    variant: 'extended',
  },
};

const Primary: Story = {
  args: {
    ...Default.args,
    children: <Alien size={32} />,
    color: 'primary',
  },
};

const Secondary: Story = {
  args: {
    ...Default.args,
    children: <Alien size={32} />,
    color: 'secondary',
  },
};

export { Default, Primary, Secondary, Extended, Corner, Disabled };

export default meta;
