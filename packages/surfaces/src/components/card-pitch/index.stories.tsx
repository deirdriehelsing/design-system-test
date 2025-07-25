import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';

import CardPitch from '.';

(CardPitch as React.FunctionComponent).displayName = 'CardPitch';

const meta: Meta<typeof CardPitch> = {
  title: 'Surfaces/Card Pitch',
  component: CardPitch,
  argTypes: {
    title: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    description: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
  parameters: {
    experimental: true,
  },
};

type Story = StoryObj<typeof CardPitch>;

const Default: Story = {
  args: {
    description:
      'We’ll pair you with a tutor who fits your academic needs and schedule. The right match ensures you receive focused, personalized support.',
    title: 'We’ll Match You with the Best Tutor for Your Needs',
  },
};

export { Default };

export default meta;
