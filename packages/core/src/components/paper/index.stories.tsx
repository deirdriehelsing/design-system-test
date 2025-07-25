import type { Meta, StoryObj } from '@storybook/react';

import Paper from '.';

(Paper as React.FunctionComponent).displayName = 'Paper';

const meta: Meta<typeof Paper> = {
  title: 'Core/Paper',
  component: Paper,
  argTypes: {
    children: {
      description: 'The content of the component.',
      table: {
        type: { summary: 'node' },
      },
    },
    accentColor: {
      control: 'select',
      description: 'The accent color',
      options: ['accent01', 'accent02', 'accent03', 'accent04', 'tertiary', 'primary', ''],
      table: {
        type: { summary: 'string' },
      },
    },
    colorVariant: {
      control: 'select',
      description: 'The color',
      options: ['saturated', 'colored', 'bordered', 'empty', ''],
      table: {
        type: { summary: 'string' },
      },
    },
    component: {
      control: 'select',
      description:
        'The component used for the root node. Either a string to use a HTML element or a component.',
      options: ['aside', 'div', 'section', 'span'],
      table: {
        type: { summary: 'elementType' },
      },
    },
    elevation: {
      control: { min: 0, max: 24, step: 1, type: 'range' },
      description:
        'Shadow depth, corresponds to dp in the spec. It accepts values between 0 and 24 inclusive.',
      defaultValue: 1,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    square: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, rounded corners are disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'radio',
      options: ['elevation', 'outlined'],
      defaultValue: 'elevation',
      description: 'The variant to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'elevation' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Paper component emulates physical paper attributes on a background. It helps distinguish an element from the background, offering adjustable corners, borders, and varying elevation levels. It is a flexible, customizable building block for UIs.',
      },
    },
  },
};

type Story = StoryObj<typeof Paper>;

const Default: Story = {
  args: {
    children: 'Primary Paper',
    sx: { height: '20vh', maxWidth: '50vw', padding: '24px', width: '500px' },
  },
};

const Empty: Story = {
  args: {
    ...Default.args,
    children: 'Empty Paper',
    colorVariant: 'empty',
  },
};

export { Default, Empty };

export default meta;
