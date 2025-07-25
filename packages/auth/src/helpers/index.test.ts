import * as exports from '.';

describe('helper index', () => {
  describe.each([
    'checkCriteria',
    'checkEnablement',
    'checkFlag',
    'checkProductState',
    'checkRole',
    'findEnablement',
    'getAllEnablements',
    'hasFlagCriteria',
    'hasUserCriteria',
  ])('%s()', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
