import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button';
import Paper from '../paper';
import React from 'react';
import Slide from '.';
import Stack from '../stack';

function SlideStory(props) {
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Stack>
      <Slide in={checked} {...props}>
        <Paper elevation={6} sx={{ p: 2 }}>
          {props.children}
        </Paper>
      </Slide>
      <Button onClick={handleClick}>Toggle</Button>
    </Stack>
  );
}

const meta: Meta<typeof Slide> = {
  title: 'Core/Slide',
  component: Slide,
  argTypes: {
    children: {
      description: 'The content to slide in/out.',
      table: {
        type: { summary: 'node' },
      },
    },
    direction: {
      control: { type: 'radio' },
      defaultValue: 'down',
      description: 'Direction the child node will enter from.',
      options: ['down', 'left', 'right', 'up'],
      table: {
        defaultValue: { summary: 'down' },
        type: { summary: 'string' },
      },
    },
    in: {
      control: { type: 'boolean' },
      description: 'If `true`, the component will transition in.',
      table: {
        type: { summary: 'bool' },
        defaultValue: { summary: false },
      },
    },
    timeout: {
      control: { type: 'number' },
      description: 'The duration for the transition, in milliseconds.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 300 },
      },
    },
  },
  render: SlideStory,
  parameters: {
    docs: {
      description: {
        component: 'The Slide component slides in from direction specified.',
      },
    },
  },
};

type Story = StoryObj<typeof Slide>;

const Default: Story = {
  args: {
    children: <span>Content</span>,
  },
};

export { Default };

export default meta;
