import type { AnalyticsBrowser } from '@segment/analytics-next';
import type { SessionReplayOptions } from '@amplitude/session-replay-browser';

import * as sessionReplay from '@amplitude/session-replay-browser';
import { getStoredSessionId, setStoredSessionId } from './helpers';
import ANALYTICS_EVENT_NAMES from '../../constants/generated/analytics-event-names';
import initializeSessionReplay from '.';

jest.mock('@amplitude/session-replay-browser', () => ({
  init: jest.fn().mockReturnValue({ promise: Promise.resolve() }),
  setSessionId: jest.fn(),
  getSessionReplayProperties: jest.fn().mockReturnValue({ replay_id: 'test-replay-id' }),
}));

jest.mock('./helpers', () => ({
  getStoredSessionId: jest.fn().mockReturnValue('0'),
  setStoredSessionId: jest.fn(),
}));

describe('initializeSessionReplay()', () => {
  let middlewareFn: any;

  const mockAnalytics = {
    user: jest.fn().mockResolvedValue({
      anonymousId: jest.fn().mockReturnValue('test-device-id'),
    }),
    addSourceMiddleware: jest.fn((middleware) => {
      middlewareFn = middleware;
    }),
    track: jest.fn(),
    ready: jest.fn().mockImplementation((callback) => callback()),
  } as unknown as AnalyticsBrowser;
  const mockGetStoredSessionId = jest.mocked(getStoredSessionId);
  const mockNext = jest.fn();
  const mockSetStoredSessionId = jest.mocked(setStoredSessionId);

  beforeEach(() => {
    middlewareFn = null;
  });

  it('does not initialize session replay if no API key is provided', async () => {
    await initializeSessionReplay(mockAnalytics, '');

    expect(sessionReplay.init).not.toHaveBeenCalled();
    expect(mockAnalytics.addSourceMiddleware).not.toHaveBeenCalled();
  });

  it('initializes session replay with correct parameters', async () => {
    mockGetStoredSessionId.mockReturnValue('test-session-id');

    await initializeSessionReplay(mockAnalytics, 'test-api-key');

    expect(sessionReplay.init).toHaveBeenCalledWith('test-api-key', {
      sessionId: 'test-session-id',
      deviceId: 'test-device-id',
    });
    expect(mockAnalytics.user).toHaveBeenCalled();
    expect(mockAnalytics.addSourceMiddleware).toHaveBeenCalled();
    expect(mockAnalytics.track).toHaveBeenCalledWith(
      ANALYTICS_EVENT_NAMES.initializeAmplitudeSession
    );
  });

  it('passes additional options to session replay init', async () => {
    // Using an empty object since we don't know the exact type
    const options = {} as SessionReplayOptions;

    await initializeSessionReplay(mockAnalytics, 'test-api-key', options);

    expect(sessionReplay.init).toHaveBeenCalledWith(
      'test-api-key',
      expect.objectContaining({
        sessionId: expect.any(String),
        deviceId: 'test-device-id',
      })
    );
  });

  describe('middleware behavior', () => {
    beforeEach(async () => {
      await initializeSessionReplay(mockAnalytics, 'test-api-key');
      expect(middlewareFn).not.toBeNull();
    });

    it('updates session replay when session ID increases', () => {
      const storedSessionId = 100;
      const newSessionId = 200;

      mockGetStoredSessionId.mockReturnValue(storedSessionId.toString());

      const payload = {
        type: () => 'identify',
        obj: {
          integrations: {
            'Actions Amplitude': {
              session_id: newSessionId,
            },
          },
        },
      };

      middlewareFn({ payload, next: mockNext });

      expect(mockGetStoredSessionId).toHaveBeenCalled();
      expect(mockSetStoredSessionId).toHaveBeenCalledWith(newSessionId);
      expect(sessionReplay.setSessionId).toHaveBeenCalledWith(newSessionId);
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('does not update session replay if session ID is the same', () => {
      const sessionId = 100;
      mockGetStoredSessionId.mockReturnValue(sessionId.toString());

      const payload = {
        type: () => 'identify',
        obj: {
          integrations: {
            'Actions Amplitude': {
              session_id: sessionId,
            },
          },
        },
      };

      middlewareFn({ payload, next: mockNext });

      expect(mockGetStoredSessionId).toHaveBeenCalled();
      expect(mockSetStoredSessionId).not.toHaveBeenCalled();
      expect(sessionReplay.setSessionId).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('does not update session replay if new session ID is lower', () => {
      const storedSessionId = 200;
      const newSessionId = 100;

      mockGetStoredSessionId.mockReturnValue(storedSessionId.toString());

      const payload = {
        type: () => 'identify',
        obj: {
          integrations: {
            'Actions Amplitude': {
              session_id: newSessionId,
            },
          },
        },
      };

      middlewareFn({ payload, next: mockNext });

      expect(mockGetStoredSessionId).toHaveBeenCalled();
      expect(mockSetStoredSessionId).not.toHaveBeenCalled();
      expect(sessionReplay.setSessionId).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('enriches track events with session replay properties', () => {
      const payload = {
        type: () => 'track',
        obj: {
          properties: { existingProp: 'value' },
        },
      };

      middlewareFn({ payload, next: mockNext });

      expect(sessionReplay.getSessionReplayProperties).toHaveBeenCalled();
      expect(payload.obj.properties).toEqual({
        existingProp: 'value',
        replay_id: 'test-replay-id',
      });
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('creates properties object if none exists in track events', () => {
      const payload = {
        type: () => 'track',
        obj: {} as { properties?: Record<string, any> },
      };

      middlewareFn({ payload, next: mockNext });

      expect(sessionReplay.getSessionReplayProperties).toHaveBeenCalled();
      expect(payload.obj.properties).toEqual({
        replay_id: 'test-replay-id',
      });
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('does not modify non-track events', () => {
      const payload = {
        type: () => 'identify',
        obj: {} as { properties?: Record<string, any> },
      };

      middlewareFn({ payload, next: mockNext });

      expect(sessionReplay.getSessionReplayProperties).not.toHaveBeenCalled();
      expect(payload.obj.properties).toBeUndefined();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('handles missing Amplitude integration', () => {
      const payload = {
        type: () => 'identify',
        obj: {
          integrations: {},
        },
      };

      middlewareFn({ payload, next: mockNext });

      expect(mockGetStoredSessionId).toHaveBeenCalled();
      expect(mockSetStoredSessionId).not.toHaveBeenCalled();
      expect(sessionReplay.setSessionId).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });

    it('handles missing integrations object', () => {
      const payload = {
        type: () => 'identify',
        obj: {},
      };

      middlewareFn({ payload, next: mockNext });

      expect(mockGetStoredSessionId).toHaveBeenCalled();
      expect(mockSetStoredSessionId).not.toHaveBeenCalled();
      expect(sessionReplay.setSessionId).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(payload);
    });
  });
});
