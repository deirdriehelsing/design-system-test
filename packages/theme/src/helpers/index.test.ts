import * as exports from '.';

describe('helper index', () => {
  describe.each(['getVariantColorTokens'])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
