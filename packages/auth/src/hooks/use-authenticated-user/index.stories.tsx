import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import useAuthenticatedUser from '.';

function Auth(props: {
  bypassCache: boolean;
  includeStudents: boolean;
  includeZendesk: boolean;
  refetchOnMount: true | false | 'always';
}) {
  const { error, isError, isLoading, data: user } = useAuthenticatedUser(props);

  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
    <details style={{ wordBreak: 'break-word' }}>
      <summary>User Data</summary>
      {isError && <div>Error: {error.message}…</div>}
      {user
        ? Object.entries(user).map(([key, value]) => (
            <div key={key}>
              {key}: {JSON.stringify(value)}
            </div>
          ))
        : null}
    </details>
  );
}

const meta: Meta<typeof Auth> = {
  title: 'Auth/Hooks/useAuthenticatedUser',
  component: Auth,
  args: {
    bypassCache: false,
    includeStudents: true,
    includeZendesk: true,
  },
  argTypes: {
    bypassCache: {
      control: 'boolean',
      description: 'Flag to bypass the cache and fetch the user data from the server.',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    includeStudents: {
      control: 'boolean',
      description: 'Flag to include students info in the payload.',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    includeZendesk: {
      control: 'boolean',
      description: 'Flag to include zendesk info in the payload.',
      defaultValue: true,
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    refetchOnMount: {
      control: 'select',
      description: 'Override the value of refetchOnMount.',
      options: [true, false, 'always'],
    },
  },
};

type Story = StoryObj<typeof Auth>;

const Default: Story = {};

export { Default };

export default meta;
