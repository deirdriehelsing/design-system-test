import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { ElementClosedEvent } from '../../types';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import trackElementClosed from '.';

const mockTrack = jest.fn();
const mockAnalyticsClient = {
  track: mockTrack,
} as unknown as AnalyticsBrowser;

const mockEventScope = {
  pageSection: 'test-section',
};

describe('trackElementClosed()', () => {
  beforeEach(() => {
    mockTrack.mockClear();
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'test/path',
      },
      writable: true,
    });
  });

  it('tracks element closed event with correct properties', () => {
    trackElementClosed({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClosed, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
    });
  });

  it('tracks element closed event with proper event scope', () => {
    trackElementClosed({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
      eventScope: mockEventScope,
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClosed, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ElementClosedEvent> = {
      metadata: { event: 'property' },
    };

    trackElementClosed({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
      eventScope: mockEventScope,
      trackedProperties: [trackedProperties],
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClosed, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
      page_section: 'test-section',
      metadata: { event: 'property' },
    });
  });
});
