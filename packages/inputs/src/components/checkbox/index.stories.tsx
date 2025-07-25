import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      control: 'select',
      options: ['accent01', 'accent02', 'accent03', 'accent04', 'primary', 'secondary'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'secondary' },
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

type Story = StoryObj<typeof Checkbox>;

const Default: Story = {};

const Primary: Story = {
  args: {
    defaultChecked: true,
    color: 'primary',
    size: 'small',
    onChange: (event) => console.log(event.target.checked),
  },
};
export { Default, Primary };

export default meta;
