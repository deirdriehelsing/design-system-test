import * as exports from '.';

describe('helper index', () => {
  describe.each([
    'getInteractionPayload',
    'formatAnalyticsValue',
    'getBrowserSessionId',
    'getVisitorId',
    'logHandledError',
  ])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
