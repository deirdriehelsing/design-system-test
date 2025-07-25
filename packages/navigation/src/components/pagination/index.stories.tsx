import type { Meta, StoryObj } from '@storybook/react';

import Pagination from '.';

(Pagination as React.FunctionComponent).displayName = 'Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  argTypes: {
    boundaryCount: {
      control: { min: 1, max: 10, step: 1, type: 'range' },
      description: 'Number of always visible pages at the beginning and end.',
      defaultValue: 1,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    count: {
      control: { min: 1, max: 20, step: 1, type: 'range' },
      description: 'The total number of pages.',
      defaultValue: 10,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    defaultPage: {
      control: { min: 1, max: 20, step: 1, type: 'range' },
      description: 'The page selected by default when the component is uncontrolled.',
      defaultValue: 1,
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hideNextButton: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, hide the next-page button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hidePrevButton: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, hide the prev-page button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    shape: {
      control: 'radio',
      options: ['circular', 'rounded'],
      defaultValue: 'circular',
      description: 'The shape to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'circular' },
      },
    },
    showFirstButton: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, show the first-page button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showLastButton: {
      control: 'boolean',
      defaultValue: false,
      description: 'If true, show the last-page button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      description: 'The size of the component.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'radio',
      options: ['text', 'outlined'],
      defaultValue: 'text',
      description: 'The variant to use.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
  },
};

type Story = StoryObj<typeof Pagination>;

const Default: Story = {
  args: {
    count: 10,
  },
};

export { Default };

export default meta;
