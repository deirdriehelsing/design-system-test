import type { Meta, StoryObj } from '@storybook/react';

import Box from '../box';
import Divider from '.';
import React from 'react';

function DividerStory(props) {
  const displayType = props.flexItem ? 'flex' : 'block';

  return (
    <Box sx={{ border: '1px solid #999', display: displayType, width: '300px' }}>
      <h3>Content</h3>
      <Divider {...props} />
      <h3>Content</h3>
    </Box>
  );
}

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  argTypes: {
    absolute: {
      control: { type: 'boolean' },
      description: 'Absolutely position the element.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'bool' },
      },
    },
    children: {
      description: 'The content of the component.',
      table: {
        disable: true,
        type: { summary: 'node' },
      },
    },
    classes: {
      control: { type: 'object' },
      description: 'Override or extend the styles applied to the component.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'string' },
      },
    },
    component: {
      control: { type: 'select' },
      defaultValue: 'hr',
      description:
        'The component used for the root node. Either a string to use a HTML element or a component.',
      options: ['div', 'hr', 'li'],
      table: {
        defaultValue: { summary: 'hr' },
        type: { summary: 'elementType' },
      },
    },
    flexItem: {
      control: { type: 'boolean' },
      description:
        'If `true`, a vertical divider will have the correct height when used in flex container.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'bool' },
      },
    },
    light: {
      control: { type: 'boolean' },
      description: 'If `true`, the divider will have a lighter color.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'bool' },
      },
    },
    orientation: {
      control: { type: 'radio' },
      defaultValue: 'horizontal',
      description: 'The divider orientation.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'string' },
      },
    },
    role: {
      control: { type: 'select' },
      description: 'The ARIA role applied to the divider.',
      options: ['separator', 'presentation'],
      table: {
        defaultValue: { summary: 'separator' },
        type: { summary: 'enum' },
      },
    },
    sx: {
      control: { type: 'object' },
      description:
        'The system prop that allows defining system overrides as well as additional CSS styles.',
      table: {
        defaultValue: { summary: '{}' },
        type: { summary: 'string' },
      },
    },
    textAlign: {
      control: { type: 'radio' },
      defaultValue: 'center',
      description: 'The text alignment.',
      options: ['center', 'justify', 'left', 'right'],
      table: {
        defaultValue: { summary: 'center' },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'fullWidth',
      description: 'The variant to use.',
      options: ['fullWidth', 'inset', 'middle'],
      table: {
        defaultValue: { summary: 'fullWidth' },
        type: { summary: 'string' },
      },
    },
  },
  render: DividerStory,
  parameters: {
    docs: {
      description: {
        component: 'The divider renders as an `<hr>` by default.',
      },
    },
  },
};

type Story = StoryObj<typeof Divider>;

const Default: Story = {};

const Vertical: Story = {
  args: {
    flexItem: true,
    orientation: 'vertical',
  },
};

const WithChildren: Story = {
  args: {
    children: 'Hello World',
  },
};

export { Default, Vertical, WithChildren };

export default meta;
