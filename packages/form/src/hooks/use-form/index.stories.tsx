import type { Meta, StoryObj } from '@storybook/react';
import type { FieldErrors } from '../../types';

import Button from '@blueshift-ui/core/dist/components/button';
import { Controller } from '../../..';
import React from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import useForm from '.';

interface FormValues {
  first_name: string;
  last_name: string;
}

function Form() {
  const form = useForm<FormValues>();

  function onValid(data: FormValues) {
    window.alert(`Valid data was submitted:\n\n${JSON.stringify(data, null, 2)}`);
  }

  function onInvalid(errors: FieldErrors<FormValues>) {
    window.alert(`Invalid data was submitted:\n\n${JSON.stringify(errors, null, 2)}`);
  }
  return (
    <form onSubmit={form.handleSubmit(onValid, onInvalid)}>
      <Stack>
        <Controller
          control={form.control}
          name="first_name"
          render={({ field: { ref, ...field } }) => (
            <TextField
              clearable
              error={Boolean(form.formState.errors.first_name?.message)}
              fullWidth
              helperText={form.formState.errors.first_name?.message?.toString()}
              inputRef={ref}
              label="First Name"
              onClear={() => form.setValue('first_name', '')}
              {...field}
            />
          )}
          rules={{
            required: 'First name is required',
          }}
        />
        <Controller
          control={form.control}
          name="last_name"
          render={({ field: { ref, ...field } }) => (
            <TextField
              clearable
              error={Boolean(form.formState.errors.last_name?.message)}
              fullWidth
              helperText={form.formState.errors.last_name?.message?.toString()}
              inputRef={ref}
              label="Last Name"
              onClear={() => form.setValue('last_name', '')}
              {...field}
            />
          )}
          rules={{
            required: 'Last name is required',
          }}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}

const meta: Meta<typeof Form> = {
  title: 'Form/Hooks/useForm',
  component: Form,
};

type Story = StoryObj<typeof Form>;

const Default: Story = {};

export { Default };

export default meta;
