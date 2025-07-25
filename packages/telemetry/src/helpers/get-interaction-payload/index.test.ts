import type { InteractionSchema } from '@varsitytutors/event-tracker';

import getInteractionPayload from '.'; // Replace with your actual file path

describe('getInteractionPayload', () => {
  it('should build a basic interaction schema', () => {
    const params = {
      action: 'click_button',
      category: 'click_category',
      label: undefined,
      visitorId: '12345',
      sessionId: 'abc123',
      pageRequestId: 'xyz789',
      tests: undefined,
      userId: 'mock-user-id',
      domEventData: { target: 'page' },
    };
    const options = { useFormatData: false };

    const expectedInteraction: InteractionSchema = {
      customEventData: {
        action: 'click_button',
        category: 'click_category',
        label: undefined,
      },
      domEventData: {
        target: 'page',
      },
      page: {
        clientUuid: undefined,
        divisionId: 'VT::VT',
        entity: undefined,
        sessionId: 'abc123',
        url: window.location.href.slice(0, 799),
        userAgent: navigator.userAgent,
        visitorId: '12345',
        tests: undefined,
        userId: 'mock-user-id',
      },
      pageRequestId: 'xyz789',
    };

    const actualInteraction = getInteractionPayload(params, options);

    expect(actualInteraction).toEqual(expectedInteraction);
  });

  it('should format data with useFormatData enabled', () => {
    const params = {
      action: 'CLICK ON Button',
      category: 'Navigation   Menu',
      label: 'Open User Profile  ',
      visitorId: '12345',
      sessionId: 'abc123',
      pageRequestId: 'xyz789',
      domEventData: { target: 'page' },
    };
    const options = { useFormatData: true };

    const expectedInteraction: InteractionSchema = {
      customEventData: {
        action: 'click-on-button',
        category: 'navigation-menu',
        label: 'open-user-profile',
      },
      domEventData: {
        target: 'page',
      },
      page: {
        clientUuid: undefined,
        divisionId: 'VT::VT',
        entity: undefined,
        sessionId: 'abc123',
        url: window.location.href.slice(0, 799),
        userAgent: navigator.userAgent,
        visitorId: '12345',
      },
      pageRequestId: 'xyz789',
    };

    const actualInteraction = getInteractionPayload(params, options);

    expect(actualInteraction).toEqual(expectedInteraction);
  });

  it('should handle optional parameters', () => {
    const params = {
      action: 'view_product',
      category: 'ecommerce',
      visitorId: '12345',
      sessionId: 'abc123',
      pageRequestId: 'xyz789',
      clientUuid: 'some-client-uuid',
      divisionId: 'custom-division',
      entity: { id: 'product-123' },
      tests: [{ experimentId: 'exp-123', variantId: 'var-456' }],
      domEventData: { target: 'page', value: 'test-value', text: 'test-text' },
    };
    const options = { useFormatData: false };

    const expectedInteraction: InteractionSchema = {
      customEventData: {
        action: 'view_product',
        category: 'ecommerce',
        label: undefined,
      },
      domEventData: {
        target: 'page',
        value: 'test-value',
        text: 'test-text',
      },
      page: {
        clientUuid: 'some-client-uuid',
        divisionId: 'custom-division',
        entity: { id: 'product-123' },
        sessionId: 'abc123',
        url: window.location.href.slice(0, 799),
        userAgent: navigator.userAgent,
        visitorId: '12345',
        tests: [{ experimentId: 'exp-123', variantId: 'var-456' }],
      },
      pageRequestId: 'xyz789',
    };

    const actualInteraction = getInteractionPayload(params, options);

    expect(actualInteraction).toEqual(expectedInteraction);
  });
});
