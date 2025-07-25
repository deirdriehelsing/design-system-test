import { renderHook } from '@testing-library/react';
import useInteractionTracker from '.';

describe('useInteractionTracker()', () => {
  it('does not error', () => {
    renderHook(() => useInteractionTracker());
  });
});
