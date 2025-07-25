import * as exports from '.';

describe('component index', () => {
  describe.each(['TrackInteractionProvider', 'ViewTracker'])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
