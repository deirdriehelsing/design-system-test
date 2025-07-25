import * as exports from '.';

describe('component index', () => {
  describe.each(['Controller', 'Form', 'FormControl', 'FormDialog', 'FormProvider'])(
    '<%s />',
    (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    }
  );
});
