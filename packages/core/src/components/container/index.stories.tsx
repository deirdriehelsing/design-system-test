import type { Meta, StoryObj } from '@storybook/react';

import Container from '.';
import React from 'react';

(Container as React.FunctionComponent).displayName = 'Container';

const meta: Meta<typeof Container> = {
  title: 'Core/Container',
  component: Container,
  args: {
    children: (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </>
    ),
  },
  argTypes: {
    children: {
      description: 'The content of the component.',
      table: {
        type: { summary: 'node' },
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
    disableGutters: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, the left and right padding is removed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fixed: {
      control: 'boolean',
      defaultValue: false,
      description:
        "Set the max-width to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of sizes instead of trying to accommodate a fully fluid viewport. It's fluid by default",
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxWidth: {
      control: 'select',
      description: 'The variant to use.',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      table: {
        type: { summary: 'string|boolean' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The container centers your content horizontally. It’s the most basic layout element.',
      },
    },
  },
};

type Story = StoryObj<typeof Container>;

const Default: Story = {};

const Fluid: Story = {
  args: {
    fixed: false,
  },
};

const Fixed: Story = {
  args: {
    fixed: true,
    maxWidth: 'sm',
  },
};

export { Default, Fluid, Fixed };

export default meta;
