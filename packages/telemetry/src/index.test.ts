import * as exports from '.';

describe('package index', () => {
  describe.each([
    'TrackInteractionProvider',
    'formatAnalyticsValue',
    'getBrowserSessionId',
    'getInteractionPayload',
    'getVisitorId',
    'logHandledError',
    'useInteractionTracker',
    'useViewTracking',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
