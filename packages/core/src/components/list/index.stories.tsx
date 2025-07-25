import type { Meta, StoryObj } from '@storybook/react';

import Box from '../box';
import Link from '../link';
import List from '.';
import React from 'react';

(List as React.FunctionComponent).displayName = 'List';

const meta: Meta<typeof List> = {
  title: 'Core/List',
  component: List,
  argTypes: {
    items: {
      description: 'Nav items',
      table: {
        type: { summary: 'NavItem[]' },
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '312px' }}>
        <Story />
      </Box>
    ),
  ],
};

type Story = StoryObj<typeof List>;

const Default: Story = {
  args: {
    items: [
      {
        component: Link,
        componentProps: {
          href: '#/math/algebra',
        },
        role: 'action',
        text: 'Algebra',
      },
      {
        componentProps: {
          href: '#/math/geometry',
        },
        role: 'action',
        text: 'Geometry',
      },
      {
        role: 'divider',
      },
      {
        role: 'subheader',
        text: 'Advanced',
      },
      {
        componentProps: {
          href: '#/math/trigonometry',
        },
        role: 'action',
        text: 'Trigonometry',
      },
      {
        componentProps: {
          href: '#/math/calculus',
        },
        role: 'action',
        text: 'Calculus',
      },
    ],
  },
};

const ItemsWithTooltip: Story = {
  args: {
    items: [
      {
        component: Link,
        componentProps: {
          href: '#/math/algebra',
        },
        role: 'action',
        text: 'Algebra',
        tooltip: 'Basic Tooltip',
      },
      {
        componentProps: {
          href: '#/math/geometry',
        },
        role: 'action',
        text: 'Geometry',
        tooltip: 'Tooltip with Props',
        tooltipProps: { color: 'info', placement: 'left' },
      },
      {
        role: 'divider',
      },
      {
        role: 'subheader',
        text: 'Advanced',
      },
      {
        componentProps: {
          disabled: true,
          href: '#/math/trigonometry',
        },
        role: 'action',
        text: 'Trigonometry',
        tooltip: 'Disabled Item with Tooltip with Props',
        tooltipProps: { enterTouchDelay: 0, leaveTouchDelay: 0 },
      },
    ],
  },
};

const Nested: Story = {
  args: {
    items: [
      {
        role: 'nested',
        text: 'Subjects',
        items: [
          {
            role: 'nested',
            text: 'Math',
            items: [
              {
                component: Link,
                componentProps: {
                  href: '#/math/algebra',
                },
                role: 'action',
                text: 'Algebra',
              },
              {
                componentProps: {
                  href: '#/math/geometry',
                },
                role: 'action',
                text: 'Geometry',
              },
              {
                componentProps: {
                  href: '#/math/trigonometry',
                },
                role: 'action',
                text: 'Trigonometry',
              },
              {
                componentProps: {
                  href: '#/math/calculus',
                },
                role: 'action',
                text: 'Calculus',
              },
            ],
          },
          {
            role: 'nested',
            text: 'Science',
            items: [
              {
                componentProps: {
                  href: '#/science/biology',
                },
                role: 'action',
                text: 'Biology',
              },
              {
                componentProps: {
                  href: '#/science/chemistry',
                },
                role: 'action',
                text: 'Chemistry',
              },
              {
                componentProps: {
                  href: '#/science/physics',
                },
                role: 'action',
                text: 'Physics',
              },
              {
                componentProps: {
                  href: '#/science/earth-science',
                },
                role: 'action',
                text: 'Earth Science',
              },
            ],
          },
          {
            role: 'nested',
            text: 'Languages',
            items: [
              {
                componentProps: {
                  href: '#/languages/spanish',
                },
                role: 'action',
                text: 'Spanish',
              },
              {
                componentProps: {
                  href: '#/languages/french',
                },
                role: 'action',
                text: 'French',
              },
              {
                componentProps: {
                  href: '#/languages/german',
                },
                role: 'action',
                text: 'German',
              },
              {
                componentProps: {
                  href: '#/languages/chinese',
                },
                role: 'action',
                text: 'Chinese',
              },
            ],
          },
        ],
      },
    ],
  },
};

export { Default, Nested, ItemsWithTooltip };

export default meta;
