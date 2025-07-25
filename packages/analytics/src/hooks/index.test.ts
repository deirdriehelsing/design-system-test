import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'useAnalytics',
  'useElementClickedHandler',
  'useElementHoveredHandler',
  'useElementVisibilityHandlers',
  'useEnteredInputHandler',
  'useErrorLoggedHandler',
  'useEventScope',
  'useViewTracking',
];

describe('hooks index', () => {
  describe.each(moduleNames)('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
