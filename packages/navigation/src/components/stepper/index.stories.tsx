import type { Meta, StoryObj } from '@storybook/react';

import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import Step from './components/step';
import StepButton from './components/step-button';
import StepIndicator from './components/step-indicator';
import Stepper from './components/stepper';

const steps = [
  <p key={1}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe exercitationem vero facilis
    sapiente debitis dicta, fugiat atque praesentium nihil illo esse autem quasi laborum asperiores
    error quisquam consectetur ullam molestias?
  </p>,
  <p key={2}>Lorem ipsum dolor sit.</p>,
  <p key={3}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel quidem sit nisi accusantium ab
    voluptate nemo quod voluptates? Quod reprehenderit, quaerat atque maiores dicta voluptatum ipsum
    minus nesciunt totam nihil?
  </p>,
  <p key={4}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, iusto dignissimos itaque qui,
    veritatis accusantium rem ratione omnis consequatur vitae ipsam, deserunt quos. Voluptate natus
    corrupti voluptas facere accusantium id?
  </p>,
];

function Container(props) {
  return (
    <Stepper {...props}>
      <StepIndicator />
      <h1>something</h1>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
      {'something else'}
      <Box display="flex" gap={2} marginY={2}>
        <StepButton
          onClick={(setActiveStep) =>
            setActiveStep((prev) => {
              if (prev > 0) {
                return prev - 1;
              }

              return prev;
            })
          }
        >
          Prev
        </StepButton>
        <StepButton
          onClick={(setActiveStep) =>
            setActiveStep((prev) => {
              if (prev < steps.length - 1) {
                return prev + 1;
              }

              return prev;
            })
          }
        >
          Next
        </StepButton>
      </Box>
    </Stepper>
  );
}

const meta: Meta<typeof Stepper> = {
  argTypes: {
    activeStep: {
      control: {
        type: 'number',
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
          'Steppers convey progress through numbered steps. It provides a wizard-like workflow. Any `<Step />` component inside the `<Stepper />` component will be treated as a step. Please refer to `<StepButton />`, `<StepIndicator />` and other components in the stepper namespace for more information on how to compose this component.',
      },
    },
  },
  title: 'Navigation/Stepper',
};

type Story = StoryObj<typeof Stepper>;

const Default: Story = {
  args: {},
};

const Controlled: Story = {
  args: {
    ...Default.args,
    activeStep: 2,
  },
};

export { Default, Controlled };

export default meta;
