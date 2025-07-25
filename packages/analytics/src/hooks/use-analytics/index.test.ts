import { analyticsBrowser } from '../../clients';
import { renderHook } from '@testing-library/react';
import useAnalytics from './index';

describe('useAnalytics()', () => {
  it('returns analytics client', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current).toBe(analyticsBrowser);
  });
});
