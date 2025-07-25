import * as exports from '.';

describe('package index', () => {
  describe.each([
    'UserAccessBoundary',
    'findEnablement',
    'getAllEnablements',
    'useAuthenticatedUser',
    'useFeatureAccess',
    'useFlexTags',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
