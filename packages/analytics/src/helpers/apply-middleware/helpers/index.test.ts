import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'formatEventName',
  'formatPropertyNames',
  'getEventContext',
];

describe('apply-middleware helpers index', () => {
  describe.each(moduleNames)('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
