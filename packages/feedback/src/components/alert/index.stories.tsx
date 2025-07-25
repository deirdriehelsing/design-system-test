import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';
import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import Link from '@blueshift-ui/core/dist/components/link';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';

(Alert as React.FunctionComponent).displayName = 'Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'info', 'success', 'warning'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'success' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'standard', 'text'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'standard' },
      },
    },
  },
};

type Story = StoryObj<typeof Alert>;

const Default: Story = {
  args: {
    children: 'This is a message!',
  },
};

const Custom: StoryObj<typeof Alert> = {
  args: {
    ...Default.args,
    children: (
      <Stack direction="row">
        <Box>
          <p>
            <b>This is a custom message!</b>
          </p>

          <p>It can contain any valid JSX</p>
        </Box>

        <Link color="primary">Or Link</Link>

        <Button color="primary" size="small">
          <b>Or Button</b>
        </Button>
      </Stack>
    ),
    severity: 'info',
    icon: false,
  },
};

const Error: Story = {
  args: {
    ...Default.args,
    children: 'This is an error message!',
    severity: 'error',
  },
};

const Info: Story = {
  args: {
    ...Default.args,
    children: 'This is an information message!',
    severity: 'info',
  },
};

const NoIcon: Story = {
  args: {
    ...Default.args,
    icon: false,
  },
};

const WithTitle: Story = {
  args: {
    ...Default.args,
    title: 'This is a title!',
  },
};

const Success: Story = {
  args: {
    ...Default.args,
    children: 'This is a success message!',
    severity: 'success',
  },
};

const Text: Story = {
  args: {
    ...Default.args,
    children: 'This is a success message!',
    severity: 'success',
    variant: 'text',
  },
};

const Warning: Story = {
  args: {
    ...Default.args,
    children: 'This is an warning message!',
    severity: 'warning',
  },
};

export { Default, Success, Warning, Error, Info, NoIcon, WithTitle, Text, Custom };

export default meta;
