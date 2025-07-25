import '@testing-library/jest-dom';

import type { EventScope } from '../../types';
import type { PropsWithChildren } from 'react';

import { EventScopeContext } from '../../state';
import React from 'react';
import { renderHook } from '@testing-library/react';
import useEventScope from '.';

const mockEventScope: EventScope = { pageSection: 'test-section' };

function EventScopeWrapper({ children }: PropsWithChildren) {
  return <EventScopeContext.Provider value={mockEventScope}>{children}</EventScopeContext.Provider>;
}

describe('useEventScope', () => {
  it('returns null when no event context is set', () => {
    const { result } = renderHook(() => useEventScope());
    expect(result.current).toBeNull();
  });

  it('returns the current event context value', () => {
    const { result } = renderHook(() => useEventScope(), { wrapper: EventScopeWrapper });
    expect(result.current).toEqual(mockEventScope);
  });
});
