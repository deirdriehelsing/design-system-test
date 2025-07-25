import type { ElementType } from '../../types';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import { renderHook } from '@testing-library/react';
import useElementVisibilityHandlers from '.';

const mockTrack = jest.fn();

jest.mock('../../hooks/use-analytics', () => ({
  __esModule: true,
  default: () => ({ track: mockTrack }),
}));

jest.mock('../../hooks/use-event-scope', () => ({
  __esModule: true,
  default: () => ({
    pageSection: 'test-section',
    metadata: {
      source: 'test',
    },
  }),
}));

describe('useElementVisibilityHandlers()', () => {
  describe.each(['accordion', 'dialog', 'drawer', 'menu'] as ElementType[])(
    'when element type is %s',
    (elementType: ElementType) => {
      it('tracks when element opens', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
            trackedProperties: {
              open: { source: 'button' },
            },
          })
        );

        result.current.handleElementOpened();

        expect(mockTrack).toHaveBeenCalledWith(
          ANALYTICS_EVENT_NAMES.elementOpened,
          expect.objectContaining({
            element_id: 'test-element',
            source: 'button',
            page_section: 'test-section',
          })
        );
      });

      it('tracks when element closes', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
            trackedProperties: {
              close: { reason: 'user-action' },
            },
          })
        );

        result.current.handleElementClosed();

        expect(mockTrack).toHaveBeenCalledWith(
          ANALYTICS_EVENT_NAMES.elementClosed,
          expect.objectContaining({
            element_id: 'test-element',
            element_type: elementType,
            reason: 'user-action',
            page_section: 'test-section',
          })
        );
      });

      it('includes additional properties when opening element', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
            trackedProperties: {
              open: { source: 'button' },
            },
          })
        );

        result.current.handleElementOpened({ trigger: 'click' });

        expect(mockTrack).toHaveBeenCalledWith(
          ANALYTICS_EVENT_NAMES.elementOpened,
          expect.objectContaining({
            element_id: 'test-element',
            element_type: elementType,
            source: 'button',
            trigger: 'click',
            page_section: 'test-section',
          })
        );
      });

      it('includes additional properties when closing element', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
            trackedProperties: {
              close: { reason: 'user-action' },
            },
          })
        );

        result.current.handleElementClosed({ duration: 5000 });

        expect(mockTrack).toHaveBeenCalledWith(
          ANALYTICS_EVENT_NAMES.elementClosed,
          expect.objectContaining({
            element_id: 'test-element',
            element_type: elementType,
            reason: 'user-action',
            duration: 5000,
            page_section: 'test-section',
          })
        );
      });

      it('does not track when tracking is disabled', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
            trackingDisabled: true,
          })
        );

        result.current.handleElementOpened();
        result.current.handleElementClosed();

        expect(mockTrack).not.toHaveBeenCalled();
      });

      it('tracks with minimal properties when no tracked properties provided', () => {
        const { result } = renderHook(() =>
          useElementVisibilityHandlers({
            elementType,
            id: 'test-element',
          })
        );

        result.current.handleElementOpened();
        result.current.handleElementClosed();

        expect(mockTrack).toHaveBeenNthCalledWith(
          1,
          ANALYTICS_EVENT_NAMES.elementOpened,
          expect.objectContaining({
            element_id: 'test-element',
            element_type: elementType,
            page_section: 'test-section',
          })
        );

        expect(mockTrack).toHaveBeenNthCalledWith(
          2,
          ANALYTICS_EVENT_NAMES.elementClosed,
          expect.objectContaining({
            element_id: 'test-element',
            element_type: elementType,
            page_section: 'test-section',
          })
        );
      });
    }
  );
});
