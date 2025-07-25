import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import React, { useState } from 'react';
import UserAccessBoundary from '.';
import useAuthenticatedUser from '../../hooks/use-authenticated-user';

function getAuthCookie() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; vt_authentication_token=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
}

function _RenderSideEffect({ onRender, children }) {
  onRender();

  return children;
}

function _SwitchTokenForm() {
  const [token, setToken] = useState(() => getAuthCookie() ?? '');

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const token = formData.get('token');

    document.cookie = `vt_authentication_token=${token}`;
    location.reload();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="token"
        onChange={(event) => setToken(event.target.value)}
        placeholder="vt_authentication_token"
        type="text"
        value={token}
      />
      <button disabled={!token} type="submit">
        Switch User
      </button>
    </form>
  );
}

function UserAccessBoundaryStory(props: ComponentProps<typeof UserAccessBoundary>) {
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null);

  const {
    activeLearner,
    isLoading: isLoadingAuthenticatedUser,
    data: user,
  } = useAuthenticatedUser();

  if (isLoadingAuthenticatedUser) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <UserAccessBoundary redirector={setRedirectUrl} {...props}>
        {/**
         * This is a hack to reset the redirect Url when we're past the boundary
         * otherwise we'll keep showing the previous redirect url (redirector never gets re-called).
         *
         * The "proper" sollution is to write a render side effect hook to reset the redirect url
         * when conditions change, but the logic to know when the user has access is encapsulated in
         * the boundary, so we can't do that. We only know it's valid when we're past the boundary,
         * which is when this function gets executed.
         */}
        <_RenderSideEffect
          onRender={() => {
            // We have to check if the redirectUrl is null already to avoid an infinite loop
            if (redirectUrl) {
              setRedirectUrl(null);
            }
          }}
        >
          <h2>Congrats! You're past the boundary</h2>
        </_RenderSideEffect>
      </UserAccessBoundary>
      {redirectUrl ? (
        <div>
          <h2>Redirect URL:</h2>
          <p>{redirectUrl}</p>
        </div>
      ) : null}
      <hr />
      <_SwitchTokenForm />
      <br />
      <details>
        <summary>
          <b style={{ cursor: 'pointer' }}>User info</b>
        </summary>
        <pre style={{ maxHeight: 400, overflow: 'auto' }}>
          {JSON.stringify({ activeLearner, user }, null, 2)}
        </pre>
      </details>
    </div>
  );
}

const meta: Meta<typeof UserAccessBoundary> = {
  title: 'Auth/Components/UserAccessBoundary',
  component: UserAccessBoundaryStory,
  decorators: [
    (Story) => (
      <div style={{ wordWrap: 'break-word', width: '50vw' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    debug: {
      control: 'boolean',
      description: 'If true, the component will add debug information to the redirect url.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    loadingFallback: {
      table: {
        disable: true,
      },
    },
    productStates: {
      control: 'array',
      description: 'The product states allowerd to pass the boundary.',
      table: {
        type: { summary: 'string[]' },
      },
    },
    requireActiveLearner: {
      control: 'boolean',
      description: 'If true, the component will redirect if there is no active learner.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    roles: {
      control: 'array',
      description: 'The roles allowed to pass the boundary.',
      table: {
        type: { summary: 'string[]' },
      },
    },
  },
};

type Story = StoryObj<typeof UserAccessBoundary>;

const Default: Story = {
  args: {
    debug: true,
    productStates: ['free_class', 'one_on_one_membership'],
    requireActiveLearner: true,
    roles: ['client', 'student'],
  },
};

export { Default };

export default meta;
