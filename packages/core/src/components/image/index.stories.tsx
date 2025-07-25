import type { Meta, StoryObj } from '@storybook/react';

import Image from '.';
import React from 'react';

const meta: Meta<typeof Image> = {
  component: Image,
  title: 'Core/Image',
};

type Story = StoryObj<typeof Image>;

const Default: Story = {
  args: {
    alt: 'Sample image',
    height: 300,
    src: 'https://picsum.photos/300/300',
    width: 300,
    loading: 'eager',
  },
};

const LazyLoaded: Story = {
  args: {
    ...Default.args,
    alt: 'Lazy loaded image',
    src: 'https://picsum.photos/300/300?random=1',
    loading: 'lazy',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column-reverse', height: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

const LazyLoadedBackground: Story = {
  args: {
    ...Default.args,
    alt: 'Lazy loaded image',
    src: undefined,
    style: { backgroundImage: 'url(https://picsum.photos/300/300?random=1)' },
    loading: 'lazy',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column-reverse', height: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

export { Default, LazyLoaded, LazyLoadedBackground };

export default meta;
