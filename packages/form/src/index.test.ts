import * as exports from '.';

describe('package index', () => {
  describe.each([
    'Controller',
    'Form',
    'FormControl',
    'FormDialog',
    'FormProvider',
    'getDefaultFormProps',
    'getDirtyFieldValues',
    'validateEmail',
    'useController',
    'useFieldArray',
    'useForm',
    'useFormContext',
    'useFormState',
    'useWatch',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
