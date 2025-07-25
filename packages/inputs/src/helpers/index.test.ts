import * as exports from '.';

describe('hook index', () => {
  describe.each(['isDateDisabled'])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
