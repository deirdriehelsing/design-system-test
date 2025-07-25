import type { Meta, StoryObj } from '@storybook/react';

import Rating from '.';

const meta: Meta<typeof Rating> = {
  title: 'Inputs/Rating',
  component: Rating,
  argTypes: {
    color: {
      control: 'select',
      options: ['accent01', 'accent02', 'accent03', 'accent04', 'default', 'primary'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'If true, the rating cannot be changed.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
  },
};

type Story = StoryObj<typeof Rating>;

const Default: Story = {
  args: {
    label: 'Label',
  },
};

const Active: Story = {
  args: {
    ...Default.args,
    focused: true,
  },
};

const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
    value: 3,
  },
};

const Primary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
    value: 3,
  },
};

export { Active, Default, Disabled, Primary, ReadOnly };

export default meta;
