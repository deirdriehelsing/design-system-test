import type { NewRelic } from '../../../../types';

import { ActionTracker, SegmentTracker } from '@varsitytutors/event-tracker';
import logHandledError from '../../../../helpers/log-handled-error';
import { renderHook } from '@testing-library/react';
import useEventTracker from '.';

const mockLogHandledError = logHandledError as jest.MockedFunction<typeof logHandledError>;

jest.mock('@varsitytutors/event-tracker');
jest.mock('../../../../helpers/log-handled-error');

describe('useEventTracker', () => {
  const mockInteraction = ActionTracker as jest.Mock;
  const mockSegmentInteraction = SegmentTracker as jest.Mock;

  const mockSegmentTrack = jest.fn().mockReturnValue({ success: true, message: '' });
  const mockSegmentIdentify = jest.fn().mockReturnValue({ success: true, message: '' });
  const mockTrack = jest.fn();

  const renderUseEventTracker = (options = {}) =>
    renderHook(() =>
      useEventTracker({
        applicationId: 'mock-application-id',
        userId: 'mock-user-id',
        ...options,
      })
    ).result.current;

  beforeEach(() => {
    mockInteraction.mockImplementation(
      // Note: this can't be a arrow-function because it needs to be new-able
      function () {
        return { track: mockTrack };
      }
    );
    mockSegmentInteraction.mockImplementation(
      // Note: this can't be a arrow-function because it needs to be new-able
      function () {
        return { track: mockSegmentTrack, identify: mockSegmentIdentify };
      }
    );
  });

  it('does not instantiate ActionTracker and does not call ActionTracker.track() when disabled', async () => {
    const { trackEvent } = renderUseEventTracker({
      disabled: true,
    });

    await trackEvent({ action: 'mock-action', category: 'mock-category' });

    expect(mockInteraction).not.toHaveBeenCalled();
    expect(mockTrack).not.toHaveBeenCalled();
  });

  describe('when segment disabled', () => {
    const segmentDisabledOptions = {
      segmentDisabled: true,
      segmentWriteKey: 'mock-segment',
    };

    it('does not instantiate SegmentTracker', () => {
      renderUseEventTracker(segmentDisabledOptions);
      expect(mockSegmentInteraction).not.toHaveBeenCalled();
    });

    it('does not call SegmentTracker.track() when trackEvent() is called', async () => {
      const { trackEvent } = renderUseEventTracker(segmentDisabledOptions);
      await trackEvent({ action: 'mock-action', category: 'mock-category' });
      expect(mockSegmentTrack).not.toHaveBeenCalled();
    });

    it('does not call SegmentTracker.identify() when identify() is called', async () => {
      const { identify } = renderUseEventTracker(segmentDisabledOptions);
      await identify({ userId: 'mock-user-id', traits: { email: 'mock-email' } });
      expect(mockSegmentIdentify).not.toHaveBeenCalled();
    });
  });

  describe('when segment writeKey is missing', () => {
    const segmentWriteKeyMissingOptions = {
      disabled: false,
      segmentDisabled: false,
      segmentWriteKey: undefined,
    };

    it('does not instantiate `SegmentTracker`', () => {
      renderUseEventTracker(segmentWriteKeyMissingOptions);
      expect(mockSegmentInteraction).not.toHaveBeenCalled();
    });

    it('does not call SegmentTracker.track() when trackEvent() is called', async () => {
      const { trackEvent } = renderUseEventTracker(segmentWriteKeyMissingOptions);
      await trackEvent({ action: 'mock-action', category: 'mock-category' });
      expect(mockSegmentTrack).not.toHaveBeenCalled();
    });

    it('does not call SegmentTracker.identify() when identify() is called', async () => {
      const { identify } = renderUseEventTracker(segmentWriteKeyMissingOptions);
      await identify({ userId: 'mock-user-id', traits: { email: 'mock-email' } });
      expect(mockSegmentIdentify).not.toHaveBeenCalled();
    });
  });

  describe('when enabled', () => {
    const enabledOptions = {
      entity: { id: 'mock-entity-id' },
      visitorId: 'mock-visitor-id',
    };

    it('instantiates ActionTracker correctly', () => {
      renderUseEventTracker(enabledOptions);

      expect(mockInteraction).toHaveBeenCalledTimes(1);
      expect(mockInteraction).toHaveBeenCalledWith({
        applicationId: 'mock-application-id',
        endpoint: 'https://events.varsitytutors.com/v2/pages/interaction',
      });
    });

    it('provides trackEvent function', () => {
      const { trackEvent } = renderUseEventTracker(enabledOptions);
      expect(trackEvent).toBeDefined();
    });

    it('calls ActionTracker.track() when trackEvent() is called', async () => {
      const { trackEvent } = renderUseEventTracker(enabledOptions);

      await trackEvent({ action: 'mock-action', category: 'mock-category' });

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith({
        customEventData: { action: 'mock-action', category: 'mock-category', label: undefined },
        domEventData: { target: 'page' },
        page: {
          clientUuid: undefined,
          divisionId: 'VT::VT',
          sessionId: expect.any(String),
          url: expect.any(String),
          userAgent: expect.any(String),
          visitorId: 'mock-visitor-id',
          entity: expect.objectContaining({ id: 'mock-entity-id' }),
          userId: 'mock-user-id',
        },
        pageRequestId: expect.any(String),
      });
    });

    it('calls ActionTracker.track() correctly overriding domEventData', async () => {
      const { trackEvent } = renderUseEventTracker(enabledOptions);

      await trackEvent({
        action: 'mock-action',
        category: 'mock-category',
        dom_event_data: { target: 'custom-target', text: 'custom-text' },
      });

      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack).toHaveBeenCalledWith({
        customEventData: { action: 'mock-action', category: 'mock-category', label: undefined },
        domEventData: { target: 'custom-target', text: 'custom-text' },
        page: {
          clientUuid: undefined,
          divisionId: 'VT::VT',
          sessionId: expect.any(String),
          url: expect.any(String),
          userAgent: expect.any(String),
          visitorId: 'mock-visitor-id',
          entity: expect.objectContaining({ id: 'mock-entity-id' }),
          userId: 'mock-user-id',
        },
        pageRequestId: expect.any(String),
      });
    });
  });

  describe('when segment enabled', () => {
    const segmentEnabledOptions = {
      segmentDisabled: false,
      segmentWriteKey: 'mock-segment',
    };

    it('instantiates `SegmentTracker` correctly', () => {
      renderUseEventTracker(segmentEnabledOptions);

      expect(mockSegmentInteraction).toHaveBeenCalledTimes(1);
      expect(mockSegmentInteraction).toHaveBeenCalledWith('mock-segment', {
        segmentOptions: {
          integrations: { 'Segment.io': { deliveryStrategy: { config: { keepalive: true } } } },
        },
      });
    });

    it('provides trackEvent function', () => {
      const { identify, trackEvent } = renderUseEventTracker(segmentEnabledOptions);

      expect(trackEvent).toBeDefined();
      expect(identify).toBeDefined();
    });

    it('calls SegmentTracker.track() when trackEvent() is called', async () => {
      const { trackEvent } = renderUseEventTracker(segmentEnabledOptions);

      await trackEvent({ action: 'mock-action', category: 'mock-category' });

      expect(mockSegmentTrack).toHaveBeenCalledTimes(1);
      expect(mockSegmentTrack).toHaveBeenCalledWith({
        eventName: 'mock-action',
        properties: {
          customEventData: { action: 'mock-action', category: 'mock-category', label: undefined },
          domEventData: { target: 'page' },
          page: {
            clientUuid: undefined,
            divisionId: 'VT::VT',
            entity: undefined,
            sessionId: expect.any(String),
            url: expect.any(String),
            userAgent: expect.any(String),
            visitorId: expect.any(String),
            userId: 'mock-user-id',
          },
          pageRequestId: expect.any(String),
          applicationId: 'mock-application-id',
        },
      });
    });

    it('handles SegmentTracker.track() unsuccessful requests', async () => {
      const { trackEvent } = renderUseEventTracker(segmentEnabledOptions);

      mockSegmentTrack.mockResolvedValue({ success: false, message: 'mock-error-message' });
      await trackEvent({ action: 'mock-action', category: 'mock-category' });

      expect(mockSegmentTrack).toHaveBeenCalledTimes(1);

      expect(mockLogHandledError).toHaveBeenCalledWith(
        'SegmentTracker: Error tracking user interaction event',
        { message: 'mock-error-message' }
      );
    });

    it('calls `SegmentTracker.identify()` when identify() is called', async () => {
      const { identify } = renderUseEventTracker(segmentEnabledOptions);

      await identify({ userId: 'mock-user-id', traits: { email: 'mock-email' } });

      expect(mockSegmentIdentify).toHaveBeenCalledTimes(1);
      expect(mockSegmentIdentify).toHaveBeenCalledWith({
        userId: 'mock-user-id',
        traits: { email: 'mock-email' },
      });
    });

    it('handles SegmentTracker.identify() unsuccessful requests', async () => {
      const { identify } = renderUseEventTracker(segmentEnabledOptions);

      mockSegmentIdentify.mockResolvedValue({ success: false, message: 'mock-error-message' });

      await identify({ userId: 'mock-user-id', traits: { email: 'mock-email' } });

      expect(mockSegmentIdentify).toHaveBeenCalledTimes(1);

      expect(mockLogHandledError).toHaveBeenCalledWith('SegmentTracker: Error identifying user', {
        message: 'mock-error-message',
      });
    });
  });

  describe('when newRelic enabled', () => {
    it('calls newrelic.addPageAction when trackEvent() is called', async () => {
      global.newrelic = { addPageAction: jest.fn() } as unknown as NewRelic;

      const { trackEvent } = renderUseEventTracker({
        entity: { id: 'mock-entity-id' },
        visitorId: 'mock-visitor-id',
        newRelicDisabled: false,
      });

      await trackEvent({ action: 'mock-action', category: 'mock-category' });

      expect(newrelic.addPageAction).toHaveBeenCalledTimes(1);
    });
  });
});
