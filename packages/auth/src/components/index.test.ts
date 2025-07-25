import * as exports from '.';

describe('component index', () => {
  describe.each(['FeatureAccessBoundary', 'UserAccessBoundary'])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
