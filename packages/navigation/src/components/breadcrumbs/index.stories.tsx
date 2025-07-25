import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from '.';
import Link from '@blueshift-ui/core/dist/components/link';

(Breadcrumbs as React.FunctionComponent).displayName = 'Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    ref: { table: { disable: true } },
    slots: { table: { disable: true } },
    slotProps: { table: { disable: true } },
    sx: { table: { disable: true } },
    className: {
      description: 'CSS class applied to the root element.',
    },
    component: {
      control: false,
      description:
        'The component used for the root node. Either a string to use a HTML element or a component.',
    },
    items: {
      description: 'Breadcrumb items.',
      table: {
        type: { summary: 'BreadcrumbItem[]' },
      },
    },
    style: {
      description: 'The style attribute specifies an inline style for an element.',
    },
  },
};

type Story = StoryObj<typeof Breadcrumbs>;

const Default: Story = {
  args: {
    items: [
      {
        component: Link,
        componentProps: {
          href: '#/math',
        },
        text: 'Math',
      },
      {
        text: 'Algebra',
      },
    ],
  },
};

const WithTooltip: Story = {
  args: {
    ...Default.args,
    items: [
      {
        component: Link,
        componentProps: {
          href: '#/math',
        },
        text: 'Math',
        tooltip: 'Your home for all things Math.',
      },
      {
        text: 'Algebra',
        tooltip: 'Your home for all things Algebra.',
      },
    ],
  },
};

export { Default, WithTooltip };

export default meta;
