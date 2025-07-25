import type { Meta, StoryObj } from '@storybook/react';

import { ArrowFatDown as ArrowFatDownIcon } from '@phosphor-icons/react';
import Autocomplete from '.';
import React from 'react';

const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  argTypes: {
    allowAnyValue: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the component has an error.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    focused: {
      control: 'boolean',
      description: 'If true, the component is active.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed underneath the input',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: 'text',
      description: 'The input label text',
      table: {
        type: { summary: 'text' },
      },
    },
  },
  parameters: {
    controls: {
      exclude: /(?:\b|')(color|hiddenLabel|size)(?:\b|')/, // TODO: Remove this once prop is properly handled by component
    },
  },
};

type Story = StoryObj<typeof Autocomplete>;

const Default: Story = {
  args: {
    label: 'Subject',
    options: [
      { id: 1, label: 'Science' },
      { id: 2, label: 'Math' },
      { id: 3, label: 'Biology' },
    ],
    InputProps: {
      style: { width: '200px' },
    },
  },
};

const Active: Story = {
  args: {
    ...Default.args,
    focused: true,
  },
};

const AllowAnyValue: Story = {
  args: {
    ...Default.args,
    allowAnyValue: true,
    InputProps: {
      ...Default.args?.InputProps,
    },
  },
};

const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

const Gradient: Story = {
  args: {
    ...Default.args,
    InputProps: {
      ...Default?.args?.InputProps,
      renderInputProps: {
        gradient: true,
      },
    },
  },
};

const Validation: Story = {
  args: {
    ...Error.args,
    helperText: 'Incorrect entry',
    value: { id: 3, label: 'Biology' },
  },
};

const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: { id: 2, label: 'Math' },
  },
};

const WithoutPopupIcon: Story = {
  args: {
    ...Default.args,
    popupIcon: null,
  },
};

const WithCustomPopupIcon: Story = {
  args: {
    ...Default.args,
    popupIcon: <ArrowFatDownIcon />,
  },
};

export {
  Default,
  AllowAnyValue,
  WithDefaultValue,
  Gradient,
  Active,
  Error,
  Validation,
  Disabled,
  WithoutPopupIcon,
  WithCustomPopupIcon,
};

export default meta;
