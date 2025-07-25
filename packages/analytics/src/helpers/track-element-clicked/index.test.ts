import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { ElementClickedEvent } from '../../types';
import type { MouseEvent } from 'react';

import { ANALYTICS_EVENT_NAMES } from '../../constants';
import trackElementClicked from '.';

const mockTrack = jest.fn();
const mockAnalyticsClient = {
  track: mockTrack,
} as unknown as AnalyticsBrowser;

const mockEventScope = {
  pageSection: 'test-section',
};

describe('trackElementClicked()', () => {
  const mockEvent = {
    currentTarget: {
      getAttribute: jest.fn(),
      id: 'test-button',
      innerText: 'Test Button',
      tagName: 'BUTTON',
    },
  } as unknown as MouseEvent<HTMLButtonElement>;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: 'test/path',
      },
      writable: true,
    });
  });

  it('tracks element clicked event with correct properties', () => {
    trackElementClicked({
      analyticsClient: mockAnalyticsClient,
      event: mockEvent,
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
    });
  });

  it('tracks element clicked event with proper event scope', () => {
    trackElementClicked({
      analyticsClient: mockAnalyticsClient,
      event: mockEvent,
      eventScope: mockEventScope,
    });

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });

  it('includes additional tracked properties in the event payload', () => {
    const trackedProperties: Partial<ElementClickedEvent> = {
      metadata: { test: 'value' },
    };

    trackElementClicked({
      analyticsClient: mockAnalyticsClient,
      event: mockEvent,
      eventScope: mockEventScope,
      trackedProperties: [trackedProperties],
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: 'Test Button',
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
      metadata: { test: 'value' },
    });
  });

  it('handles undefined innerText correctly', () => {
    const mockEvent = {
      currentTarget: {
        getAttribute: jest.fn(),
        id: 'test-button',
        innerText: undefined,
        tagName: 'BUTTON',
      },
    } as unknown as MouseEvent<HTMLButtonElement>;

    trackElementClicked({
      analyticsClient: mockAnalyticsClient,
      event: mockEvent,
      eventScope: mockEventScope,
      trackedProperties: [],
    });

    expect(mockTrack).toHaveBeenCalledWith(ANALYTICS_EVENT_NAMES.elementClicked, {
      element_id: 'test-button',
      element_text: undefined,
      element_type: 'button',
      page_path: 'test/path',
      page_section: 'test-section',
    });
  });
});
