import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import useFlexTags from '.';

function UseFlexTags() {
  const { error, flexTags, isError, isLoading } = useFlexTags();

  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
    <details style={{ wordBreak: 'break-word' }}>
      <summary>User Flex Tags</summary>
      {isError && <div>Error: {error.message}…</div>}
      {flexTags
        ? Object.entries(flexTags).map(([key, value]) => (
            <div key={key}>
              {key}: {JSON.stringify(value)}
            </div>
          ))
        : null}
    </details>
  );
}

const meta: Meta<typeof UseFlexTags> = {
  title: 'Auth/Hooks/useFlexTags',
  component: UseFlexTags,
  argTypes: {
    bypassCache: {
      control: false,
      description: 'Flag to bypass the cache and fetch the user flex tags data from the server.',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
};

type Story = StoryObj<typeof UseFlexTags>;

const Default: Story = {};

export { Default };

export default meta;
