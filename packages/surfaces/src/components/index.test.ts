import * as exports from '.';

describe('component index', () => {
  describe.each(['Accordion', 'AppBar', 'BaseCard', 'MediaCard', 'MerchandisingCard', 'Toolbar'])(
    '<%s />',
    (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    }
  );
});
