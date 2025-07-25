import * as exports from '.';

describe('providers index', () => {
  describe.each(['ConfigProvider'])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
