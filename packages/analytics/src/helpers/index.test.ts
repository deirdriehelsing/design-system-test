import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'addCommonEventProperties',
  'applyMiddleware',
  'clearUrlStorage',
  'getElementText',
  'getRoleTraits',
  'getStudentTraits',
  'getUserTraits',
  'initializeAnalytics',
  'initializeSessionReplay',
  'storeCurrentUrl',
  'trackElementClicked',
  'trackElementClosed',
  'trackElementOpened',
];

describe('helpers index', () => {
  describe.each(moduleNames)('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
