import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import CopyButton from '.';
import TextField from '../../../dist/components/text-field';

function Container({ Component, ...props }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '50vh',
      }}
    >
      <TextField onChange={(event) => setInputValue(event.target.value)} value={inputValue} />
      <Component {...props} value={inputValue}>
        Copy
      </Component>
    </div>
  );
}

const meta: Meta<typeof CopyButton> = {
  args: {
    onCopy: (value: string) => alert(`Copied '${value}' to clipboard`),
  },
  component: CopyButton,
  parameters: {
    docs: {
      description: {
        component:
          'The Copy Button component allows the user to copy arbitrary values to the clipboard',
      },
    },
  },
  title: 'Inputs/Copy Button',
};

type Story = StoryObj<typeof CopyButton>;

const Default: Story = {
  render: (args) => <Container Component={CopyButton} {...args} />,
};

const WithTextFeedback: Story = {
  render: (args) => (
    <Container
      Component={CopyButton}
      copiedFallback="Copied!"
      disableErrorFeedback
      disableSuccessFeedback
      errorFallback="Failed to copy"
      {...args}
    />
  ),
};

export { Default, WithTextFeedback };

export default meta;
