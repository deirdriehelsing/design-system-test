import type { Meta, StoryObj } from '@storybook/react';

import { Alien, FlyingSaucer } from '@phosphor-icons/react';
import InputAdornment from '@mui/material/InputAdornment';
import React from 'react';
import TextField from '.';

const meta: Meta<typeof TextField> = {
  title: 'Inputs/Text Field',
  component: TextField,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clearable: {
      control: 'boolean',
      description: 'If true, the component is clearable.',
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
    gradient: {
      control: 'boolean',
      description: 'If true, the component is gradient.',
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
    withEmojiMenu: {
      control: 'boolean',
      description: 'If true, the component will display an Emoji Picker button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
};

type Story = StoryObj<typeof TextField>;

const Default: Story = {
  args: {
    label: 'Label',
  },
};

const Gradient: Story = {
  args: {
    ...Default.args,
    gradient: true,
  },
};

const Active: Story = {
  args: {
    ...Default.args,
    focused: true,
  },
};

const Clearable: Story = {
  args: {
    ...Default.args,
    clearable: true,
  },
};

const ClearableWithEmojiPicker: Story = {
  args: {
    ...Default.args,
    clearable: true,
    withEmojiMenu: true,
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
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Alien />
        </InputAdornment>
      ),
    },
  },
};

const WithAdornment: Story = {
  args: {
    ...Default.args,
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Alien />
        </InputAdornment>
      ),
      startAdornment: (
        <InputAdornment position="start">
          <FlyingSaucer />
        </InputAdornment>
      ),
    },
  },
};

const Validation: Story = {
  args: {
    ...Error.args,
    helperText: 'Incorrect entry',
  },
};

const WithEmojiPicker: Story = {
  args: {
    ...Default.args,
    withEmojiMenu: true,
  },
};

export {
  Default,
  Active,
  Gradient,
  Error,
  Validation,
  Disabled,
  Clearable,
  WithAdornment,
  WithEmojiPicker,
  ClearableWithEmojiPicker,
};

export default meta;
