import type { Meta, StoryObj } from '@storybook/react';

import Button from '@blueshift-ui/core/dist/components/button';
import { Controller } from '..';
import FormDialog from '.';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import { useArgs } from '@storybook/preview-api';
import { useForm } from '../../hooks';

(FormDialog as React.FunctionComponent).displayName = 'FormDialog';

function FormDialogStory(args) {
  const [, setArgs] = useArgs();
  const form = useForm();

  return (
    <>
      <Button onClick={() => setArgs({ open: true })} variant="outlined">
        Open FormDialog
      </Button>

      <FormDialog
        cancelText="Cancel"
        form={form}
        submitText="Submit"
        title="Login"
        {...args}
        // Needs to be after props spread to avoid mock overrides
        onClose={() => setArgs({ open: false })}
      >
        <Stack>
          <Controller
            control={form.control}
            name="username"
            render={({ field: { ref, ...field } }) => (
              <TextField fullWidth inputRef={ref} label="Username" {...field} />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field: { ref, ...field } }) => (
              <TextField fullWidth inputRef={ref} label="Password" type="password" {...field} />
            )}
          />
        </Stack>
      </FormDialog>
    </>
  );
}

const meta: Meta<typeof FormDialog> = {
  title: 'Form/Components/Form Dialog',
  component: FormDialog,
  argTypes: {
    maxWidth: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    withCloseButton: {
      control: 'boolean',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: FormDialogStory,
};

type Story = StoryObj<typeof FormDialog>;

const Default: Story = {
  args: {
    title: 'Login',
  },
};

const WithAsyncCall: Story = {
  args: {
    ...Default.args,
    onSubmit: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 2000);
      }),
  },
};

const WithErrorMessage: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Error!',
    onSubmit: () => Promise.reject(),
  },
};

const WithSuccessMessage: Story = {
  args: {
    ...Default.args,
    successMessage: 'Success!',
    onSubmit: () => Promise.resolve(),
  },
};

export { Default, WithAsyncCall, WithSuccessMessage, WithErrorMessage };

export default meta;
