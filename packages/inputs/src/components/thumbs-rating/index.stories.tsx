import type { Meta, StoryObj } from '@storybook/react';

import ThumbsRating from '.';

const meta: Meta<typeof ThumbsRating> = {
  title: 'Inputs/Thumbs Rating',
  component: ThumbsRating,
  argTypes: {
    defaultValue: {
      control: { type: 'radio' },
      defaultValue: null,
      description: 'The input default value.',
      options: ['up', 'down'],
      table: {
        defaultValue: { summary: 'up' },
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed underneath the input',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'radio' },
      defaultValue: null,
      description: 'The input value. Takes precedence over defaultValue.',
      options: ['up', 'down'],
      table: {
        defaultValue: { summary: 'up' },
        type: { summary: 'string' },
      },
    },
  },
};

type Story = StoryObj<typeof ThumbsRating>;

const Default: Story = {
  args: {},
};

const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: 'up',
  },
};

const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'Thumbs Rating Helper Text',
  },
};

const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Thumbs Rating Label',
  },
};

const WithTooltip: Story = {
  args: {
    ...Default.args,
    upTooltipProps: { title: 'Up tooltip' },
    downTooltipProps: { title: 'Down tooltip' },
  },
};

export { Default, Disabled, WithDefaultValue, WithHelperText, WithLabel, WithTooltip };

export default meta;
