import type { Meta, StoryObj } from '@storybook/react';

import Box from '.';

const meta: Meta<typeof Box> = {
  title: 'Core/Box',
  component: Box,
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
    sx: {
      control: 'object',
      description:
        'The system prop that allows defining system overrides as well as additional CSS styles.',
      table: {
        type: { summary: 'object' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Box component serves as a wrapper component for most of the CSS utility needs. It should only be used when an element has dynamic styling needs.',
      },
    },
  },
};

type Story = StoryObj<typeof Box>;

const Default: Story = {
  args: {
    children: 'Content...',
  },
};

export { Default };

export default meta;
