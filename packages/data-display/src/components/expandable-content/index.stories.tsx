import type { Meta, StoryObj } from '@storybook/react';

import ExpandableContent from '.';
import React from 'react';

const meta: Meta<typeof ExpandableContent> = {
  title: 'Data Display/Expandable Content',
  component: ExpandableContent,
  parameters: {
    docs: {
      description: {
        component:
          'The ExpandableContent component builds upon the Collapse component to define a controller that expands and collapses a container.',
      },
    },
  },
};

type Story = StoryObj<typeof ExpandableContent>;

const Default: Story = {
  args: {
    ariaLabel: 'expandable-content',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed orci facilisis, dictum neque ac, auctor velit. Phasellus vitae nisl finibus diam consectetur elementum. Quisque elit diam, eleifend quis sem et, sollicitudin laoreet orci. Sed vitae dui velit. Aenean consequat mollis magna eu tristique. Aliquam vestibulum a purus vitae sodales. Vivamus eu sem porttitor, accumsan sapien a, placerat dui. Fusce ornare, lorem sed convallis varius, arcu sapien dictum tellus, at bibendum diam tortor vitae nisl. Donec non iaculis odio, eget pulvinar lorem.',
    defaultExpanded: false,
    id: 'expandable-content',
    onExpandToggle: (expanded) => console.log('Expanded', expanded),
  },
  render: function Render(args) {
    return <ExpandableContent {...args} />;
  },
};

export { Default };

export default meta;
