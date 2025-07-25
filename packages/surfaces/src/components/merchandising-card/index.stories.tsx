import type { Meta, StoryObj } from '@storybook/react';
import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';

import Box from '@blueshift-ui/core/dist/components/box';
import Button from '@blueshift-ui/core/dist/components/button';
import MerchandisingCard from '.';
import React from 'react';

(MerchandisingCard as React.FunctionComponent).displayName = 'MerchandisingCard';

const meta: Meta<typeof MerchandisingCard> = {
  title: 'Surfaces/Merchandising Placement Card',
  component: MerchandisingCard,
  argTypes: {
    headline: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    image: {
      table: {
        type: { summary: 'string' },
      },
    },
    pitch: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

type Story = StoryObj<typeof MerchandisingCard>;

const AmethystVariant: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Browse Subjects
      </Button>
    ),
    headline: 'Write excellent essays with ease',
    image: 'https://llt.imgix.net/v1/1712163644-merchbar_college.png',
    pitch: 'Master the Art of Persuasive Writing with Proven Strategies and Tips',
    variant: 'amethyst',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          minHeight: { xs: '25rem', md: '10rem' },
          padding: { xs: '2rem', lg: 0 },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const CoralVariant: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Browse Subjects
      </Button>
    ),
    headline: 'Write excellent essays with ease',
    image: 'https://llt.imgix.net/v1/1712163644-merchbar_college.png',
    pitch: (
      <div>
        <p>Master the Art of Persuasive Writing with Proven Strategies and Tips</p>
        <p>Master the Art of Persuasive Writing with Proven Strategies and Tips</p>
      </div>
    ),
    variant: 'coral',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          minHeight: { xs: '25rem', md: '10rem' },
          padding: { xs: '2rem', lg: 0 },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const GoldVariant: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Browse Subjects
      </Button>
    ),
    direction: 'vertical',
    headline: 'Write excellent essays with ease',
    image: 'https://llt.imgix.net/v1/1712163644-merchbar_college.png',
    pitch: 'Master the Art of Persuasive Writing with Proven Strategies and Tips',
    variant: 'gold',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          minHeight: { xs: '25rem', md: '10rem' },
          padding: { xs: '2rem', lg: 0 },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const Default: Story = {
  args: {
    action: (
      <Button size="small" variant="outlined">
        Browse Subjects
      </Button>
    ),
    headline: 'Write excellent essays with ease',
    image: 'https://llt.imgix.net/v1/1712163644-merchbar_college.png',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          display: 'flex',
          minHeight: { xs: '25rem', md: '10rem' },
          padding: { xs: '2rem', lg: 0 },
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

const WithActionArea: Story = {
  args: {
    ...Default.args,
    actionAreaProps: {
      LinkComponent: 'a',
      href: 'https://google.com',
      target: '_blank',
    } as MuiCardActionAreaProps,
    pitch: 'Get on-demand, expert essay editing on your essays and term papers.',
  },
  decorators: Default.decorators,
  name: 'With Action Area',
};

const WithPitch: Story = {
  args: {
    ...Default.args,
    pitch: 'Get on-demand, expert essay editing on your essays and term papers.',
  },
  decorators: Default.decorators,
  name: 'With Pitch',
};

const WithRichTextPitch: Story = {
  args: {
    ...Default.args,
    pitch: {
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
  },
  decorators: Default.decorators,
  name: 'With Rich Text Pitch',
};

export {
  AmethystVariant,
  CoralVariant,
  GoldVariant,
  Default,
  WithActionArea,
  WithPitch,
  WithRichTextPitch,
};

export default meta;
