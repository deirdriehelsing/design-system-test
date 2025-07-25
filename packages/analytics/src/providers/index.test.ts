import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = ['AnalyticsProvider', 'EventScopeProvider'];

describe('providers index', () => {
  describe.each(moduleNames)('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
