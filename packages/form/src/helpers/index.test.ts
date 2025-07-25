import * as exports from '.';

describe('hook index', () => {
  describe.each(['getDefaultFormProps', 'getDirtyFieldValues', 'validateEmail'])(
    '%s()',
    (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    }
  );
});
