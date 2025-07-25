# @blueshift-ui/testing-library

Write better integration tests for your Blueshift-powered apps! Instead of stubbing your components,
hooks and functions, stub the server data and let Jest walk all the way through your app using
mocked API responses and fixtures.

This package encourages best practices with helpers and components to support your component tests
and treat them like real integration tests.

## Nock

When testing components, we promote using [nock](https://github.com/nock/nock) to mock the API instead of
mocking the hooks and helpers themselves. We have helper functions to nock common patterns such as feature flags
and translations.

```ts
import { mockFeatureFlags, mockTranslations, nocks } from '@blueshift-ui/testing-library';

// our known APIs are defined in `nocks`
nocks.navContentData().reply(200, { /* response */ });
nocks.authenticatedUser().reply(200, { /* response */ });

// specific use-case scenarios are also defined
mockFeatureFlags({ 'TEST-123': true })
mockTranslations('memberships', { title: 'Memberships' });
```

## Wrappers

It's very typical when testing components or hooks to need to wrap your component in order to mock the providers.
We provide wrappers here for that.

```tsx
import { IntegrationWrapper } from '@blueshift-ui/testing-library';

// use with a component
render(<MyComponent />, { wrapper: IntegrationWrapper });

// or with a hook
renderHook(() => useFetchData(), { wrapper: IntegrationWrapper });

// or wrap and extend it
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <IntegrationWrapper>{children}</IntegrationWrapper>
    </MemoryRouter>
  );
}
```

## Usage

Include `@blueshift-ui/testing-library` as a dev dependency in your package.json

```shell
yarn add @blueshift-ui/testing-library -D
```

Import and use it in your component tests.

```tsx
import { render, screen } from '@testing-library/react';
import { IntegrationWrapper, fixtures, mockFeatureFlags, mockTranslations, nock, nocks } from '@blueshift-ui/testing-library';

// a good failsafe to ensure we trap any unexpected APIs
nock.disableNetConnect();

// typically we should clear the nocked APIs after every test
afterEach(() => nock.cleanAll());

describe('<SpecialPage/>', () => {
  it('renders component when user is logged in', async () => {
    nocks.authenticatedUser().reply(200, fixtures.authenticatedUser.membershipClient);

    mockFeatureFlags({ 'MET-123': true });
    mockTranslations('memberships', { title: 'Welcome!', description: 'Click below.' })

    render(<SpecialPage />, { wrapper: IntegrationWrapper });

    // queries always start in loading state even if mocked, so always use waitFor
    await waitFor(() => {
      expect(screen.getByText('Click below')).toBeInTheDocument();
    });
  });

  it('shows loading state while data is loading', async () => {
    nocks.authenticatedUser().delay(1000).replyWithError('timeout');

    render(<SpecialPage />, { wrapper: IntegrationWrapper });

    await waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  it('definitely calls the API', async () => {
    const scope = nocks.authenticatedUser().reply(200, fixtures.authenticatedUser.membershipClient);

    render(<SpecialPage />, { wrapper: IntegrationWrapper });

    await waitFor(() => scope.done());
  });
});
```

### Persistence

As per the documentation for [nock](https://github.com/nock/nock), each instantiated nock will only
last for a single call, unless you specify otherwise (e.g. with [.persist()](https://github.com/nock/nock?tab=readme-ov-file#persist)
or [.times()](https://github.com/nock/nock?tab=readme-ov-file#repeat-response-n-times)). This is a useful default, as
we should typically only expect the server to be called once for any resource.

Therefore, if you have nocked an API call but still seeing an error for it being called, it is
possible there is a leak where the API is being called twice, unless you are explicitly
testing a refetch scenario.

### Logging

LaunchDarkly has a tendency to be verbose when you're loading it. In order not to get lots of logs
while running tests, update your `globalSetup` file (usually `lib/jest/setup/global.ts`) accordingly:

```ts
export default async function () {
  process.env.LAUNCH_DARKLY_LOG_LEVEL = 'warn';
}
```

### Interaction Tracker

Interaction Tracker is disabled by default on development, and is a bit trickier to mock so we do not mock this API.
We recommend that you use `jest.mock` as always.

```ts
const trackEvent = jest.fn();
const identify = jest.fn();
jest.mock('@blueshift-ui/telemetry/dist/components/track-interaction-provider/hooks/use-event-tracker', () => () => ({
  identify,
  trackEvent,
}));
```
