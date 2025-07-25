import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '.';

(Avatar as React.FunctionComponent).displayName = 'Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
};

type Story = StoryObj<typeof Avatar>;

const Default: Story = {
  args: {
    children: 'AR',
  },
};

const Image: Story = {
  args: {
    src: 'blueshift.jpg',
  },
};

const Subtitle: Story = {
  args: {
    title: 'Gia',
    subtitle: 'Student',
  },
};

const Outlined: Story = {
  args: {
    backgroundVariant: 'outlined',
  },
};

const Title: Story = {
  args: {
    title: 'Gia',
  },
};

const UserName: Story = {
  args: {
    userName: ['Gia', 'Margaret'],
    index: 1,
  },
};

const Rounded: Story = {
  args: {
    children: 'AR',
    variant: 'rounded',
  },
};

export { Default, Rounded, UserName, Image, Outlined, Title, Subtitle };

export default meta;
