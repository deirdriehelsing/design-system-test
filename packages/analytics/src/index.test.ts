import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'AnalyticsProvider',
  'ANALYTICS_EVENT_NAMES',
  'EventScopeProvider',
  'TrackedButton',
  'TrackedIconButton',
  'TrackedDialog',
  'TrackedLink',
  'TrackedTextField',
  'addCommonEventProperties',
  'analyticsBrowser',
  'applyMiddleware',
  'getElementText',
  'getRoleTraits',
  'getStudentTraits',
  'getUserTraits',
  'initializeAnalytics',
  'initializeSessionReplay',
  'trackElementClicked',
  'trackElementClosed',
  'trackElementOpened',
  'useAnalytics',
  'useElementClickedHandler',
  'useElementHoveredHandler',
  'useElementVisibilityHandlers',
  'useEnteredInputHandler',
  'useErrorLoggedHandler',
  'useEventScope',
  'useViewTracking',
];

describe('package index', () => {
  describe.each(moduleNames)('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
