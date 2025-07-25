import type { Meta, StoryObj } from '@storybook/react';

import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Step from '../step';
import StepIndicator from '.';
import Stepper from '../stepper';

function Container(props) {
  return (
    <Stepper activeStep={2}>
      <StepIndicator {...props} />
      {Array.from({ length: 4 }).map((_, index) => (
        <Step key={index} />
      ))}
    </Stepper>
  );
}

const meta: Meta<typeof StepIndicator> = {
  argTypes: {
    className: {
      control: 'text',
      description: 'The element className for styling',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: {
        options: ['dotted', 'dashed'],
        type: 'select',
      },
      defaultValue: 'dotted',
      table: {
        defaultValue: { summary: 'dotted' },
      },
    },
  },
  component: Container,
  decorators: [
    (Story) => (
      <Box style={{ maxWidth: '60vw', width: '500px' }}>
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Step indicator component to display progress between each `<Step />` component inside `<Stepper />`.',
      },
    },
  },
  title: 'Navigation/Stepper/Step Indicator',
};

type Story = StoryObj<typeof StepIndicator>;

const Default: Story = {
  args: {},
};

const DefaultWithLabels: Story = {
  args: {
    ...Default.args,
  },
  render: (props) => (
    <Stepper activeStep={2}>
      <StepIndicator {...props} />
      {Array.from({ length: 4 }).map((_, index) => (
        <Step key={index} label={`Step ${index + 1}`} />
      ))}
    </Stepper>
  ),
};

const Dashed: Story = {
  args: {
    ...Default.args,
    variant: 'dashed',
  },
};

const DashedWithLabels: Story = {
  args: {
    ...Dashed.args,
  },
  render: DefaultWithLabels.render,
};

export { Default, DefaultWithLabels, Dashed, DashedWithLabels };

export default meta;
