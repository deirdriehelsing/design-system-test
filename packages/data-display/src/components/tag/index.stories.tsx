import type { Meta, StoryObj } from '@storybook/react';

import { Envelope as EnvelopeIcon } from '@phosphor-icons/react';
import React from 'react';
import Tag from '.';

const meta: Meta<typeof Tag> = {
  title: 'Data Display/Tag',
  component: Tag,
  argTypes: {
    children: {
      description: 'The content of the component.',
      table: {
        type: { summary: 'node' },
      },
    },
    className: {
      control: 'text',
      description: 'The element className for styling',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'gradient',
        'primary',
        'secondary',
        'success',
        'warning',
        'neutral',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    icon: {
      control: false,
      description: 'The component used for the icon',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

type Story = StoryObj<typeof Tag>;

const Default: Story = {
  args: {
    children: 'Default Tag',
  },
};

const WithIcon: Story = {
  args: {
    children: 'Default Tag',
    icon: <EnvelopeIcon />,
  },
  argTypes: {
    icon: {
      control: 'boolean',
      mapping: {
        true: <EnvelopeIcon />,
        false: null,
      },
    },
  },
};

export { Default, WithIcon };

export default meta;
