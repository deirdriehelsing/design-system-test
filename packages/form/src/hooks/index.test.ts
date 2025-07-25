import * as exports from '.';

describe('hook index', () => {
  describe.each([
    'useController',
    'useFieldArray',
    'useForm',
    'useFormContext',
    'useFormState',
    'useWatch',
  ])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
