import type { Meta, StoryObj } from '@storybook/react';

import CardInputOption from '.';
import React from 'react';

CardInputOption.displayName = 'CardInputOption';

const meta: Meta<typeof CardInputOption> = {
  title: 'Inputs/Card Input Option',
  component: CardInputOption,
  argTypes: {
    image: {
      description: 'The card image.',
      table: {
        type: { summary: 'string | node' },
      },
    },
    label: {
      description: 'The card label.',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      description: 'The card description.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    value: {
      description: 'The card value.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

type Story = StoryObj<typeof CardInputOption>;

const Default: Story = {
  args: {
    description: 'Collaborate with a subject expert in our online workspace.',
    image: '/1-on-1-video-session-icon.svg',
    label: '1-on-1 video session',
    selected: false,
    value: '1-on-1-video-session',
  },
};

const WithSvgImage: Story = {
  args: {
    description: 'Collaborate with a subject expert in our online workspace.',
    image: (
      <svg id="svg-star" viewBox="0 0 220 220">
        <polygon points="100,10 40,198 190,78 10,78 160,198" style={{ fill: 'black' }} />
      </svg>
    ),
    label: '1-on-1 video session',
    selected: false,
    value: '1-on-1-video-session',
  },
};

const WithNoImage: Story = {
  args: {
    description: 'Collaborate with a subject expert in our online workspace.',
    label: '1-on-1 video session',
    selected: false,
    value: '1-on-1-video-session',
  },
};

export { Default, WithNoImage, WithSvgImage };

export default meta;
