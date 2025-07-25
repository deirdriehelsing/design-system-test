import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button';
import Fade from '.';
import Paper from '../paper';
import React from 'react';
import Stack from '../stack';

function FadeStory(props) {
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Stack>
      <Fade in={checked} {...props}>
        <Paper elevation={6} sx={{ p: 2 }}>
          {props.children}
        </Paper>
      </Fade>
      <Button onClick={handleClick}>Toggle</Button>
    </Stack>
  );
}

const meta: Meta<typeof Fade> = {
  title: 'Core/Fade',
  component: Fade,
  argTypes: {
    children: {
      description: 'The content to fade in/out.',
      table: {
        type: { summary: 'node' },
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
  render: FadeStory,
  parameters: {
    docs: {
      description: {
        component: 'The Fade component fades in from transparent to opaque.',
      },
    },
  },
};

type Story = StoryObj<typeof Fade>;

const Default: Story = {
  args: {
    children: <span>Content</span>,
  },
};

export { Default };

export default meta;
