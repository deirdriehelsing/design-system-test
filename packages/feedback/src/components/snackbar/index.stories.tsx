import type { Meta, StoryObj } from '@storybook/react';

import Button from '@blueshift-ui/core/dist/components/button';
import React from 'react';
import Snackbar from '.';
import Stack from '@blueshift-ui/core/dist/components/stack';
import { useArgs } from '@storybook/preview-api';

(Snackbar as React.FunctionComponent).displayName = 'Snackbar';

function SnackbarStory(args) {
  const [, setArgs] = useArgs();

  return (
    <Stack>
      <Button onClick={() => setArgs({ open: true })} variant="outlined">
        Open snackbar
      </Button>

      <Snackbar {...args} onClose={() => setArgs({ open: false })} />
    </Stack>
  );
}

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  render: SnackbarStory,
};

type Story = StoryObj<typeof Snackbar>;

const Default: Story = {
  args: {
    message: 'This is a message!',
  },
};

const Error: Story = {
  args: {
    ...Default.args,
    message: 'This is an error message!',
    severity: 'error',
  },
};

const Info: Story = {
  args: {
    ...Default.args,
    message: 'This is an information message!',
    severity: 'info',
  },
};

const Success: Story = {
  args: {
    ...Default.args,
    message: 'This is a success message!',
    severity: 'success',
  },
};

export { Default, Success, Error, Info };

export default meta;
