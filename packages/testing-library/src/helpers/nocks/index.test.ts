import { renderHook, waitFor } from '@testing-library/react';
import IntegrationWrapper from '../../components/integration-wrapper';
import { fixtures } from '@blueshift-ui/testing-fixtures';
import nock from 'nock';
import nocks from '.';
import useAuthenticatedUser from '@blueshift-ui/auth/dist/hooks/use-authenticated-user';
import useFeatureFlag from '@blueshift-ui/auth/dist/hooks/use-feature-flag';

nock.disableNetConnect();
afterEach(() => nock.cleanAll());

const membershipClient = fixtures.authenticatedUser.membershipClient;

describe('authenticatedUser', () => {
  it('nocks useAuthenticatedUser', async () => {
    nocks.authenticatedUser().reply(200, membershipClient);

    const { result } = renderHook(() => useAuthenticatedUser(), { wrapper: IntegrationWrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toEqual(membershipClient.entity.id);
  });
});

describe('launchDarkly', () => {
  it('nocks launchDarkly', async () => {
    nocks.authenticatedUser().reply(200, membershipClient);
    nocks.launchDarkly().reply(200, { 'TEST-123': { value: 'variant' } });

    const { result } = renderHook(() => useFeatureFlag('TEST-123'), {
      wrapper: IntegrationWrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.value).toBe('variant');
  });
});
