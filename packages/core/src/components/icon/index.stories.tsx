import type { Meta, StoryObj } from '@storybook/react';

import Icon from '.';
import React from 'react';

(Icon as React.FunctionComponent).displayName = 'Icon';

const meta: Meta<typeof Icon> = {
  title: 'Core/Icon',
  component: Icon,
  argTypes: {
    children: {
      description: 'The content of the component.',
      table: {
        disable: true,
        type: { summary: 'node' },
      },
    },
    color: {
      control: 'select',
      defaultValue: 'inherit',
      description: 'The color of the component. ',
      options: [
        'accent01',
        'accent02',
        'accent03',
        'accent04',
        'action',
        'disabled',
        'error',
        'info',
        'inherit',
        'primary',
        'secondary',
        'success',
        'warning',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'inherit' },
      },
    },
    fontSize: {
      control: 'select',
      description: 'The fontSize applied to the icon. Size values are determined by theme config.',
      defaultValue: 'medium',
      options: ['inherit', 'large', 'medium', 'small'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    htmlColor: {
      control: 'color',
      description: 'Applies a color attribute to the SVG element.',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The Icon component provides a wrapper for custom SVG icons. It extends the native `<svg>` element, providing built-in accessibility and convenience props for customizing the icon.',
      },
    },
  },
};

type Story = StoryObj<typeof Icon>;

const Default: Story = {
  args: {
    children: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
    color: 'primary',
  },
};

export { Default };

export default meta;
