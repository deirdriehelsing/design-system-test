import type { Meta, StoryObj } from '@storybook/react';

import AppBar from '.';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';

(AppBar as React.FunctionComponent).displayName = 'AppBar';

const meta: Meta<typeof AppBar> = {
  title: 'Surfaces/App Bar',
  component: AppBar,
  decorators: [
    (Story) => (
      <Box sx={{ margin: '4rem', position: 'relative', bottom: '2rem' }}>
        <Story />
      </Box>
    ),
  ],
};

type Story = StoryObj<typeof AppBar>;

const Default: Story = {
  args: {
    children: 'Text or components...',
  },
};

export { Default };

export default meta;
