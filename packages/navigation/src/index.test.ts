import * as exports from '.';

describe('package index', () => {
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
    'removeBasePath',
    'scrollToBottom',
    'scrollToElement',
    'scrollToTop',
    'useValidateStepperContext',
  ])('%s', (moduleName) => {
    it('is defined', () => {
      expect(exports[moduleName]).toBeDefined();
    });
  });
});
