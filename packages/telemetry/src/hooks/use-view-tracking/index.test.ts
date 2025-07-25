import { renderHook, waitFor } from '@testing-library/react';
import useViewTracking from '.';

const mockTrackEvent = jest.fn();

jest.mock('../use-interaction-tracker', () => () => ({ trackEvent: mockTrackEvent }));

describe('useViewTracking', () => {
  it('does not error', () => {
    renderHook(() => useViewTracking({ action: 'mock-action', category: 'mock-category' }));
  });

  it('calls trackInteraction', () => {
    renderHook(() => useViewTracking({ action: 'mock-action', category: 'mock-category' }));
    expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: 'mock-action',
      category: 'mock-category',
    });
  });

  it('does not call trackInteraction when params are the same', async () => {
    const { rerender } = renderHook(() =>
      useViewTracking({ action: 'mock-action', category: 'mock-category' })
    );

    rerender({ action: 'mock-action', category: 'mock-category' });

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledTimes(1);
    });
  });

  it('calls trackInteraction when params are different', async () => {
    const { rerender } = renderHook((props) => useViewTracking(props), {
      initialProps: { action: 'mock-action', category: 'mock-category' },
    });

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: 'mock-action',
        category: 'mock-category',
      });
    });

    rerender({ action: 'mock-second-action', category: 'mock-category' });

    await waitFor(() => {
      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: 'mock-second-action',
        category: 'mock-category',
      });
    });
  });
});
