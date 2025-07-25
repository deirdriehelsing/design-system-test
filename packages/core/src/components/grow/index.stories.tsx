import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button';
import Grow from '.';
import Paper from '../paper';
import React from 'react';
import Stack from '../stack';

function GrowStory({ children, ...growProps }) {
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Stack>
      <Grow in={checked} {...growProps}>
        <Paper elevation={6} sx={{ p: 2 }}>
          {children}
        </Paper>
      </Grow>

      <Button onClick={handleClick}>Toggle Growth</Button>
    </Stack>
  );
}

const meta: Meta<typeof Grow> = {
  title: 'Core/Grow',
  component: Grow,
  argTypes: {
    children: {
      description: 'The content to grow in/out.',
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
  render: GrowStory,
  parameters: {
    docs: {
      description: {
        component:
          'The Grow component expands outwards from the center of the child element, while also fading in from transparent to opaque.',
      },
    },
  },
};

type Story = StoryObj<typeof Grow>;

const Default: Story = {
  args: {
    children: <span>Content</span>,
  },
};

export { Default };

export default meta;
