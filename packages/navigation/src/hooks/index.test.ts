import * as exports from '.';

describe('hooks index', () => {
  describe.each(['useValidateStepperContext'])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
