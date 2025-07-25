import type { Meta, StoryObj } from '@storybook/react';

import Box from '@blueshift-ui/core/dist/components/box';
import React from 'react';
import VideoPlayer from '.';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Data Display/Video Player',
  component: VideoPlayer,
  argTypes: {
    currentTime: {
      control: {
        type: 'number',
        min: 0,
      },
    },
    poster: {
      control: {
        type: 'text',
      },
    },
  },
};

type Story = StoryObj<typeof VideoPlayer>;

const Default: Story = {
  args: {
    onEnded: () => console.log('onEnded'),
    onPause: () => console.log('onPause'),
    onPlay: () => console.log('onPlay'),
    onStop: () => console.log('onStop'),
    url: 'https://stream.mux.com/zOUx8nlOzSWZmePj6XJyq2NCdvGUEwnl.m3u8',
  },
  decorators: [
    (Story) => (
      <Box sx={{ aspectRatio: '16 / 9', maxWidth: '100%', overflow: 'hidden', width: '60vw' }}>
        <Story />
      </Box>
    ),
  ],
};

const Rounded: Story = {
  ...Default,
  args: {
    ...Default.args,
    variant: 'rounded',
  },
};

const WithCurrentTime: Story = {
  ...Default,
  args: {
    ...Default.args,
    currentTime: 10,
  },
};

const WithLoadingState: Story = {
  ...Default,
  args: {
    ...Default.args,
    loading: true,
  },
};

const WithPoster: Story = {
  ...Default,
  args: {
    ...Default.args,
    poster: 'https://image.mux.com/zOUx8nlOzSWZmePj6XJyq2NCdvGUEwnl/thumbnail.png',
  },
};

export { Default, Rounded, WithCurrentTime, WithLoadingState, WithPoster };

export default meta;
