import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import StepButton from '.';
import Stepper from '../stepper';

function Container(props) {
  return (
    <Stepper>
      <StepButton onClick={() => true} {...props} />
    </Stepper>
  );
}

const meta: Meta<typeof StepButton> = {
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
      options: ['contained', 'outlined', 'text'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'contained' },
      },
    },
  },
  component: Container,
  parameters: {
    docs: {
      description: {
        component:
          'Button component to transition between each `<Step />` component inside `<Stepper />`.',
      },
    },
  },
  title: 'Navigation/Stepper/Step Button',
};

type Story = StoryObj<typeof StepButton>;

const Default: Story = {
  args: {
    children: 'Step Button',
  },
};

export { Default };

export default meta;
