import * as exports from '.';

describe('hook index', () => {
  describe.each(['useInteractionTracker', 'useViewTracking'])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
