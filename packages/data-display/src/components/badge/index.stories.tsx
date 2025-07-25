import type { Meta, StoryObj } from '@storybook/react';

import Badge from '.';
import Chip from '@blueshift-ui/core/dist/components/chip';
import { Envelope as EnvelopeIcon } from '@phosphor-icons/react';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  argTypes: {
    anchorOrigin: {
      control: 'select',
      mapping: {
        'top left': { vertical: 'top', horizontal: 'left' },
        'top right': { vertical: 'top', horizontal: 'right' },
        'bottom left': { vertical: 'bottom', horizontal: 'left' },
        'bottom right': { vertical: 'bottom', horizontal: 'right' },
      },
      options: ['top left', 'top right', 'bottom left', 'bottom right'],
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: "{ vertical: 'top', horizontal: 'right' }" },
      },
    },
    badgeContent: {
      control: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '4' },
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
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    overlap: {
      control: 'select',
      options: ['rectangular', 'circular'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'rectangular' },
      },
    },
    size: {
      control: 'select',
      options: ['medium', 'large'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'dot', 'edge'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
    },
  },
};

type Story = StoryObj<typeof Badge>;

const Default: Story = {
  args: {
    badgeContent: 4,
    children: <EnvelopeIcon size={24} />,
    color: 'primary',
  },
};

const Dot: Story = {
  args: {
    ...Default.args,
    variant: 'dot',
  },
};

const Edge: Story = {
  args: {
    ...Default.args,
    anchorOrigin: { vertical: 'top', horizontal: 'left' },
    badgeContent: 'Suggested',
    children: <Chip color="success" label="1x per week" variant="outlined" />,
    size: 'large',
    variant: 'edge',
  },
};

export { Default, Dot, Edge };

export default meta;
