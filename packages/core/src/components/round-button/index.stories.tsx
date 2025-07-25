import type { Meta, StoryObj } from '@storybook/react';

import { FlyingSaucer as FlyingSaucerIcon } from '@phosphor-icons/react';
import React from 'react';
import RoundButton from '.';

(RoundButton as React.FunctionComponent).displayName = 'RoundButton';

const meta: Meta<typeof RoundButton> = {
  title: 'Core/Round Button',
  component: RoundButton,
  argTypes: {
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
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'contained' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A round button component. The button size adapts to the content it contains.',
      },
    },
  },
};

type Story = StoryObj<typeof RoundButton>;

const Default: Story = {
  args: {
    children: 'CTA',
  },
};

const Contained: Story = {
  args: {
    children: 'CTA',
    color: 'primary',
    variant: 'contained',
  },
};

const Disabled: Story = {
  args: {
    children: 'CTA',
    disabled: true,
  },
};

const Outlined: Story = {
  args: {
    children: 'CTA',
    color: 'primary',
    variant: 'outlined',
  },
};

const Text: Story = {
  args: {
    children: 'CTA',
    color: 'primary',
    variant: 'text',
  },
};

const WithIcon: Story = {
  args: {
    children: <FlyingSaucerIcon size={24} />,
  },
};

const WithLargeContent: Story = {
  args: {
    children: 'With Large Content',
  },
};

const WithSmallContent: Story = {
  args: {
    children: 's',
  },
};

export {
  Default,
  WithIcon,
  WithSmallContent,
  WithLargeContent,
  Contained,
  Outlined,
  Text,
  Disabled,
};

export default meta;
