import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

(Button as React.FunctionComponent).displayName = 'Button';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
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
        'neutral',
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
};

type Story = StoryObj<typeof Button>;

const Default: Story = {
  args: {
    children: 'Call to action',
  },
};

const Contained: Story = {
  args: {
    children: 'Call to action',
    color: 'primary',
    variant: 'contained',
  },
};

const Disabled: Story = {
  args: {
    children: 'Call to action',
    disabled: true,
  },
};

const Outlined: Story = {
  args: {
    children: 'Call to action',
    color: 'primary',
    variant: 'outlined',
  },
};

const Text: Story = {
  args: {
    children: 'Call to action',
    color: 'primary',
    variant: 'text',
  },
};

const WithCustomComponent: Story = {
  args: {
    children: 'Go to…',
    color: 'primary',
    component: 'a',
    variant: 'contained',
    href: '/',
  },
};

export { Default, Contained, Outlined, Text, Disabled, WithCustomComponent };

export default meta;
