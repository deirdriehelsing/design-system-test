import type { InteractionSchema } from '@varsitytutors/event-tracker';

import trackNewRelic from '.';

describe('trackNewRelic', () => {
  describe('when NewRelic agent is not present', () => {
    it('does nothing', () => {
      global.newrelic = undefined as any;

      const interaction = {
        customEventData: {
          action: 'click',
        },
        page: {},
      } as unknown as InteractionSchema;

      expect(() => trackNewRelic(interaction)).not.toThrow();
    });
  });

  describe('when NewRelic agent is present', () => {
    it('calls newrelic.addPageAction with action and custom attributes', () => {
      global.newrelic = { addPageAction: jest.fn() } as any;

      const interaction = {
        customEventData: {
          action: 'click',
          category: 'button',
          label: 'submit',
          value: 1,
        },
        page: {
          clientUuid: '123',
          entity: { id: '456' },
          sessionId: '789',
          userId: '101112',
          visitorId: '131415',
        },
      } as unknown as InteractionSchema;

      trackNewRelic(interaction);

      expect(global.newrelic.addPageAction).toHaveBeenCalledWith('click', {
        category: 'button',
        client_uuid: '123',
        entity: '{"id":"456"}',
        label: 'submit',
        session_id: '789',
        userId: '101112',
        value: 1,
        visitorId: '131415',
      });
    });
  });
});
