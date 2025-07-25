import type { Meta, StoryObj } from '@storybook/react';

import Blob from '.';

const meta: Meta<typeof Blob> = {
  title: 'Core/Blob',
  component: Blob,
  argTypes: {
    animated: {
      control: 'boolean',
      description: 'Whether or not the border radius should be animated.',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    animationDuration: {
      control: 'number',
      description: 'The duration of the animation in milliseconds.',
      defaultValue: 7000,
      table: {
        type: { summary: 'number' },
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
      options: ['aside', 'div', 'section', 'span'],
      table: {
        type: { summary: 'elementType' },
      },
    },
    componentProps: {
      control: 'object',
      description: 'The props to pass to the root node.',
      table: {
        type: { summary: 'oject' },
      },
    },
    cornerWeight: {
      control: 'array',
      defaultValue: [1, 1, 1, 1, 1, 1, 1, 1],
      description:
        'A tuple of eight numbers, with a value from 0 to 1 that each generated corner radius will be multiplied against.',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: [1, 1, 1, 1, 1, 1, 1, 1] },
      },
    },
    range: {
      control: 'array',
      defaultValue: [30, 60],
      description:
        'A tuple of two numbers that represent the min and max range of the generated corner radius before being multiplied by the corner weight.',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: [30, 60] },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'The Blob component applies a random blob-like border radius to any element.',
      },
    },
  },
};

type Story = StoryObj<typeof Blob>;

const Default: Story = {
  args: {
    component: 'img',
    componentProps: {
      alt: '',
      src: 'blueshift.jpg',
    },
  },
};

const Animated: Story = {
  args: {
    ...Default.args,
    animated: true,
  },
};

export { Default, Animated };

export default meta;
