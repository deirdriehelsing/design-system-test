import type { Meta, StoryObj } from '@storybook/react';

import BackToTopButton from '.';
import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';

(BackToTopButton as React.FunctionComponent).displayName = 'BackToTopButton';

const meta: Meta<typeof BackToTopButton> = {
  title: 'Navigation/Back-To-Top Button',
  component: BackToTopButton,
  argTypes: {
    targetSelector: {
      description: 'The element selector to target.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Box id="top" />
        Scroll down to see the button…
        <Box sx={{ height: '100vh' }} />
        <Story />
      </>
    ),
  ],
};

type Story = StoryObj<typeof BackToTopButton>;

const Default: Story = {
  args: {
    children: 'Back to top',
  },
};

const WithTargetSelector: Story = {
  args: {
    children: 'Back to top',
    targetSelector: '#top',
  },
};

export { Default, WithTargetSelector };

export default meta;
