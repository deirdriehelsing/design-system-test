import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = ['analyticsBrowser'];

describe('clients index', () => {
  describe.each(moduleNames)('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
