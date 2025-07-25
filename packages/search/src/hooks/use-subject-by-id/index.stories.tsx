import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import Stack from '@blueshift-ui/core/dist/components/stack';
import TextField from '@blueshift-ui/inputs/dist/components/text-field';
import useSubjectById from '.';

function UseSubjectById() {
  const [id, setId] = useState();
  const { subject, isLoading } = useSubjectById(id);

  return (
    <Stack>
      <TextField
        clearable
        error={!id}
        fullWidth
        helperText={!id && 'Subject ID is required'}
        label="Subject ID"
        onChange={(event) => setId(event.currentTarget.value)}
        onClear={() => setId(undefined)}
        value={id}
      />
      <pre>Subject: {isLoading ? 'Loading ...' : JSON.stringify(subject, null, 2)}</pre>
    </Stack>
  );
}

const meta: Meta<typeof UseSubjectById> = {
  title: 'Search/Hooks/useSubjectById',
  component: UseSubjectById,
};

type Story = StoryObj<typeof UseSubjectById>;

const Default: Story = {};

export { Default };

export default meta;
