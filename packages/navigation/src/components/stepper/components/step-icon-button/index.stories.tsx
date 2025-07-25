import type { Meta, StoryObj } from '@storybook/react';

import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react';
import React from 'react';
import StepIconButton from '.';
import Stepper from '../stepper';

function Container(props) {
  return (
    <Stepper>
      <StepIconButton onClick={() => true} {...props} />
    </Stepper>
  );
}

const meta: Meta<typeof StepIconButton> = {
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
    edge: {
      control: 'select',
      description:
        'If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape).',
      options: ['start', 'end', false],
      table: {
        type: { summary: 'boolean|string' },
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
  },
  component: Container,
  parameters: {
    docs: {
      description: {
        component:
          'Icon button component to transition between each `<Step />` component inside `<Stepper />`.',
      },
    },
  },
  title: 'Navigation/Stepper/Step Icon Button',
};

type Story = StoryObj<typeof StepIconButton>;

const Default: Story = {
  args: {
    children: <PencilSimpleIcon />,
  },
};

export { Default };

export default meta;
