import analyticsBrowser from '../../clients/analytics-browser';
import applyMiddleware from '../../helpers/apply-middleware';
import initializeAnalytics from '.';

jest.mock('../../helpers/apply-middleware');
jest.mock('../../clients/analytics-browser', () => ({
  addSourceMiddleware: jest.fn(),
  identify: jest.fn(),
  load: jest.fn(),
  track: jest.fn(),
}));

describe('initializeAnalytics()', () => {
  const loadAnalyticsSpy = jest.spyOn(analyticsBrowser, 'load');
  const mockOptions = {
    applicationId: 'test-app-id',
    integrations: {
      'Test.io': {
        someConfig: true,
      },
    },
  };
  const mockSupplementalContextHelpers = {
    getSupplementalContext: jest.fn(),
    setSupplementalContext: jest.fn(),
  };
  const mockWriteKey = 'test-write-key';

  it('calls AnalyticsBrowser.load with the correct parameters', () => {
    initializeAnalytics(analyticsBrowser, mockWriteKey, mockOptions);

    expect(loadAnalyticsSpy).toHaveBeenCalledWith(
      { writeKey: mockWriteKey },
      {
        ...mockOptions,
        integrations: {
          'Segment.io': {
            deliveryStrategy: {
              config: {
                keepalive: true,
              },
            },
          },
          ...mockOptions.integrations,
        },
      }
    );
  });

  it('merges custom integrations with default Segment.io integration', () => {
    const optionsWithCustomIntegrations = {
      ...mockOptions,
      integrations: {
        'Custom.io': {
          customConfig: true,
        },
      },
    };

    initializeAnalytics(analyticsBrowser, mockWriteKey, optionsWithCustomIntegrations);

    expect(loadAnalyticsSpy).toHaveBeenCalledWith(
      { writeKey: mockWriteKey },
      {
        ...optionsWithCustomIntegrations,
        integrations: {
          'Segment.io': {
            deliveryStrategy: {
              config: {
                keepalive: true,
              },
            },
          },
          'Custom.io': {
            customConfig: true,
          },
        },
      }
    );
  });

  it('handles options without integrations property', () => {
    const optionsWithoutIntegrations = {
      globalAnalyticsKey: 'analytics',
    };

    initializeAnalytics(analyticsBrowser, mockWriteKey, optionsWithoutIntegrations);

    expect(loadAnalyticsSpy).toHaveBeenCalledWith(
      { writeKey: mockWriteKey },
      {
        ...optionsWithoutIntegrations,
        integrations: {
          'Segment.io': {
            deliveryStrategy: {
              config: {
                keepalive: true,
              },
            },
          },
        },
      }
    );
  });

  it('calls applyMiddleware with the correct parameters', () => {
    initializeAnalytics(
      analyticsBrowser,
      mockWriteKey,
      mockOptions,
      mockSupplementalContextHelpers
    );

    expect(applyMiddleware).toHaveBeenCalledWith(analyticsBrowser, mockSupplementalContextHelpers);
  });
});
