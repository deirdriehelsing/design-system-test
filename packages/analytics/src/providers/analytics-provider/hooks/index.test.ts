import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'useAnalyticsInitialization',
  'useSessionReplayInitialization',
  'useSpaUrlStorage',
];

describe('AnalyticsProvider internal hooks index', () => {
  describe.each(moduleNames)('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
