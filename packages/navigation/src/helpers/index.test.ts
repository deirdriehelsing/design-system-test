import * as exports from '.';

describe('helpers index', () => {
  describe('removeBasePath', () => {
    it('is defined', () => {
      expect(exports['removeBasePath']).toBeDefined();
    });
  });

  describe('scroll helpers', () => {
    describe.each(['scrollToBottom', 'scrollToTop', 'scrollToElement'])('%s()', (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    });
  });
});
