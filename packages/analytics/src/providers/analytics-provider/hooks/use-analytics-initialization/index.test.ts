import { analyticsBrowser } from '../../../../clients';
import { initializeAnalytics } from '../../../../helpers';
import { renderHook } from '@testing-library/react';
import useAnalyticsInitialization from '.';

jest.mock('../../../../clients/analytics-browser');
jest.mock('../../../../helpers/initialize-analytics');

describe('useAnalyticsInitialization()', () => {
  const mockInitializeAnalytics = jest.mocked(initializeAnalytics);

  it('calls initializeAnalytics with the provided configuration', () => {
    const writeKey = 'test-write-key';

    renderHook(() => useAnalyticsInitialization(writeKey));

    expect(mockInitializeAnalytics).toHaveBeenCalledTimes(1);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(analyticsBrowser, writeKey, undefined, {
      getSupplementalContext: expect.any(Function),
      setSupplementalContext: expect.any(Function),
    });
  });

  it('does not call initializeAnalytics again when the configuration is unchanged', () => {
    const writeKey = 'test-write-key';

    const { rerender } = renderHook(() => useAnalyticsInitialization(writeKey));

    expect(mockInitializeAnalytics).toHaveBeenCalledTimes(1);

    rerender();

    expect(mockInitializeAnalytics).toHaveBeenCalledTimes(1);
  });

  it('calls initializeAnalytics again when the configuration changes', async () => {
    const initialWriteKey = 'initial-write-key';

    const { rerender } = renderHook((params) => useAnalyticsInitialization(params), {
      initialProps: initialWriteKey,
    });

    expect(mockInitializeAnalytics).toHaveBeenCalledTimes(1);
    expect(mockInitializeAnalytics).toHaveBeenCalledWith(
      analyticsBrowser,
      initialWriteKey,
      undefined,
      {
        getSupplementalContext: expect.any(Function),
        setSupplementalContext: expect.any(Function),
      }
    );

    const updatedWriteKey = 'updated-write-key';

    await rerender(updatedWriteKey);

    expect(mockInitializeAnalytics).toHaveBeenCalledTimes(2);
    expect(mockInitializeAnalytics).toHaveBeenLastCalledWith(
      analyticsBrowser,
      updatedWriteKey,
      undefined,
      {
        getSupplementalContext: expect.any(Function),
        setSupplementalContext: expect.any(Function),
      }
    );
  });
});
