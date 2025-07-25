import type { Meta, StoryObj } from '@storybook/react';

import ActionCard from '.';
import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import { Chat as ChatIcon } from '@phosphor-icons/react';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react';
import React from 'react';
import { Smiley as SmileyIcon } from '@phosphor-icons/react';

(ActionCard as React.FunctionComponent).displayName = 'ActionCard';

const meta: Meta<typeof ActionCard> = {
  title: 'Surfaces/Action Card',
  component: ActionCard,
  argTypes: {
    headline: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    image: {
      table: {
        type: { summary: 'string | React.ReactNode' },
      },
    },
    alt: {
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    variant: {
      control: 'select',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'error',
        'primary',
        'secondary',
        'success',
        'tertiary',
        'warning',
        'neutral',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
  },
};

type Story = StoryObj<typeof ActionCard>;

const Default: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Ask a question
      </Button>
    ),
    headline: 'Ask our AI Tutor',
    image: <ChatIcon size={26} />,
    alt: 'image_svg',
    variant: 'accent03',
    description: 'Homework helper. Study buddy. Convo assistant. How will you use AI Tutor?',
  },
  decorators: [
    (Story) => (
      <Box
        id="storybox"
        sx={{
          display: 'flex',
          padding: { xs: '2rem', lg: 0 },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const AmethistVariant: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Start a session
      </Button>
    ),
    headline: 'Get instant help',
    image: <PencilSimpleIcon size={26} />,
    description: 'Need help right away? Meet with a live tutor for a 1-on-1 session now.',
    variant: 'accent01',
  },
  decorators: Default.decorators,
  name: 'Accent01 Background',
};

const CoralVariant: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Request a tutor
      </Button>
    ),
    headline: 'Match with a tutor',
    image: <ChatIcon size={26} />,
    description: 'Maximize your potential, connect with an expert selected to meet your needs.',
    variant: 'accent02',
  },
  decorators: Default.decorators,
  name: 'Accent02 Background',
};

const WithoutCTA: Story = {
  args: {
    action: null,
    headline: 'Join live classes',
    image: <SmileyIcon size={26} />,
    variant: 'accent03',
  },
  decorators: Default.decorators,
};

const WithoutDescription: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Browse classes
      </Button>
    ),
    headline: 'Join live classes',
    image: <SmileyIcon size={26} />,
    variant: 'primary',
  },
  decorators: Default.decorators,
};

const WithRichTextDescription: Story = {
  args: {
    ...Default.args,
    description: {
      value: {
        schema: 'dast',
        document: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'span',
                  value: 'Get on-demand, ',
                },
                {
                  type: 'span',
                  marks: ['strong'],
                  value: 'expert essay editing',
                },
                {
                  type: 'span',
                  value: ' on your essays and term papers.',
                },
              ],
            },
          ],
        },
      },
    },
    variant: 'accent04',
  },
  decorators: Default.decorators,
  name: 'With Rich Text description',
};

export { AmethistVariant, CoralVariant, WithoutCTA, WithoutDescription, WithRichTextDescription };

export default meta;
