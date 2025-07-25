import type { AnalyticsBrowser, SegmentEvent } from '@segment/analytics-next';

import ANALYTICS_EVENT_NAMES from '../../constants/generated/analytics-event-names';
import { init as engagementInit } from '@amplitude/engagement-browser';
import initializeGuidesAndSurveys from '.';

type MiddlewareParams = {
  next: (payload: MiddlewareParams['payload'] | null) => void;
  payload: {
    obj: SegmentEvent;
    type: () => SegmentEvent['type'];
  };
};

const mockEngagementInit = engagementInit as jest.MockedFunction<typeof engagementInit>;

jest.mock('@amplitude/engagement-browser');

describe('initializeGuidesAndSurveys()', () => {
  let engagementTrack:
    | ((event: { event_properties?: Record<string, any>; event_type: string }) => void)
    | undefined;
  let middlewareFn: ((params: MiddlewareParams) => void) | null;

  const mockUserAnonymousId = jest.fn();
  const mockUserId = jest.fn();
  const mockAnalytics = {
    addSourceMiddleware: jest.fn((middleware) => {
      middlewareFn = middleware;
    }),
    ready: jest.fn().mockImplementation((callback) => callback()),
    track: jest.fn(),
    user: jest.fn().mockResolvedValue({
      anonymousId: mockUserAnonymousId,
      id: mockUserId,
    }),
  } as unknown as AnalyticsBrowser;
  const mockNext = jest.fn();

  mockEngagementInit.mockImplementation(() => {
    window.engagement = {
      boot: jest.fn((options) => {
        engagementTrack = options.integrations[0].track;
        return Promise.resolve();
      }),
      forwardEvent: jest.fn(),
    };
  });

  beforeAll(() => {
    Object.defineProperty(window, 'engagement', {
      value: undefined,
      writable: true,
    });
  });

  beforeEach(() => {
    window.engagement = undefined;
    engagementTrack = undefined;
    middlewareFn = null;
  });

  it('does not initialize guides and surveys if no API key is provided', async () => {
    await initializeGuidesAndSurveys(mockAnalytics, '');

    expect(engagementInit).not.toHaveBeenCalled();
    expect(mockAnalytics.addSourceMiddleware).not.toHaveBeenCalled();
  });

  it('initializes guides and surveys with correct parameters', async () => {
    await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');

    expect(engagementInit).toHaveBeenCalledWith('test-api-key');
    expect(mockAnalytics.user).toHaveBeenCalled();
    expect(mockAnalytics.addSourceMiddleware).toHaveBeenCalled();
    expect(mockAnalytics.track).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.initializeAmplitudeGuidesAndSurveys
    );
  });

  it('only initializes guides and surveys once', async () => {
    await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');
    await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');
    await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');

    expect(engagementInit).toHaveBeenCalledTimes(1);
    expect(mockAnalytics.addSourceMiddleware).toHaveBeenCalledTimes(1);
  });

  it('forwards events to guides and surveys integration', async () => {
    await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');

    engagementTrack?.({
      event_type: 'mock-event-name',
      event_properties: {
        event_prop: 'mock-event-prop-value',
      },
    });

    expect(mockAnalytics.track).toHaveBeenCalledWith('mock-event-name', {
      context: {
        preserve_event_format: true,
      },
      event_prop: 'mock-event-prop-value',
    });
  });

  describe('with valid user data', () => {
    beforeEach(() => {
      mockUserAnonymousId.mockReturnValue('test-device-id');
      mockUserId.mockReturnValue('test-user-id');
    });

    it('setup guides and surveys with integrations and user data', async () => {
      await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');

      expect(engagementInit).toHaveBeenCalledWith('test-api-key');
      expect(mockAnalytics.user).toHaveBeenCalled();

      expect(window.engagement?.boot).toHaveBeenCalledWith({
        integrations: [
          {
            track: expect.any(Function),
          },
        ],
        user: {
          device_id: 'test-device-id',
          user_id: 'test-user-id',
          user_properties: {},
        },
      });
    });
  });

  describe('with null user data', () => {
    beforeEach(() => {
      mockUserAnonymousId.mockReturnValue(null);
      mockUserId.mockReturnValue(null);
    });

    it('setup guides and surveys with integrations and null user data', async () => {
      await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');

      expect(engagementInit).toHaveBeenCalledWith('test-api-key');
      expect(mockAnalytics.user).toHaveBeenCalled();

      expect(window.engagement?.boot).toHaveBeenCalledWith({
        integrations: [
          {
            track: expect.any(Function),
          },
        ],
        user: {
          device_id: undefined,
          user_id: undefined,
          user_properties: {},
        },
      });
    });
  });

  describe('middleware behavior', () => {
    beforeEach(async () => {
      await initializeGuidesAndSurveys(mockAnalytics, 'test-api-key');
      expect(middlewareFn).not.toBeNull();
    });

    it.each(['page', 'track'] as const)(
      'forwards %s events to guides and surveys integration',
      (eventType) => {
        const payload = {
          type: () => eventType,
          obj: {
            event: 'test-event',
            properties: { existingProp: 'value' },
            type: eventType,
          },
        };

        middlewareFn?.({ payload, next: mockNext });

        expect(window.engagement?.forwardEvent).toHaveBeenCalledWith({
          event_type: 'test-event',
          event_properties: { existingProp: 'value' },
        });
        expect(mockNext).toHaveBeenCalledWith(payload);
      }
    );

    it('does not forward non-page/track events', () => {
      const eventType = 'identify' as const;
      const payload = {
        type: () => eventType,
        obj: {
          type: eventType,
        },
      };

      middlewareFn?.({ payload, next: mockNext });

      expect(window.engagement?.forwardEvent).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('handles missing Amplitude integration', () => {
      const eventType = 'identify' as const;
      const payload = {
        type: () => eventType,
        obj: {
          integrations: {},
          type: eventType,
        },
      };

      middlewareFn?.({ payload, next: mockNext });

      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('handles missing integrations object', () => {
      const eventType = 'identify' as const;
      const payload = {
        type: () => eventType,
        obj: {
          type: eventType,
        },
      };

      middlewareFn?.({ payload, next: mockNext });

      expect(mockNext).toHaveBeenCalledWith(payload);
    });
  });
});
