import type { Meta, StoryObj } from '@storybook/react';

import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import Carousel from '.';
import Chip from '@blueshift-ui/core/dist/components/chip';
import Link from '@blueshift-ui/core/dist/components/link';
import React from 'react';

(Carousel as React.FunctionComponent).displayName = 'Carousel';

const images = [
  {
    label: 'In orbit',
    imgPath:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Earth as night',
    imgPath:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'The moon',
    imgPath:
      'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Astronaut',
    imgPath:
      'https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Colorful galaxy',
    imgPath:
      'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Wings of Orion',
    imgPath:
      'https://images.unsplash.com/photo-1608178398319-48f814d0750c?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const typographyVariantOptions = [
  'body1',
  'body2',
  'bodyLarge',
  'bodyLargeProminent',
  'bodyMedium',
  'bodyMediumProminent',
  'bodySmall',
  'button',
  'caption',
  'displayLarge',
  'displayMedium',
  'displaySmall',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'headlineLarge',
  'headlineMedium',
  'headlineSmall',
  'inherit',
  'labelLarge',
  'labelLargeProminent',
  'labelMedium',
  'labelMediumProminent',
  'labelSmall',
  'labelSmallProminent',
  'overline',
  'subtitle1',
  'subtitle2',
  'titleLarge',
  'titleLargeProminent',
  'titleMedium',
  'titleMediumProminent',
  'titleSmall',
  'titleSmallProminent',
];

const meta: Meta<typeof Carousel> = {
  argTypes: {
    descriptionVariant: {
      control: 'select',
      options: typographyVariantOptions,
    },
    titleVariant: {
      control: 'select',
      options: typographyVariantOptions,
    },
  },
  component: Carousel,
  title: 'Data Display/Carousel',
};

type Story = StoryObj<typeof Carousel>;

const Default: Story = {
  args: {
    title: 'Space is the place',
    description:
      'Space is a realm of immense scale and mystery, inspiring us to reach for the stars and expand our understanding of the universe.',
    items: images.map((item) => (
      <Box
        alt={item.label}
        component="img"
        key={item.label}
        src={item.imgPath}
        sx={{
          display: 'block',
          height: 255,
          maxWidth: 400,
          width: '100%',
        }}
      />
    )),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const SideArrowControls: Story = {
  args: {
    ...Default.args,
    controlsVariant: 'sideArrows',
    description: null,
    title: null,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const Chips: Story = {
  args: {
    ...Default.args,
    controlsVariant: 'sideArrows',
    description: null,
    items: images.map((item) => <Chip key={item.label} label={item.label} variant="link" />),
    title: null,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const DisabledOutOfView: Story = {
  args: {
    ...Default.args,
    description: <p>You cannot tab to buttons that are outside the field of view.</p>,
    disableOutOfView: true,
    items: images.map((item) => (
      <Box key={item.label}>
        <Box
          alt={item.label}
          component="img"
          src={item.imgPath}
          sx={{
            display: 'block',
            height: 255,
            marginBottom: '0.5rem',
            maxWidth: 400,
            width: '100%',
          }}
        />
        <Button>NASA</Button>
      </Box>
    )),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const LargeViewport: Story = {
  args: {
    ...Default.args,
    description: <p>Space inspires us to expand our understanding of the universe.</p>,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const LinkedTitle: Story = {
  args: {
    ...Default.args,
    description: <p>Space inspires us to expand our understanding of the universe.</p>,
    title: (
      <Link href="https://www.nasa.gov" target="_blank">
        Space is the place
      </Link>
    ),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const LongLinkedTitle: Story = {
  args: {
    ...Default.args,
    description: <p>Space inspires us to expand our understanding of the universe.</p>,
    title: (
      <Link href="https://www.nasa.gov" target="_blank">
        Space inspires us to expand our understanding of the universe
      </Link>
    ),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const LinkedTitleAndTabbableItems: Story = {
  args: {
    ...Default.args,
    title: (
      <Link href="https://www.nasa.gov" target="_blank">
        Space is the place
      </Link>
    ),
    items: images.map((item) => (
      <Box key={item.label}>
        <Box
          alt={item.label}
          component="img"
          src={item.imgPath}
          sx={{
            display: 'block',
            height: 255,
            marginBottom: '0.5rem',
            maxWidth: 400,
            width: '100%',
          }}
        />
        <Button>Hubble</Button>
      </Box>
    )),
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

const SmallViewport: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
  decorators: [
    (Story) => (
      <Box sx={{ overflow: 'hidden', width: '400px' }}>
        <Story />
      </Box>
    ),
  ],
};

const NoTitleOrDescription: Story = {
  args: {
    ...Default.args,
    description: null,
    title: '',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '954px', overflow: 'hidden', width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

export {
  Default,
  SideArrowControls,
  Chips,
  LargeViewport,
  SmallViewport,
  LinkedTitle,
  LongLinkedTitle,
  NoTitleOrDescription,
  LinkedTitleAndTabbableItems,
  DisabledOutOfView,
};

export default meta;
