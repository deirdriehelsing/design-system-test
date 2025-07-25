import type { Meta, StoryObj } from '@storybook/react';
import type { NavAction } from '@blueshift-ui/core';
import type React from 'react';

import Button from '@blueshift-ui/core/dist/components/button';
import Link from '@blueshift-ui/core/dist/components/link';
import Menu from '.';

(Menu as React.FunctionComponent).displayName = 'Menu';

function mapToActionItems(texts: string[]): NavAction[] {
  return texts.map((text) => ({
    componentProps: {
      href: '#',
    },
    role: 'action',
    text,
  }));
}

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  argTypes: {
    trigger: {
      description: 'CTA that will trigger the menu.',
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
    items: {
      description: 'Menu items.',
      table: {
        type: { summary: 'NavItem[]' },
      },
    },
  },
};

type Story = StoryObj<typeof Menu>;

const Default: Story = {
  args: {
    trigger: Button,
    triggerProps: {
      children: 'Open menu',
      variant: 'outlined',
    },
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

const MultiColumn: Story = {
  args: {
    trigger: Button,
    triggerProps: {
      children: 'Open menu',
      variant: 'outlined',
    },
    items: [
      [
        {
          role: 'subheader',
          text: 'Math',
        },
        ...mapToActionItems([
          'Algebra Tutors',
          'Calculus Tutors',
          'Elementary Math Tutors',
          'Geometry Tutors',
          'Pre-Calculus Tutors',
          'Statistics Tutors',
          'Trigonometry Tutors',
        ]),
      ],
      [
        {
          role: 'subheader',
          text: 'Test Prep',
        },
        ...mapToActionItems([
          'ACT Tutors',
          'ACT English Tutors',
          'ACT Math Tutors',
          'ACT Reading Tutors',
          'ACT Science Tutors',
          'ACT Writing Tutors',
          'AIMS Tutors',
          'ASPIRE Tutors',
          'HSPT Tutors',
          'ISAT Tutors',
        ]),
      ],
      [
        {
          role: 'subheader',
          text: 'Graduate Test Prep',
        },
        ...mapToActionItems(['GMAT Tutors', 'GRE Tutors', 'LSAT Tutors', 'MCAT Tutors']),
        {
          role: 'subheader',
          text: 'Science',
        },
        ...mapToActionItems([
          'Anatomy Tutors',
          'Biology Tutors',
          'Chemistry Tutors',
          'Microbiology Tutors',
          'Organic Chemistry Tutors',
        ]),
      ],
      [
        {
          role: 'subheader',
          text: 'English',
        },
        ...mapToActionItems([
          'College Essay Tutors',
          'English Grammar and Syntax Tutors',
          'Essay Editing Tutors',
          'Phonics Tutors',
          'Reading Tutors',
          'Writing Tutors',
        ]),
        {
          role: 'subheader',
          text: 'Languages',
        },
        ...mapToActionItems([
          'French Tutors',
          'German Tutors',
          'Latin Tutors',
          'Mandarin Chinese Tutors',
          'Spanish Tutors',
        ]),
      ],
    ],
  },
  name: 'Multi-column',
};

const Nested: Story = {
  args: {
    trigger: Button,
    triggerProps: {
      children: 'Open menu',
      variant: 'outlined',
    },
    items: [
      ...mapToActionItems(['K-5 Subjects', 'AP', 'Business', 'Humanities']),
      {
        role: 'nested',
        text: 'Languages',
        items: [
          {
            componentProps: {
              href: '#',
            },
            role: 'action',
            text: 'American Sign Language',
          },
          {
            role: 'nested',
            text: 'French',
            items: mapToActionItems(['Conversation French', 'French 1', 'French 2', 'French 3']),
          },
          {
            role: 'nested',
            text: 'German',
            items: mapToActionItems(['Conversation German', 'German 1', 'German 2', 'German 3']),
          },
          {
            role: 'nested',
            text: 'Latin',
            items: mapToActionItems(['Conversation Latin', 'Latin 1', 'Latin 2', 'Latin 3']),
          },
        ],
      },
      {
        role: 'nested',
        text: 'Mathematics',
        items: [
          {
            role: 'nested',
            text: 'Algebra',
            items: mapToActionItems(['Algebra 1', 'Algebra 2', 'Algebra 3']),
          },
          {
            componentProps: {
              href: '#',
            },
            role: 'action',
            text: 'Arithmetic',
          },
          {
            role: 'nested',
            text: 'Probability',
            items: mapToActionItems(['Probability 1', 'Probability 2', 'Probability 3']),
          },
          {
            role: 'nested',
            text: 'Statistics',
            items: mapToActionItems(['Statistics 1', 'Statistics 2', 'Statistics 3']),
          },
        ],
      },
      ...mapToActionItems(['Science', 'Tech & Engineering']),
    ],
  },
};

const OpenOnHover: Story = {
  args: {
    openOnHover: true,
    trigger: Button,
    triggerProps: {
      children: 'Open menu',
      variant: 'outlined',
    },
    items: Nested?.args?.items,
  },
  name: 'Open on hover',
};

const ItemsWithTooltip: Story = {
  args: {
    ...Default.args,
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
        componentProps: {
          disabled: true,
          href: '#/math/geometry',
        },
        role: 'action',
        text: 'Statistics',
        tooltip: 'Disabled Item with Tooltip',
        tooltipProps: { enterTouchDelay: 0, leaveTouchDelay: 0 },
      },
    ],
  },
  name: 'Items with tooltip',
};

export { Default, MultiColumn, Nested, OpenOnHover, ItemsWithTooltip };

export default meta;
