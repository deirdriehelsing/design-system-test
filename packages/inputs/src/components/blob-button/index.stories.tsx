import type { Meta, StoryObj } from '@storybook/react';

import BlobButton from '.';
import { PlayCircle as PlayCircleIcon } from '@phosphor-icons/react';
import React from 'react';

(BlobButton as React.FunctionComponent).displayName = 'BlobButton';

const meta: Meta<typeof BlobButton> = {
  title: 'Inputs/Blob Button',
  component: BlobButton,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      description: 'The size of the component.',
      options: ['small', 'medium'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    orientation: {
      control: 'select',
      description: 'The orientation of the button.',
      options: ['horizontal', 'stacked'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
};

type Story = StoryObj<typeof BlobButton>;

const Default: Story = {
  args: {
    children: 'Call to action',
    href: '#',
    icon: <PlayCircleIcon weight="duotone" />,
  },
};

const Disabled: Story = {
  args: {
    children: 'Call to action',
    disabled: true,
    href: '#',
    icon: <PlayCircleIcon weight="duotone" />,
  },
};

const Horizontal: Story = {
  args: {
    children: 'Call to action',
    href: '#',
    icon: <PlayCircleIcon weight="duotone" />,
    orientation: 'horizontal',
  },
};

const Stacked: Story = {
  args: {
    children: 'Call to action',
    href: '#',
    icon: <PlayCircleIcon weight="duotone" />,
    orientation: 'stacked',
  },
};

export { Default, Disabled, Horizontal, Stacked };

export default meta;
