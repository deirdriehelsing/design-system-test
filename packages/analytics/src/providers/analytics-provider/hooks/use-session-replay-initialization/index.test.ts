import { analyticsBrowser } from '../../../../clients';
import { initializeSessionReplay } from '../../../../helpers';
import { renderHook } from '@testing-library/react';
import useSessionReplayInitialization from '.';

jest.mock('../../../../clients/analytics-browser');
jest.mock('../../../../helpers/initialize-session-replay');

describe('<useSessionReplayInitialization />', () => {
  it('calls initializeSessionReplay with analyticsBrowser and apiKey when apiKey is provided', () => {
    const apiKey = 'test-api-key';

    renderHook(() => useSessionReplayInitialization(apiKey));

    expect(initializeSessionReplay).toHaveBeenCalledTimes(1);
    expect(initializeSessionReplay).toHaveBeenCalledWith(analyticsBrowser, apiKey, undefined);
  });

  it('calls initializeSessionReplay only on mount when apiKey does not change', () => {
    const apiKey = 'test-api-key';
    const { rerender } = renderHook(() => useSessionReplayInitialization(apiKey));

    expect(initializeSessionReplay).toHaveBeenCalledTimes(1);

    rerender();

    expect(initializeSessionReplay).toHaveBeenCalledTimes(1);
  });
});
