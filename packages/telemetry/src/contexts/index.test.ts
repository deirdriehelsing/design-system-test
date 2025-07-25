import * as exports from '.';

describe('context index', () => {
  describe.each(['TrackInteractionContext'])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
