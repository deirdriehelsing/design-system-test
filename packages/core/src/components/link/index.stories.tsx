import type { Meta, StoryObj } from '@storybook/react';

import Link from '.';
import React from 'react';

(Link as React.FunctionComponent).displayName = 'Link';

function CustomLink({ to }: { to: string }) {
  return <a href={to}>Button</a>;
}

const meta: Meta<typeof Link> = {
  title: 'Core/Link',
  component: Link,
  argTypes: {
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
      options: ['a', 'button'],
      table: {
        type: { summary: 'elementType' },
      },
    },
    underline: {
      control: 'select',
      defaultValue: 'always',
      description: 'Controls when the link should have an underline.',
      options: ['always', 'hover', 'none'],
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'always' },
      },
    },
    variant: {
      control: 'select',
      defaultValue: 'inherit',
      description: 'Applies the theme typography styles.',
      options: [
        'bodyMedium',
        'bodySmall',
        'labelLarge',
        'caption',
        'displayLarge',
        'displayMedium',
        'displaySmall',
        'headlineLarge',
        'headlineMedium',
        'headlineSmall',
        'inherit',
        'labelMedium',
        'titleLarge',
        'titleMedium',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inherit' },
      },
    },
  },
};

type Story = StoryObj<typeof Link>;

const Default: Story = {
  args: {
    children: 'Primary Link',
  },
};

const AlwaysUnderlined: Story = {
  args: {
    children: 'Always Underlined Link',
    underline: 'always',
  },
};

const UnderlinedOnHover: Story = {
  args: {
    children: 'Underlined on Hover Link',
    underline: 'hover',
  },
};

const NeverUnderlined: Story = {
  args: {
    children: 'Never Underlined Link',
    underline: 'none',
  },
};

const WithLineBreak: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '256px' }}>
        <Story />
      </div>
    ),
  ],
};

const CustomComponent: Story = {
  args: {
    component: CustomLink,
    children: 'Custom Link',
    to: 'https://www.varsitytutors.com/',
  },
};

export {
  Default,
  AlwaysUnderlined,
  UnderlinedOnHover,
  NeverUnderlined,
  WithLineBreak,
  CustomComponent,
};

export default meta;
