import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { ElementOpenedEvent } from '../../types';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import trackElementOpened from '.';

const mockTrack = jest.fn();
const mockAnalyticsClient = {
  track: mockTrack,
} as unknown as AnalyticsBrowser;

const mockEventScope = {
  pageSection: 'test-section',
};

describe('trackElementOpened()', () => {
  beforeEach(() => {
    mockTrack.mockClear();
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'test/path',
      },
      writable: true,
    });
  });

  it('tracks element opened event with correct properties', () => {
    trackElementOpened({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementOpened, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
    });
  });

  it('tracks element opened event with proper event scope', () => {
    trackElementOpened({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
      eventScope: mockEventScope,
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementOpened, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ElementOpenedEvent> = {
      metadata: { test: 'value' },
    };

    trackElementOpened({
      analyticsClient: mockAnalyticsClient,
      elementId: 'test-dialog',
      elementType: 'dialog',
      eventScope: mockEventScope,
      trackedProperties: [trackedProperties],
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementOpened, {
      element_id: 'test-dialog',
      element_type: 'dialog',
      page_path: 'test/path',
      page_section: 'test-section',
      metadata: { test: 'value' },
    });
  });
});
