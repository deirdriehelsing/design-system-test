import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button';
import Link from '../link';
import React from 'react';
import Stack from '.';

(Stack as React.FunctionComponent).displayName = 'Stack';

const meta: Meta<typeof Stack> = {
  title: 'Core/Stack',
  component: Stack,
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
    direction: {
      control: 'select',
      options: ['column-reverse', 'column', 'row-reverse', 'row'],
      defaultValue: 'column',
      description: 'The variant to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'column' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Stack component is a container for arranging elements vertically or horizontally.',
      },
    },
  },
};

type Story = StoryObj<typeof Stack>;

const Default: Story = {
  args: {
    children: (
      <>
        <Button>Do a thing</Button>
        <Link>Do another thing</Link>
      </>
    ),
  },
};

const Vertical: Story = {
  args: {
    children: (
      <>
        <Button>Do a thing</Button>
        <Link>Do another thing</Link>
      </>
    ),
    direction: 'column',
  },
};

const Horizontal: Story = {
  args: {
    children: (
      <>
        <Button>Do a thing</Button>
        <Link>Do another thing</Link>
      </>
    ),
    direction: 'row',
  },
};

export { Default, Vertical, Horizontal };

export default meta;
