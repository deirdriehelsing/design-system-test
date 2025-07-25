import type { SegmentEvent } from '@segment/analytics-next';

import getEventContext from './index';

const mockGetSupplementalContext = jest.fn();

describe('getEventContext', () => {
  const mockScreen = {
    width: 1920,
    height: 1080,
  };

  const mockViewport = {
    width: 1600,
    height: 900,
  };

  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, 'screen', {
      value: mockScreen,
      writable: true,
    });

    Object.defineProperty(window, 'innerWidth', {
      value: mockViewport.width,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: mockViewport.height,
      writable: true,
    });

    window.localStorage.clear();
  });

  it('merges existing context with supplemental data', () => {
    const mockEvent: SegmentEvent = {
      type: 'track',
      context: {
        userAgent: 'test-agent',
        page: {
          referrer: 'https://existing-referrer.com',
        },
        screen: {
          colorDepth: 24,
        },
      },
    } as SegmentEvent;

    const result = getEventContext(mockEvent, {
      getSupplementalContext: mockGetSupplementalContext,
    });

    expect(result).toEqual({
      userAgent: 'test-agent',
      page: {
        referrer: 'https://existing-referrer.com',
      },
      screen: {
        width: mockScreen.width,
        height: mockScreen.height,
        colorDepth: 24,
      },
      viewport: {
        width: mockViewport.width,
        height: mockViewport.height,
      },
    });
  });

  it('uses document.referrer when event referrer is not provided', () => {
    Object.defineProperty(document, 'referrer', {
      value: 'https://document-referrer.com',
      writable: true,
    });

    const mockEvent: SegmentEvent = {
      type: 'track',
      context: {},
    } as SegmentEvent;

    const result = getEventContext(mockEvent, {
      getSupplementalContext: mockGetSupplementalContext,
    });

    expect(result.page.referrer).toEqual('https://document-referrer.com');
  });

  it('uses localStorage previous URL when no other referrer is available', () => {
    Object.defineProperty(document, 'referrer', {
      value: '',
      writable: true,
    });

    window.localStorage.setItem('analytics-previous-url', 'https://local-storage-referrer.com');

    const mockEvent: SegmentEvent = {
      type: 'track',
      context: {},
    } as SegmentEvent;

    const result = getEventContext(mockEvent, {
      getSupplementalContext: mockGetSupplementalContext,
    });

    expect(result.page.referrer).toEqual('https://local-storage-referrer.com');
  });

  it('handles event with no context', () => {
    const mockEvent: SegmentEvent = {
      type: 'track',
    } as SegmentEvent;

    const result = getEventContext(mockEvent, {
      getSupplementalContext: mockGetSupplementalContext,
    });

    expect(result).toEqual({
      page: {
        referrer: 'unknown',
      },
      screen: {
        width: mockScreen.width,
        height: mockScreen.height,
      },
      viewport: {
        width: mockViewport.width,
        height: mockViewport.height,
      },
    });
  });

  it('handles event with track context', () => {
    mockGetSupplementalContext.mockReturnValueOnce({
      user_traits: {
        name: 'John Doe',
      },
    });

    const mockEvent: SegmentEvent = {
      type: 'track',
    } as SegmentEvent;

    const result = getEventContext(mockEvent, {
      getSupplementalContext: mockGetSupplementalContext,
    });

    expect(result).toEqual({
      page: {
        referrer: 'unknown',
      },
      screen: {
        width: mockScreen.width,
        height: mockScreen.height,
      },
      traits: {
        name: 'John Doe',
      },
      viewport: {
        width: mockViewport.width,
        height: mockViewport.height,
      },
    });
  });
});
