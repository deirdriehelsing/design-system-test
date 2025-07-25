import type { Meta, StoryObj } from '@storybook/react';

import Button from '../button';
import Drawer from '.';
import DrawerContent from '../drawer-content';
import DrawerFooter from '../drawer-footer';
import DrawerHeader from '../drawer-header';
import Link from '../link';
import List from '../list';
import React from 'react';

(Drawer as React.FunctionComponent).displayName = 'Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Core/Drawer',
  component: Drawer,
  argTypes: {
    trigger: {
      description: 'Component that will trigger the drawer.',
      table: {
        type: { summary: 'Button' },
      },
    },
    triggerProps: {
      description: 'Button props for the trigger CTA.',
      table: {
        type: { summary: 'ButtonProps' },
      },
    },
    children: {
      description: 'Drawer content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
};

type Story = StoryObj<typeof Drawer>;

const Default: Story = {
  args: {
    trigger: Button,
    triggerProps: { children: 'Open drawer', variant: 'outlined' },
    children: (
      <List
        items={[
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
        ]}
      />
    ),
  },
};

const WithLayout: Story = {
  args: {
    trigger: Button,
    triggerProps: { children: 'Open drawer', variant: 'outlined' },
    children: (
      <>
        <DrawerHeader>
          <h1>Header</h1>
        </DrawerHeader>
        <DrawerContent>Sample content</DrawerContent>
        <DrawerFooter>
          <Button size="small">Button</Button>
        </DrawerFooter>
      </>
    ),
  },
};

export { Default, WithLayout };

export default meta;
