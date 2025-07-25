import type { AnalyticsBrowser, SegmentEvent } from '@segment/analytics-next';

import applyMiddleware from '.';

const mockEventContextHelpers = {
  getSupplementalContext: jest.fn(),
  setSupplementalContext: jest.fn(),
};

describe('applyMiddleware()', () => {
  let middleware: any;

  const mockAddSourceMiddleware = jest.fn();
  const mockAnalytics = {
    addSourceMiddleware: mockAddSourceMiddleware,
  } as unknown as AnalyticsBrowser;
  const mockNext = jest.fn();

  beforeEach(() => {
    // Capture the middleware function for each test
    mockAddSourceMiddleware.mockImplementation((fn) => {
      middleware = fn;
    });
  });

  it('adds source middleware to the analytics instance', () => {
    applyMiddleware(mockAnalytics, mockEventContextHelpers);

    expect(mockAddSourceMiddleware).toHaveBeenCalledTimes(1);
    expect(mockAddSourceMiddleware).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls next() to continue the middleware chain for all events', () => {
    const mockPayload = {
      obj: {
        properties: { action: 'test' },
        type: 'track',
      } as SegmentEvent,
    };

    applyMiddleware(mockAnalytics, mockEventContextHelpers);
    middleware({ payload: mockPayload, next: mockNext });

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockNext).toHaveBeenCalledWith(mockPayload);
  });

  describe('identify events', () => {
    it('merges user traits into supplemental context when traits exist', () => {
      const mockPayload = {
        obj: {
          type: 'identify',
          traits: { name: 'John Doe', email: 'john@example.com' },
        } as SegmentEvent,
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      expect(mockEventContextHelpers.setSupplementalContext).toHaveBeenCalledTimes(1);
      expect(mockEventContextHelpers.setSupplementalContext).toHaveBeenCalledWith(
        expect.any(Function)
      );

      // Test the callback function
      const callback = mockEventContextHelpers.setSupplementalContext.mock.calls[0][0];
      const prevValue = { user_traits: { existing_trait: 'value' } };
      const result = callback(prevValue);

      expect(result).toEqual({
        user_traits: {
          existing_trait: 'value',
          name: 'John Doe',
          email: 'john@example.com',
        },
      });

      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });

    it('does not set supplemental context when traits do not exist', () => {
      const mockPayload = {
        obj: {
          type: 'identify',
        } as SegmentEvent,
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      expect(mockEventContextHelpers.setSupplementalContext).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe('page events', () => {
    it('adds event context to page events', () => {
      const mockPayload = {
        obj: {
          type: 'page',
          name: 'Home Page',
          context: { user_agent: 'test' },
        } as SegmentEvent,
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      // The real getEventContext function will modify the context
      expect(mockPayload.obj.context).toEqual(
        expect.objectContaining({
          user_agent: 'test',
          page: expect.any(Object),
          screen: expect.any(Object),
          viewport: expect.any(Object),
        })
      );
      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe('track events', () => {
    it('formats event name, properties, and adds context when preserve_event_format is not set', () => {
      const mockPayload = {
        obj: {
          type: 'track',
          name: 'button clicked',
          properties: { buttonId: 'submit' },
          context: { user_agent: 'test' },
        } as SegmentEvent,
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      expect(mockPayload.obj.name).toBe('Button Clicked');
      expect(mockPayload.obj.properties).toEqual(
        expect.objectContaining({
          button_id: 'submit',
        })
      );
      expect(mockPayload.obj.context).toEqual(
        expect.objectContaining({
          user_agent: 'test',
          page: expect.any(Object),
          screen: expect.any(Object),
          viewport: expect.any(Object),
        })
      );
      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });

    it('preserves event format when preserve_event_format is true', () => {
      const mockPayload = {
        obj: {
          type: 'track',
          name: 'custom_event',
          properties: {
            '[test]_button_id': 'submit',
            context: { preserve_event_format: true },
          },
          context: { user_agent: 'test' },
        } as SegmentEvent,
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      expect(mockPayload.obj.name).toBe('custom_event');
      expect(mockPayload.obj.properties).toEqual({
        '[test]_button_id': 'submit',
        context: { preserve_event_format: true },
      });
      expect(mockPayload.obj.context).toEqual(
        expect.objectContaining({
          user_agent: 'test',
          page: expect.any(Object),
          screen: expect.any(Object),
          viewport: expect.any(Object),
        })
      );
      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });
  });

  describe('unknown event types', () => {
    it('handles unknown event types gracefully without processing', () => {
      const mockPayload = {
        obj: {
          type: 'unknown',
          properties: { action: 'test' },
        },
      };

      applyMiddleware(mockAnalytics, mockEventContextHelpers);
      middleware({ payload: mockPayload, next: mockNext });

      expect(mockEventContextHelpers.setSupplementalContext).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext).toHaveBeenCalledWith(mockPayload);
    });
  });
});
