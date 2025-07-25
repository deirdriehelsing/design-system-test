import { renderHook, waitFor } from '@testing-library/react';
import IntegrationWrapper from '../../components/integration-wrapper';
import { fixtures } from '@blueshift-ui/testing-fixtures';
import mockFeatureFlags from '.';
import nock from 'nock';
import nocks from '../nocks';
import useFeatureAccess from '@blueshift-ui/auth/dist/hooks/use-feature-access';

nock.disableNetConnect();
afterEach(() => nock.cleanAll());

const membershipClient = fixtures.authenticatedUser.membershipClient;

describe('mockFeatureFlags', () => {
  beforeEach(() => {
    nocks.authenticatedUser().reply(200, membershipClient);
  });

  it('mocks launchdarkly features', async () => {
    mockFeatureFlags({ 'TEST-1': true });

    const { result } = renderHook(() => useFeatureAccess({ criteria: { flag: 'TEST-1' } }), {
      wrapper: IntegrationWrapper,
    });

    await waitFor(() => expect(result.current.isLoading).not.toBe(true));
    expect(result.current.hasAccess).toBe(true);
  });

  it('mocks function criteria', async () => {
    mockFeatureFlags({ 'TEST-2': 'variant' });

    const { result } = renderHook(
      () =>
        useFeatureAccess({
          criteria: { flag: ({ variation }) => variation('TEST-2') === 'variant' },
        }),
      { wrapper: IntegrationWrapper }
    );

    await waitFor(() => expect(result.current.isLoading).not.toBe(true));
    expect(result.current.hasAccess).toBe(true);
  });

  it('returns false for unsupported flags', async () => {
    mockFeatureFlags({ 'TEST-3': true });

    const { result } = renderHook(() => useFeatureAccess({ criteria: { flag: 'NOT-SUPPORTED' } }), {
      wrapper: IntegrationWrapper,
    });

    await waitFor(() => expect(result.current.isLoading).not.toBe(true));
    expect(result.current.hasAccess).toBe(false);
  });
});
