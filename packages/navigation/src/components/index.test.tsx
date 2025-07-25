import * as exports from '.';

describe('component index', () => {
  describe.each([
    'BackToTopButton',
    'Breadcrumbs',
    'Drawer',
    'List',
    'Menu',
    'Pagination',
    'SiteNav',
    'Stepper',
    'Tabs',
    'WizardStepper',
  ])('<%s />', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
