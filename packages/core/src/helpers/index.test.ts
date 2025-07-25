import * as exports from '.';

describe('helper index', () => {
  describe.each([
    'generateBlobBorderRadius',
    'mapColorNameToMuiColorPath',
    'TypeSafeForwardRef',
    'filterCustomProps',
  ])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
