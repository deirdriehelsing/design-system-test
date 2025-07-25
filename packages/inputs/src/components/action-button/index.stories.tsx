import type { Meta, StoryObj } from '@storybook/react';

import ActionButton, { ActionButtonStatus } from '.';
import React, { useCallback } from 'react';
import { useState } from 'react';

(ActionButton as React.FunctionComponent).displayName = 'ActionButton';

function ActionButtonStory(props) {
  const { action, ...otherProps } = props;
  const [buttonStatus, setButtonStatus] = useState(ActionButtonStatus.Idle);

  const buttonAction = useCallback(async () => {
    setButtonStatus(ActionButtonStatus.Pending);

    try {
      await action();
      setButtonStatus(ActionButtonStatus.Resolved);
    } catch (error) {
      setButtonStatus(ActionButtonStatus.Rejected);
    }
  }, [action, setButtonStatus]);

  return <ActionButton {...otherProps} action={buttonAction} status={buttonStatus} />;
}

const meta: Meta<typeof ActionButton> = {
  title: 'Inputs/Action Button',
  component: ActionButton,
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
  render: ActionButtonStory,
};

type Story = StoryObj<typeof ActionButton>;

const Default: Story = {
  args: {
    children: 'Call to action',
    action: () => new Promise((resolve, reject) => setTimeout(() => resolve(), 3000)),
  },
};

const Error: Story = {
  args: {
    children: 'Call to action',
    action: () => new Promise((resolve, reject) => setTimeout(() => reject(), 3000)),
    status: ActionButtonStatus.Rejected,
  },
};

const Success: Story = {
  args: {
    children: 'Call to action',
    action: () => new Promise((resolve, reject) => setTimeout(() => resolve(), 3000)),
    status: ActionButtonStatus.Resolved,
  },
};

export { Default, Success, Error };

export default meta;
