import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import TextArea from '.';

const meta: Meta<typeof TextArea> = {
  title: 'Inputs/Text Area',
  component: TextArea,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      // width is set to display that the text area is contained within the width of the parent
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<typeof TextArea>;

const Default: Story = {
  args: {
    label: 'Text Area Example',
  },
};

const Active: Story = {
  args: {
    ...Default.args,
    focused: true,
  },
};

const Gradient: Story = {
  args: {
    ...Default.args,
    gradient: true,
  },
};

export { Default, Gradient, Active };

export default meta;
