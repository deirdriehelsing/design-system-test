import * as exports from '.';

const moduleNames: (keyof typeof exports)[] = [
  'TrackedButton',
  'TrackedDialog',
  'TrackedIconButton',
  'TrackedLink',
  'TrackedTextField',
];

describe('components index', () => {
  describe.each(moduleNames)('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
