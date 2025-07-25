import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import Toolbar from '.';

const meta: Meta<typeof Toolbar> = {
  title: 'Surfaces/Toolbar',
  component: Toolbar,
  decorators: [
    (Story) => (
      // Styles needed to position the toolbar
      <div style={{ margin: '4rem', position: 'relative', bottom: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<typeof Toolbar>;

const Default: Story = {
  args: {
    children: 'Toolbar',
  },
};

export { Default };

export default meta;
