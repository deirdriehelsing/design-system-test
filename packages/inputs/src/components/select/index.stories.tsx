import type { Meta, StoryObj } from '@storybook/react';

import MuiAvatar from '@mui/material/Avatar';
import MuiStack from '@mui/material/Stack';
import React from 'react';
import Select from '.';

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  argTypes: {
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
      description: 'The select input label text',
      table: {
        type: { summary: 'text' },
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['variant'],
    },
  },
};

type Story = StoryObj<typeof Select>;

const Default: Story = {
  args: {
    label: 'Grade',
    labelId: 'label-id',
    options: [
      {
        label: '4th grade',
        value: '4',
      },
      {
        label: '5th grade',
        value: '5',
      },
      {
        label: '6th grade',
        value: '6',
      },
    ],
  },
};

const Active: Story = {
  args: {
    ...Default.args,
    focused: true,
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

const Validation: Story = {
  args: {
    ...Error.args,
    helperText: 'Incorrect entry',
  },
};

const WithCustomOptionRenderer: Story = {
  args: {
    ...Default.args,
    optionComponent: ({ option, selected }) => (
      <MuiStack direction="row" key={option.id ?? option.value} spacing={1}>
        <MuiAvatar>{option.label?.[0]}</MuiAvatar>
        <MuiStack
          direction="column"
          spacing={0}
          style={{ alignItems: 'flex-start' }}
          textAlign="left"
        >
          <span>{option.label}</span>
          <span>Selected: {String(selected)}</span>
        </MuiStack>
      </MuiStack>
    ),
  },
};

const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    defaultValue: '5',
  },
};

const WithDisabledOption: Story = {
  args: {
    ...Default.args,
    options: [
      ...(Default?.args?.options as []),
      {
        label: '7th grade',
        value: '7',
        disabled: true,
      },
    ],
  },
};

const WithPlaceholder: Story = {
  args: {
    ...Default.args,
    label: undefined,
    placeholder: 'Select a grade',
  },
};

export {
  Default,
  WithDefaultValue,
  Active,
  Error,
  Validation,
  Disabled,
  WithDisabledOption,
  WithCustomOptionRenderer,
  WithPlaceholder,
};

export default meta;
