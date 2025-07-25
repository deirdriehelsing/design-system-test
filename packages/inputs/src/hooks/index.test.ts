import * as exports from '.';

describe('hook index', () => {
  describe.each(['useControlledValue'])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
