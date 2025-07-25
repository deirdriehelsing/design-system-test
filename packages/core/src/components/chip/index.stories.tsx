import type { Meta, StoryObj } from '@storybook/react';

import Chip from '.';
import React from 'react';
import { Smiley as SmileyIcon } from '@phosphor-icons/react';

(Chip as React.FunctionComponent).displayName = 'Chip';

const meta: Meta<typeof Chip> = {
  title: 'Core/Chip',
  component: Chip,
  argTypes: {
    avatar: {
      control: 'text',
      description: 'The Avatar element to display.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Call to action' },
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
    clickable: {
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    deleteIcon: {
      control: 'text',
      description: 'The icon to display as the delete icon.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    icon: {
      control: 'text',
      description: 'The icon element to display.',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      defaultValue: 'medium',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      defaultValue: 'outlined',
      options: ['filled', 'link', 'outlined'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'outlined' },
      },
    },
  },
};

type Story = StoryObj<typeof Chip>;

const Default: Story = {
  args: {
    label: 'English',
  },
};

const Clickable: Story = {
  args: {
    onClick: () => {
      console.log('clicked');
    },
    label: 'Clickable',
  },
};

const ClickableAndDeletable: Story = {
  args: {
    onClick: () => {
      console.log('clicked');
    },
    onDelete: () => {
      console.log('deleted');
    },
    label: 'Clickable',
  },
  name: 'Clickable and Deletable',
};

const Deletable: Story = {
  args: {
    onDelete: () => {
      console.log('deleted');
    },
    label: 'Deletable',
  },
};

const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
  },
};

const Large: Story = {
  args: {
    label: 'Large Chip',
    size: 'large',
  },
};

const Link: Story = {
  args: {
    label: 'Jump Link',
    onClick: () => {},
    variant: 'link',
  },
};

const WithIcon: Story = {
  args: {
    icon: <SmileyIcon size={24} />,
    label: 'With Icon',
  },
  name: 'With Icon',
};

export { Default, Clickable, Deletable, ClickableAndDeletable, Large, Link, WithIcon, Disabled };

export default meta;
