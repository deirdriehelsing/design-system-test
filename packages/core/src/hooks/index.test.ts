import * as exports from '.';

describe('hook index', () => {
  describe.each(['useBlobBorderRadius', 'useConfigValue', 'useControlledState', 'useStateMachine'])(
    '%s()',
    (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    }
  );
});
