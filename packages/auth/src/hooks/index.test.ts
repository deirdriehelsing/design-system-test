import * as exports from '.';

describe('hook index', () => {
  describe.each(['useAuthenticatedUser', 'useFeatureAccess', 'useFeatureFlags', 'useFlexTags'])(
    '%s()',
    (moduleName) => {
      it('is defined', () => {
        expect(exports[moduleName]).toBeDefined();
      });
    }
  );
});
