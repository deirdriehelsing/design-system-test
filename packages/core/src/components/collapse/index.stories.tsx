import type { Meta, StoryObj } from '@storybook/react';

import Collapse from '.';

const meta: Meta<typeof Collapse> = {
  title: 'Core/Collapse',
  component: Collapse,
  argTypes: {
    addEndListener: {
      description:
        'Add a custom transition end trigger. Called with the transitioning DOM node and a done callback. Allows for more fine grained transition end logic. Note: Timeouts are still used as a fallback if provided.',
      table: {
        type: { summary: 'function' },
      },
      type: 'function',
    },
    children: {
      description: 'The content node to be collapsed.',
      table: {
        type: { summary: 'node' },
      },
    },
    classes: {
      control: 'object',
      description: 'Override or extend the styles applied to the component.',
      table: {
        type: { summary: 'object' },
      },
    },
    collapsedSize: {
      control: 'text',
      description: 'The width (horizontal) or height (vertical) of the container when collapsed.',
      table: {
        defaultValue: { summary: '0px' },
        type: { summary: 'string | number' },
      },
    },
    component: {
      control: 'select',
      description:
        'The component used for the root node. Either a string to use a HTML element or a component. This needs to be able to hold a ref',
      options: ['div', 'section', 'span'],
      table: {
        type: { summary: 'elementType' },
      },
    },
    easing: {
      description:
        'The transition timing function. You may specify a single easing or a object containing enter and exit values.',
      table: {
        type: { summary: '{ enter?: string, exit?: string } | string' },
      },
    },
    in: {
      control: 'boolean',
      description: 'If true, the component will transition in.',
      table: {
        type: { summary: 'bool' },
      },
    },
    orientation: {
      control: 'radio',
      description: 'The transition orientation.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: 'horizontal | vertical' },
      },
    },
    sx: {
      control: 'object',
      description:
        'The system prop that allows defining system overrides as well as additional CSS styles.',
      table: {
        type: { summary: 'Array<func | object | bool> | func | object' },
      },
    },
    timeout: {
      description:
        "The duration for the transition, in milliseconds. You may specify a single timeout for all transitions, or individually with an object. Set to 'auto' to automatically calculate transition time based on height.",
      table: {
        defaultValue: { summary: 'duration.standard' },
        type: { summary: "'auto' | number | { appear?: number, enter?: number, exit?: number }" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Collapse component serves as a wrapper component. The props of the Transition component from react-transition-group are also available in Collapse. https://reactcommunity.org/react-transition-group/transition/#Transition-props',
      },
    },
  },
};

type Story = StoryObj<typeof Collapse>;

const Default: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed orci facilisis, dictum neque ac, auctor velit. Phasellus vitae nisl finibus diam consectetur elementum. Quisque elit diam, eleifend quis sem et, sollicitudin laoreet orci. Sed vitae dui velit. Aenean consequat mollis magna eu tristique. Aliquam vestibulum a purus vitae sodales. Vivamus eu sem porttitor, accumsan sapien a, placerat dui. Fusce ornare, lorem sed convallis varius, arcu sapien dictum tellus, at bibendum diam tortor vitae nisl. Donec non iaculis odio, eget pulvinar lorem.',
    in: true,
  },
};

export { Default };

export default meta;
