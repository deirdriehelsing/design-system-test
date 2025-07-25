import type { Meta, StoryObj } from '@storybook/react';
import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';

import { Broadcast as BroadcastIcon } from '@phosphor-icons/react';
import MediaCard from '.';
import MediaCardAction from '../media-card-action';
import React from 'react';

(MediaCard as React.FunctionComponent).displayName = 'MediaCard';

const meta: Meta<typeof MediaCard> = {
  title: 'Surfaces/Media Card',
  component: MediaCard,
  argTypes: {
    action: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    actionAreaProps: {
      table: {
        type: {
          summary: 'ButtonBaseProps',
        },
      },
    },
    actionDetails: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    description: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    overline: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    progressBarValue: {
      control: { min: 0, max: 100, step: 1, type: 'range' },
      description: 'The value of the progress indicator for the determinate variant.',
      defaultValue: null,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: null },
      },
    },
    thumbnail: {
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

type Story = StoryObj<typeof MediaCard>;

const Default: Story = {
  args: {
    action: (
      <MediaCardAction href="https://en.wikipedia.org/wiki/Tutoring">Register</MediaCardAction>
    ),
    actionDetails: 'Mon, June 15 @ 3:00 PM',
    overline: (
      <>
        <BroadcastIcon /> Live Event
      </>
    ),
    thumbnail: 'nebula.jpg',
    title: 'Star Gazing: experience the blueshift as the universe expands',
    description: 'An interactive art show that unites creativity and connection. ',
  },
};

const Skeleton: Story = {
  args: {
    loading: true,
  },
};

const WithMaxTitleLength: Story = {
  args: {
    action: (
      <MediaCardAction href="https://en.wikipedia.org/wiki/Tutoring">Register</MediaCardAction>
    ),
    actionDetails: 'Mon, June 15 @ 3:00 PM',
    maxTitleLength: 30,
    overline: (
      <>
        <BroadcastIcon /> Live Event
      </>
    ),
    thumbnail: 'nebula.jpg',
    title: 'Star Gazing: experience the blueshift',
    description: 'An interactive art show that unites creativity and connection.',
  },
  name: 'With Max Title Length',
};

const WithLoadingBar: Story = {
  args: {
    action: (
      <MediaCardAction href="https://en.wikipedia.org/wiki/Tutoring">Register</MediaCardAction>
    ),
    overline: (
      <>
        <BroadcastIcon /> Live Event
      </>
    ),
    progressBarValue: 50,
    thumbnail: 'nebula.jpg',
    title: 'Star Gazing: experience the blueshift',
    description: 'An interactive art show that unites creativity and connection.',
  },
  name: 'With Max Title Length',
};

const WithActionArea: Story = {
  args: {
    action: (
      <MediaCardAction href="https://en.wikipedia.org/wiki/Tutoring">Register</MediaCardAction>
    ),
    actionDetails: 'Mon, June 15 @ 3:00 PM',
    overline: (
      <>
        <BroadcastIcon /> Live Event
      </>
    ),
    actionAreaProps: {
      LinkComponent: 'a',
      href: 'https://google.com',
      target: '_blank',
    } as MuiCardActionAreaProps,
    thumbnail: 'nebula.jpg',
    title: 'Star Gazing: experience the blueshift',
    description: <p>An interactive art show that unites creativity and connection.</p>,
  },
  name: 'With Action Area',
};

export { Default, WithActionArea, WithMaxTitleLength, WithLoadingBar, Skeleton };

export default meta;
