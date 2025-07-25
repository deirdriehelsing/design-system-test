import * as useFeatureFlagClient from '@blueshift-ui/auth/dist/hooks/use-feature-flag-client';

// Gets around the issue of not being able to mock the default export of a module
// and avoids a dreaded "__assign is not a function" error.
jest.mock('@blueshift-ui/auth/dist/hooks/use-feature-flag-client', () => {
  return Object.assign(
    { __esModule: true },
    jest.requireActual('@blueshift-ui/auth/dist/hooks/use-feature-flag-client')
  );
});

/**
 * Mocks the feature flags returned by the LaunchDarkly client. Doesn't mock at the request
 * level because LaunchDarkly caching makes that less useful, so instead it mocks the
 * functionality of the LaunchDarkly client itself.
 */
function mockFeatureFlags(
  flags: Record<string, boolean | string> = {},
  evaluationReasons: Record<string, { [key: string]: any; kind: string }> = {}
) {
  return jest.spyOn(useFeatureFlagClient, 'default').mockReturnValue({
    isLoading: false,
    isFetching: false,
    isFetched: true,
    isSuccess: true,
    isError: false,
    isInitialLoading: false,
    client: {
      allFlags: jest.fn().mockReturnValue(flags),
      variation: jest.fn((flag: string) => flags[flag]),
      variationDetail: jest.fn((flag: string, defaultValue = false) => {
        const value = flag in flags ? flags[flag] : defaultValue;
        const reason = evaluationReasons[flag] || { kind: 'FALLTHROUGH' };

        return {
          value,
          variationIndex: typeof value === 'boolean' ? (value ? 0 : 1) : 0,
          reason,
        };
      }),
      close: jest.fn(),
      flush: jest.fn(),
      getContext: jest.fn().mockReturnValue({ key: 'mock' }),
      identify: jest.fn().mockResolvedValue(flags),
      off: jest.fn(),
      on: jest.fn(),
      setStreaming: jest.fn(),
      track: jest.fn(),
      waitForInitialization: jest.fn(),
      waitUntilGoalsReady: jest.fn(),
      waitUntilReady: jest.fn(),
    },
  } as Partial<ReturnType<typeof useFeatureFlagClient.default>> as any);
}

export default mockFeatureFlags;
