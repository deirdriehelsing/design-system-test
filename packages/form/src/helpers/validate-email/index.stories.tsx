import type { Meta, StoryObj } from '@storybook/react';

import { Controller } from '../../components';
import React from 'react';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import useForm from '../../hooks/use-form';
import validateEmail from '.';

function Form({ message = '', defaultValue = '' }) {
  const { control, formState, trigger } = useForm({
    defaultValues: { email: defaultValue },
    mode: 'onChange',
  });

  // Trigger validation on mount
  React.useEffect(() => {
    if (defaultValue) {
      trigger();
    }
  }, [defaultValue, trigger]);

  return (
    <form>
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, ...field } }) => (
          <TextField
            error={Boolean(formState.errors.email?.message)}
            helperText={formState.errors.email?.message}
            inputRef={ref}
            label="Email"
            {...field}
          />
        )}
        rules={{
          validate: (email) => validateEmail(email, message),
        }}
      />
    </form>
  );
}

const meta: Meta<typeof Form> = {
  title: 'Form/Validators/Email',
  component: Form,
  argTypes: {
    message: {
      control: 'text',
      description: 'Validation error message',
      defaultValue: 'Invalid email',
      table: {
        type: { summary: 'text' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'The email validator checks whether the given input has a valid email format. Please note it does not check if the email address actually exists.',
      },
    },
  },
};

type Story = StoryObj<typeof Form>;

const Default: Story = {
  args: {
    message: 'Invalid email',
  },
};

const Invalid: Story = {
  args: {
    ...Default.args,
    defaultValue: 'invalid-email',
  },
};

const Valid: Story = {
  args: {
    ...Default.args,
    defaultValue: 'email@varsitytutors.com',
  },
};

export { Default, Valid, Invalid };

export default meta;
