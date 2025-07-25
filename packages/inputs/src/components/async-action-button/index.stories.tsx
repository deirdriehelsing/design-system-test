import type { Meta, StoryObj } from '@storybook/react';

import AsyncActionButton from '.';

(AsyncActionButton as React.FunctionComponent).displayName = 'AsyncActionButton';

const meta: Meta<typeof AsyncActionButton> = {
  title: 'Inputs/Async Action Button',
  component: AsyncActionButton,
  argTypes: {
    action: {
      action: 'clicked',
      control: null,
      description: 'The action to call when the button is clicked.',
      table: {
        type: { summary: 'function' },
      },
    },
    color: {
      control: 'select',
      options: ['accent01', 'accent02', 'accent03', 'accent04', 'primary', 'secondary'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
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

type Story = StoryObj<typeof AsyncActionButton>;

const Default: Story = {
  args: {
    children: 'Call to action',
    action: () => new Promise((resolve, reject) => setTimeout(() => resolve(), 3000)),
  },
};

const Success: Story = {
  args: {
    action: () => new Promise((resolve, reject) => setTimeout(() => resolve(), 3000)),
    children: 'Call to action',
  },
};

const Error: Story = {
  args: {
    children: 'Call to action',
    action: () => new Promise((resolve, reject) => setTimeout(() => reject(), 3000)),
  },
};

export { Default, Success, Error };

export default meta;
