import type { Meta, StoryObj } from '@storybook/react';

import Typography from '.';

(Typography as React.FunctionComponent).displayName = 'Typography';

const meta: Meta<typeof Typography> = {
  title: 'Theme/Typography',
  component: Typography,
  argTypes: {
    align: {
      control: 'select',
      defaultValue: 'inherit',
      description: 'Set the text-align on the component.',
      options: ['center', 'inherit', 'justify', 'left', 'right'],
      table: {
        defaultValue: { summary: 'inherit' },
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'The content of the component.',
      table: {
        type: { summary: 'node' },
      },
    },
    component: {
      control: 'select',
      description:
        'The component used for the root node. Either a string to use a HTML element or a component.',
      options: ['h1', 'h2', 'h3', 'p', 'span'],
      table: {
        type: { summary: 'elementType' },
      },
    },
    noWrap: {
      control: 'boolean',
      defaultValue: false,
      description:
        'If true, the text will not wrap, but instead will truncate with a text overflow ellipsis. Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow).',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    variant: {
      control: 'select',
      defaultValue: 'bodyMedium',
      description: 'Applies the theme typography styles.',
      options: [
        'bodyLarge',
        'bodyLargeProminent',
        'bodyMedium',
        'bodyMediumProminent',
        'bodySmall',
        'displayLarge',
        'displayMedium',
        'displaySmall',
        'headlineLarge',
        'headlineMedium',
        'headlineSmall',
        'labelLarge',
        'labelLargeProminent',
        'labelMedium',
        'labelMediumProminent',
        'labelSmall',
        'labelSmallProminent',
        'titleLarge',
        'titleLargeProminent',
        'titleMedium',
        'titleMediumProminent',
        'titleSmall',
        'titleSmallProminent',
      ],
      table: {
        defaultValue: { summary: 'bodyMedium' },
        type: { summary: 'elementType' },
      },
    },
  },
};

type Story = StoryObj<typeof Typography>;

const BodyLarge: Story = {
  args: {
    children: 'The quick brown fox jumped over the lazy dogs.',
    variant: 'bodyLarge',
  },
};

const BodyLargeProminent: Story = {
  args: {
    children: 'Amazingly few discotheques provide jukeboxes.',
    variant: 'bodyLargeProminent',
  },
};

const BodyMedium: Story = {
  args: {
    children: 'Painful zombies quickly watch a jinxed graveyard.',
    variant: 'bodyMedium',
  },
};

const BodyMediumProminent: Story = {
  args: {
    children: 'Sixty zips were quickly picked from the woven jute bag. ',
    variant: 'bodyMediumProminent',
  },
};

const BodySmall: Story = {
  args: {
    children: 'By Jove, my quick study of lexicography won a prize.',
    variant: 'bodySmall',
  },
};

const DisplayLarge: Story = {
  args: {
    children: 'My faxed joke won a pager in the cable TV quiz show.',
    variant: 'displayLarge',
  },
};

const DisplayMedium: Story = {
  args: {
    children: 'Few black taxis drive up major roads on quiet hazy nights.',
    variant: 'displayMedium',
  },
};

const DisplaySmall: Story = {
  args: {
    children: 'Prating jokers quizzically vexed me with fibs.',
    variant: 'displaySmall',
  },
};

const HeadlineLarge: Story = {
  args: {
    children: 'Pack my red box with five dozen quality jugs.',
    variant: 'headlineLarge',
  },
};

const HeadlineMedium: Story = {
  args: {
    children: 'Heavy boxes perform quick waltzes and jigs.',
    variant: 'headlineMedium',
  },
};

const HeadlineSmall: Story = {
  args: {
    children: 'Waxy and quivering, jocks fumble the pizza.',
    variant: 'headlineSmall',
  },
};

const LabelLarge: Story = {
  args: {
    children: 'Quizzical twins proved my hijack-bug fix.',
    variant: 'labelLarge',
  },
};

const LabelLargeProminent: Story = {
  args: {
    children: 'The quick brown fox jumped over the lazy dogs.',
    variant: 'labelLargeProminent',
  },
};

const LabelMedium: Story = {
  args: {
    children: 'Amazingly few discotheques provide jukeboxes.',
    variant: 'labelMedium',
  },
};

const LabelMediumProminent: Story = {
  args: {
    children: 'Painful zombies quickly watch a jinxed graveyard.',
    variant: 'labelMediumProminent',
  },
};

const LabelSmall: Story = {
  args: {
    children: 'Sixty zips were quickly picked from the woven jute bag. ',
    variant: 'labelSmall',
  },
};

const LabelSmallProminent: Story = {
  args: {
    children: 'By Jove, my quick study of lexicography won a prize.',
    variant: 'labelSmallProminent',
  },
};

const TitleLarge: Story = {
  args: {
    children: 'My faxed joke won a pager in the cable TV quiz show.',
    variant: 'titleLarge',
  },
};

const TitleLargeProminent: Story = {
  args: {
    children: 'Few black taxis drive up major roads on quiet hazy nights.',
    variant: 'titleLargeProminent',
  },
};

const TitleMedium: Story = {
  args: {
    children: 'Prating jokers quizzically vexed me with fibs.',
    variant: 'titleMedium',
  },
};

const TitleMediumProminent: Story = {
  args: {
    children: 'Pack my red box with five dozen quality jugs.',
    variant: 'titleMediumProminent',
  },
};

const TitleSmall: Story = {
  args: {
    children: 'Heavy boxes perform quick waltzes and jigs.',
    variant: 'titleSmall',
  },
};

const TitleSmallProminent: Story = {
  args: {
    children: 'Waxy and quivering, jocks fumble the pizza.',
    variant: 'titleSmallProminent',
  },
};

export {
  BodyLarge,
  BodyLargeProminent,
  BodyMedium,
  BodyMediumProminent,
  BodySmall,
  DisplayLarge,
  DisplayMedium,
  DisplaySmall,
  HeadlineLarge,
  HeadlineMedium,
  HeadlineSmall,
  LabelLarge,
  LabelLargeProminent,
  LabelMedium,
  LabelMediumProminent,
  LabelSmall,
  LabelSmallProminent,
  TitleLarge,
  TitleLargeProminent,
  TitleMedium,
  TitleMediumProminent,
  TitleSmall,
  TitleSmallProminent,
};

export default meta;
